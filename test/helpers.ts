import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Label } from '../corpus/build.ts';
import { labelsFile, root } from '../corpus/build.ts';

export const rulesDir = join(root, 'rules');
const jevLintBin = join(root, 'node_modules', '.bin', 'jev-lint');

/** jev-lint を、このリポジトリの設定（.jev-lint.yaml）で動かし、標準出力と標準エラーをまとめて返す */
export function jevLint(args: string[], env: NodeJS.ProcessEnv = process.env): string {
  return execFileSync(jevLintBin, args, {
    cwd: root,
    env,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    maxBuffer: 64 * 1024 * 1024,
  });
}

export function readLabels(): Label[] {
  const byFile: Record<string, Label[]> = JSON.parse(readFileSync(labelsFile, 'utf8'));
  return Object.values(byFile).flat();
}

export interface Metrics {
  threshold: number;
  tp: number;
  fp: number;
  fn: number;
  precision: number;
  recall: number;
}

interface RunRecord {
  rules: { id: string; at: number }[];
  answers: { rule: string; line: number; value: number }[];
}

/** calibrate の記録から、ルールごとに、設定したしきい値での精度と再現率を出す（繰り返した回答は平均する） */
export function metricsFromRecord(record: RunRecord, labels: Label[]): Map<string, Metrics> {
  const scores = new Map<string, number[]>();
  for (const a of record.answers) {
    const key = `${a.rule}\u0000${a.line}`;
    scores.set(key, [...(scores.get(key) ?? []), a.value]);
  }
  const result = new Map<string, Metrics>();
  for (const { id, at } of record.rules) {
    let tp = 0;
    let fp = 0;
    let fn = 0;
    for (const l of labels.filter((x) => x.rule === id && x.label !== 'ignored')) {
      const values = scores.get(`${id}\u0000${l.line}`);
      if (!values) throw new Error(`${id}: no answer for line ${l.line} (${l.source})`);
      const flagged = values.reduce((s, v) => s + v, 0) / values.length >= at;
      if (l.label === 'bad' && flagged) tp++;
      else if (l.label === 'clean' && flagged) fp++;
      else if (l.label === 'bad') fn++;
    }
    result.set(id, {
      threshold: at,
      tp,
      fp,
      fn,
      precision: tp + fp === 0 ? 0 : tp / (tp + fp),
      recall: tp + fn === 0 ? 0 : tp / (tp + fn),
    });
  }
  return result;
}
