# comment-philosophy-lint

コメントに書くべきことと、書くべきでないことを確かめる [jev-lint](https://github.com/mizchi/jev-lint) のルール集です。
判定には、問いに確率で答える決定モデル（ローカルで動かす LiquidAI の d1-3B など、Jev 互換のモデル）を使います。

## 方針

- コメントに書くのは、知らずに触ると壊す理由（制約、順序、符号や単位の約束、外部の癖）と、採らなかった案とその理由（Why not）です。
- 変更の動機や経緯（Why）は、コミットメッセージに書きます。
- コードや宣言の名前の言い直し（What）は書きません。名前や構造で表します。
- JSDoc に書くのは、ツールが理解するタグ（`@deprecated` など）と、呼び出す側が守る契約だけです。名前や簡単な型で表せる契約は、そちらへ移します。ただし、型を作り込みすぎてまで移しません。

## ルール

| ID | 指摘するもの | 扱い |
|---|---|---|
| `comment-restates-code` | 直後のコードを言い直すだけの行コメント（見出し、変数の意味や単位だけのものを含む） | warning |
| `jsdoc-restates-declaration` | 宣言の名前を言い直すだけの JSDoc | warning |
| `jsdoc-contract-fits-in-type` | 名前や簡単な型で表せる契約を書いた JSDoc（`（ms）`、`'asc' か 'desc'` など） | advisory |
| `comment-motivation-belongs-in-commit` | 壊れはしない動機や意図を書いた行コメント | warning |
| `jsdoc-motivation-belongs-in-commit` | 作った理由を書いた JSDoc | advisory |
| `comment-history-belongs-in-commit` | 変更の経緯を書いたコメント | warning |
| `comment-explains-why-not` | 採らなかった案とその理由（残すべきコメントの一覧） | advisory |

問いの文面、しきい値、測った精度、決めた理由は [`rules/comment-philosophy.yml`](rules/comment-philosophy.yml) にあります。

## モデルを用意する

d1-3B を、`/v1/systemone` を出す llama.cpp の `llama-server` で動かします。LM Studio のサーバーは OpenAI 互換の API だけを出すので、使えません。

```sh
llama-server -hf LiquidAI/d1-3B-GGUF:Q8_0 --host 0.0.0.0 --port 8090 -ngl 99 --alias d1-3b
```

`TYPESAFE_BASE_URL` に、サーバーの URL を指定します（例: `http://127.0.0.1:8090`）。
`TYPESAFE_API_KEY` は、ローカルのサーバーでは何でもかまいません（例: `local`）。

## ほかのプロジェクトで使う

```sh
pnpm add -D jev-lint github:cou723/comment-philosophy-lint
```

pnpm が jev-lint の依存（`@ast-grep/cli`）のインストールスクリプトを止めるので、`pnpm-workspace.yaml` で許可します。

```yaml
allowBuilds:
  '@ast-grep/cli': true
```

`.jev-lint.yaml` で、使うルールと送り方を決めます。

```yaml
model: d1-3b
files: [src]
rules:
  comment-restates-code: on
  jsdoc-restates-declaration: on
  jsdoc-contract-fits-in-type: on
  comment-motivation-belongs-in-commit: on
  jsdoc-motivation-belongs-in-commit: on
  comment-history-belongs-in-commit: on
  comment-explains-why-not: on
cache: .jev-lint/verdicts
# 既定の送り方（1 リクエスト 256 問、同時 32 本）だと、ローカルのサーバーがあふれて止まる。
batchSize: 16
concurrency: 1
# ルールごとの axis の指定を効かせるため。
group: auto
```

`-R` で、このリポジトリのルールを読み込みます。

```json
{
  "scripts": {
    "lint:comments": "jev-lint check -R node_modules/comment-philosophy-lint/rules"
  }
}
```

```sh
TYPESAFE_BASE_URL=http://127.0.0.1:8090 TYPESAFE_API_KEY=local pnpm lint:comments
```

## テストと較正

```sh
pnpm install
pnpm test:offline                                        # モデルを使わない検査
TYPESAFE_BASE_URL=http://127.0.0.1:8090 pnpm test        # 精度の検査も含める
```

- `test/offline.test.ts` は、評価セットが最新か、ルールが読み込めるか、各ルールの matcher がラベルどおりの事例を拾うかを確かめます。
- `test/accuracy.test.ts` は、評価セットをモデルに問い、ルールごとの精度と再現率が [`test/expectations.json`](test/expectations.json) の下限以上かを確かめます。下限は、測った値から、実行ごとのぶれを見込んで 0.1 前後引いた値です。サーバーに届かなければ失敗します。

評価セットの正本は [`corpus/cases.json`](corpus/cases.json) です。どれも合成した事例で、ラベル（分類）が付いています。
`corpus/build.ts` が、そこから jev-lint に読ませる `corpus/comments.ts` と `corpus/labels.json` を作ります。
事例やルールの文面を変えたら、`pnpm calibrate` で成績を見て、しきい値と下限を見直します。

## 分かっている限界

- 評価セットは小さく（157 件）、すべて合成です。実際のコードでは、点が高めに出ることがあります。
- `jsdoc-motivation-belongs-in-commit` は、作った理由を書いた JSDoc の半分ほどしか拾いません。実コードでは名前の言い直しも拾いやすいので、advisory にしてあります。
- 実コード（テストを除く TypeScript 4,106 行）では、`jsdoc-restates-declaration` が JSDoc 204 件のうち 83 件を指摘しました。合成の事例より点が高く出るためで、しきい値はまだ詰めていません。
- `jsdoc-contract-fits-in-type` は、宣言の名前しか見ません。今の型がすでに契約を表していても、指摘することがあります。
- 文面が同じでも、ルールの ID を変えると点がずれました。ID を変えたら較正し直します。
