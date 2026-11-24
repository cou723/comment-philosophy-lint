// 決定モデルに評価セットを問い、ルールごとの精度と再現率が下限を割っていないか確かめる。
// TYPESAFE_BASE_URL に、d1-3B を載せた llama-server（/v1/systemone を出すもの）を指定して動かす。
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { labelsFile, root } from '../corpus/build.ts';
import { jevLint, metricsFromRecord, readLabels, rulesDir } from './helpers.ts';

interface Floor {
  precision: number;
  recall: number;
}

test('各ルールの精度と再現率が、expectations.json の下限以上', { timeout: 15 * 60_000 }, async () => {
  const base = process.env.TYPESAFE_BASE_URL;
  assert.ok(base, 'TYPESAFE_BASE_URL に、d1-3B を載せた llama-server の URL を指定する（README を参照）');
  const health = await fetch(new URL('/health', base), { signal: AbortSignal.timeout(5_000) }).catch(
    (error: unknown) => {
      throw new Error(`${base} に接続できない。llama-server が起動しているか確かめる: ${String(error)}`);
    },
  );
  assert.ok(health.ok, `${base}/health が ${health.status} を返した`);

  const record = join(mkdtempSync(join(tmpdir(), 'comment-philosophy-lint-')), 'run.json');
  jevLint(
    ['calibrate', 'corpus', '-R', rulesDir, '--labels', labelsFile, '--record', record],
    { TYPESAFE_API_KEY: 'local', ...process.env },
  );
  const metrics = metricsFromRecord(JSON.parse(readFileSync(record, 'utf8')), readLabels());
  const floors: Record<string, Floor> = JSON.parse(
    readFileSync(join(root, 'test', 'expectations.json'), 'utf8'),
  );

  const report = [...metrics].map(
    ([id, m]) =>
      `${id} @${m.threshold}: precision ${m.precision.toFixed(2)} recall ${m.recall.toFixed(2)} (tp ${m.tp} fp ${m.fp} fn ${m.fn})`,
  );
  console.log(report.join('\n'));

  assert.deepEqual([...metrics.keys()].sort(), Object.keys(floors).sort(), 'expectations.json のルールが足りない');
  const below = [...metrics].filter(
    ([id, m]) => m.precision < floors[id].precision || m.recall < floors[id].recall,
  );
  assert.deepEqual(
    below.map(([id]) => id),
    [],
    `下限を割ったルールがある:\n${report.join('\n')}`,
  );
});
