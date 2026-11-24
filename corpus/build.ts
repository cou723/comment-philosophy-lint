// cases.json（ラベル付きのコメント事例）から、jev-lint 用の comments.ts と labels.json を作る。
// 実行: node corpus/build.ts
//
// 事例を固定のコーパスに書き出すのは、実コードの行番号でラベルを付けると、編集のたびに
// ラベルがずれて、較正の結果を比べられなくなるため。
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

// 分類（rules/comment-philosophy.yml の方針と対応）
//   W: 見出し・ラベル・コードや宣言名の言い直し   K: 知らずに触ると壊す理由・契約・約束事
//   T: 名前や簡単な型で表せる契約                 M: 動機・意図・仮説（コミットメッセージ向き）
//   H: 変更の経緯（コミットメッセージ向き）       N: 採らなかった案とその理由（Why not）
//   D: 変数が持つ値の意味・単位を書いた行コメント。名前（単位の接尾辞を含む）で表せるので、What と同じく指摘する
export type CommentClass = 'W' | 'K' | 'T' | 'M' | 'H' | 'N' | 'D';
export interface Case {
  class: CommentClass;
  // line: 関数本体の中の `//` コメント。jsdoc: 宣言の直前の `/** */`（comment は記号ごと持つ）
  form: 'line' | 'jsdoc';
  comment: string;
  code: string[];
  // JSDoc の付いた宣言が、クラス・interface のメンバーのときの包み方
  wrap?: 'class' | 'interface';
  source: string;
}
export interface Label {
  line: number;
  window: number;
  rule: string;
  // ignored: matcher は拾うが、そのルールでは評価しない（jev-lint は bad / clean 以外を数えない）
  label: 'bad' | 'clean' | 'ignored';
  class: CommentClass;
  source: string;
}

// 規則ごとに、指摘すべき分類と、規則の matcher が拾う事例（判定対象の行）を決める。
// target が null の事例は、その規則の matcher に掛からないのでラベルを付けない。
export const RULES: Record<
  string,
  { bad: CommentClass[]; ignore?: CommentClass[]; target: (c: Case, commentLine: number) => number | null }
> = {
  // コメント直後の文が判定対象。直後に文がない事例は掛からない。
  'comment-restates-code': {
    bad: ['W', 'D'],
    target: (c, line) => (c.form === 'line' && c.code.length > 0 ? line + 1 : null),
  },
  'jsdoc-restates-declaration': { bad: ['W'], target: (c, line) => (c.form === 'jsdoc' ? line : null) },
  'comment-motivation-belongs-in-commit': {
    bad: ['M'],
    target: (c, line) => (c.form === 'line' ? line : null),
  },
  'jsdoc-motivation-belongs-in-commit': {
    bad: ['M'],
    target: (c, line) => (c.form === 'jsdoc' ? line : null),
  },
  'comment-history-belongs-in-commit': { bad: ['H'], target: (_c, line) => line },
  'comment-explains-why-not': { bad: ['N'], target: (_c, line) => line },
  // 契約のある JSDoc の中で、型や名前に移せるものを見る。名前の言い直し（W）は
  // jsdoc-restates-declaration が拾うので、ここでは評価しない。
  'jsdoc-contract-fits-in-type': {
    bad: ['T'],
    ignore: ['W'],
    target: (c, line) => (c.form === 'jsdoc' ? line : null),
  },
};

function render(c: Case, n: number): { text: string[]; commentAt: number } {
  const id = String(n).padStart(3, '0');
  if (c.form === 'line') {
    const text = [`export function case${id}() {`, `  // ${c.comment}`, ...c.code.map((l) => `  ${l}`), '}'];
    return { text, commentAt: 1 };
  }
  const doc = c.comment.split('\n');
  if (!c.wrap) return { text: [...doc, ...c.code], commentAt: 0 };
  const open = c.wrap === 'class' ? `export class Case${id} {` : `export interface Case${id} {`;
  return { text: [open, ...[...doc, ...c.code].map((l) => `  ${l}`), '}'], commentAt: 1 };
}

function parses(source: string): boolean {
  const sf = ts.createSourceFile('x.ts', source, ts.ScriptTarget.Latest, true);
  // parseDiagnostics は公開型にないが、構文エラーだけを見るのに使う。
  return (sf as unknown as { parseDiagnostics: unknown[] }).parseDiagnostics.length === 0;
}

export const here = dirname(fileURLToPath(import.meta.url));
export const root = join(here, '..');
export const corpusFile = join(here, 'comments.ts');
export const labelsFile = join(here, 'labels.json');

export function build(cases: Case[]): { source: string; labels: Label[] } {
  const lines = [
    '// 自動生成: corpus/build.ts が cases.json から作る。手で編集しない。',
    '// 各事例に評価対象のコメントが 1 つだけある。ラベルは labels.json にある。',
    '',
  ];
  const labels: Label[] = [];
  cases.forEach((c, n) => {
    const { text, commentAt } = render(c, n);
    if (!parses(text.join('\n'))) throw new Error(`case ${n} (${c.source}) is not valid TypeScript`);
    const commentLine = lines.length + 1 + commentAt;
    lines.push(...text, '', '');
    for (const [rule, { bad, ignore = [], target }] of Object.entries(RULES)) {
      const line = target(c, commentLine);
      if (line === null) continue;
      labels.push({
        line,
        window: 1,
        rule,
        label: bad.includes(c.class) ? 'bad' : ignore.includes(c.class) ? 'ignored' : 'clean',
        class: c.class,
        source: c.source,
      });
    }
  });
  return { source: lines.join('\n'), labels };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const cases: Case[] = JSON.parse(readFileSync(join(here, 'cases.json'), 'utf8'));
  const { source, labels } = build(cases);
  writeFileSync(corpusFile, source);
  writeFileSync(labelsFile, `${JSON.stringify({ [relative(root, corpusFile)]: labels }, null, 1)}\n`);
  console.log(`${cases.length} cases, ${labels.length} labels`);
}
