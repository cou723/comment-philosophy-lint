// モデルに問い合わせずに確かめられること: 評価セットが最新か、ルールが読み込めるか、
// matcher がラベルどおりの事例を拾うか。
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { parse } from 'yaml';
import type { Case } from '../corpus/build.ts';
import { RULES, build, corpusFile, here } from '../corpus/build.ts';
import { jevLint, readLabels, rulesDir } from './helpers.ts';

// dry-run は問い合わせないが、接続先と鍵が無いと設定の検査で止まるので、届かない値を入れておく。
const offlineEnv = {
  ...process.env,
  TYPESAFE_BASE_URL: 'http://127.0.0.1:9',
  TYPESAFE_API_KEY: 'offline',
};

test('comments.ts は cases.json から作り直した内容と一致する', () => {
  const cases: Case[] = JSON.parse(readFileSync(join(here, 'cases.json'), 'utf8'));
  assert.equal(readFileSync(corpusFile, 'utf8'), build(cases).source, 'node corpus/build.ts で作り直す');
});

test('ルールファイルの ID と、評価セットがラベルを付けるルールが一致する', () => {
  const rules: { id: string }[] = parse(readFileSync(join(rulesDir, 'comment-philosophy.yml'), 'utf8'));
  assert.deepEqual(rules.map((r) => r.id).sort(), Object.keys(RULES).sort());
});

test('jev-lint がすべてのルールを読み込める', () => {
  const out = jevLint(['rules', '-R', rulesDir], offlineEnv);
  assert.match(out, new RegExp(`${Object.keys(RULES).length} rule\\(s\\) loaded, 0 error\\(s\\)`));
});

test('各ルールの matcher は、ラベルを付けた事例だけを拾う', () => {
  const out = jevLint(['check', 'corpus', '-R', rulesDir, '--dry-run', '--show-subjects'], offlineEnv);
  const subjects = new Map<string, number[]>();
  for (const m of out.matchAll(/^\s+corpus\/comments\.ts:(\d+)(?:-\d+)?\s+(\S+)\s/gm)) {
    subjects.set(m[2], [...(subjects.get(m[2]) ?? []), Number(m[1])]);
  }
  const labels = readLabels();
  // 先頭 2 行は、コーパスの見出しコメント（ラベルなし）
  const firstCaseLine = 3;
  for (const rule of Object.keys(RULES)) {
    const want = labels.filter((l) => l.rule === rule);
    const got = (subjects.get(rule) ?? []).filter((line) => line >= firstCaseLine);
    const missing = want.filter((l) => !got.some((line) => Math.abs(line - l.line) <= l.window));
    const extra = got.filter((line) => !want.some((l) => Math.abs(line - l.line) <= l.window));
    assert.deepEqual(
      missing.map((l) => l.source),
      [],
      `${rule}: matcher が拾わない事例がある`,
    );
    assert.deepEqual(extra, [], `${rule}: ラベルのない行を拾っている`);
  }
});
