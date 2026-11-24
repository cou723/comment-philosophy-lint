// 自動生成: corpus/build.ts が cases.json から作る。手で編集しない。
// 各事例に評価対象のコメントが 1 つだけある。ラベルは labels.json にある。

export function case000() {
  // ユーザー一覧を取得
  const users = await api.fetchUsers();
}


export function case001() {
  // 合計を計算
  const total = items.reduce((sum, item) => sum + item.price, 0);
}


export function case002() {
  // 1. 入力の検証
  if (!input.name) {
  throw new Error('name is required');
  }
}


export function case003() {
  // 2. データベースに保存
  await db.insert('orders', order);
}


export function case004() {
  // 3. レスポンスを返す
  return res.json(result);
}


export function case005() {
  // カウンターを 1 増やす
  count += 1;
}


export function case006() {
  // 配列を日付順に並べ替え
  rows.sort((a, b) => a.date - b.date);
}


export function case007() {
  // ボタンを無効化
  button.disabled = true;
}


export function case008() {
  // ログを出力
  logger.info('saved', { id });
}


export function case009() {
  // タイマーをクリア
  clearTimeout(this.timer);
}


export function case010() {
  // 設定を読み込む
  const config = loadConfig(path);
}


export function case011() {
  // エラーなら終了
  if (error) {
  return;
  }
}


export function case012() {
  // メニューの描画
  renderMenu(ctx, menuItems);
}


export function case013() {
  // ヘッダー部分
  const header = document.createElement('header');
}


export function case014() {
  // イベントリスナーの登録
  window.addEventListener('resize', onResize);
}


export function case015() {
  // 結果をキャッシュに保存
  cache.set(key, value);
}


export function case016() {
  // 各要素を処理
  for (const item of items) {
  process(item);
  }
}


export function case017() {
  // 文字列を小文字に変換
  const lower = text.toLowerCase();
}


export function case018() {
  // 状態をリセット
  this.state = initialState;
}


export function case019() {
  // 幅と高さを取得
  const { width, height } = canvas.getBoundingClientRect();
}


export function case020() {
  // パスを結合
  const fullPath = join(baseDir, fileName);
}


export function case021() {
  // ファイルを読む
  const text = await readFile(fullPath, 'utf8');
}


export function case022() {
  // 4. 後片付け
  connection.close();
}


export function case023() {
  // マウス座標の更新
  this.mouse = { x: e.clientX, y: e.clientY };
}


export function case024() {
  // フラグを立てる
  this.dirty = true;
}


export function case025() {
  // リトライ処理
  for (let i = 0; i < 3; i++) {
  if (await tryOnce()) break;
  }
}


export function case026() {
  // Safari は Date.parse で 'YYYY-MM-DD HH:mm' を解釈できないので、先に T 区切りへ直す
  const iso = raw.replace(' ', 'T');
}


export function case027() {
  // splice は元の配列を書き換える。呼び出し元の配列を壊さないよう、先に複製する
  const copy = [...list];
}


export function case028() {
  // この順番を変えない。購読より先に emit すると、最初のイベントを取りこぼす
  bus.subscribe(handler);
}


export function case029() {
  // ID は 1 始まり（0 は「未保存」の意味で使っている）
  const nextId = lastId + 1;
}


export function case030() {
  // 座標は左下原点。画面座標（左上原点）とは y の向きが逆
  const y = height - point.y;
}


export function case031() {
  // サーバーは秒で返すが、ここから先はミリ秒で扱う
  const expiresAt = body.expires_in * 1000;
}


export function case032() {
  // fetch は 404 でも reject しない。ok を見ないと失敗を成功として扱ってしまう
  if (!response.ok) {
  throw new HttpError(response.status);
  }
}


export function case033() {
  // 同じ参照を返すと再描画されないので、新しいオブジェクトにする
  setState({ ...state, count: state.count + 1 });
}


export function case034() {
  // ここで await すると、ロックを持ったまま待つことになり、デッドロックする
  void flushQueue();
}


export function case035() {
  // JSON.stringify は undefined のキーを落とすので、null に置き換えてから送る
  const payload = replaceUndefined(form);
}


export function case036() {
  // toFixed は文字列を返す。比較の前に数値へ戻す
  const rounded = Number(value.toFixed(2));
}


export function case037() {
  // indexOf は 0 を返すこともあるので、真偽値で判定しない
  if (text.indexOf(prefix) !== -1) {
  matched = true;
  }
}


export function case038() {
  // dispose は二重に呼ばれうる。2 回目は何もしない
  if (this.disposed) {
  return;
  }
}


export function case039() {
  // 時刻はすべて UTC で持つ。表示するときだけ利用者のタイムゾーンに直す
  const createdAt = new Date().toISOString();
}


export function case040() {
  // Map の反復は挿入順。この順で画面に並ぶので、並べ替えてから入れる
  for (const entry of sorted) {
  map.set(entry.id, entry);
  }
}


export function case041() {
  // このハンドラは毎フレーム呼ばれる。ここで重い処理をしない
  this.latest = frame;
}


export function case042() {
  // 負の値が来ると無限ループになるので、0 で止める
  const remaining = Math.max(0, budget - used);
}


export function case043() {
  // innerHTML に入れると、利用者の入力が HTML として解釈される
  el.textContent = userInput;
}


export function case044() {
  // localStorage はプライベートモードで例外を投げることがある
  try {
  localStorage.setItem(key, value);
  } catch {
  return;
  }
}


export function case045() {
  // 右手系。x が右、y が上、z が手前
  const forward = { x: 0, y: 0, z: -1 };
}


export function case046() {
  // 添字は 0 始まりだが、表示する番号は 1 始まり
  const label = `${index + 1} 件目`;
}


export function case047() {
  // トークンの失効より少し前に更新する。ぎりぎりだと通信中に失効する
  const refreshAt = expiresAt - 60_000;
}


export function case048() {
  // close イベントは error の後にも必ず来る。片付けは close だけで行う
  socket.addEventListener('close', cleanup);
}


export function case049() {
  // g フラグ付きの正規表現を使い回すと、lastIndex が残って次の test が途中から始まる
  const pattern = /\d+/;
}


export function case050() {
  // 上の行で状態を確定させてから通知する。逆にすると、通知先が古い状態を読む
  this.emit("change");
}


export function case051() {
  // 符号の約束: 画面の右を向くと正、左を向くと負
  const yaw = Math.atan2(dx, dz);
}


export function case052() {
  // ユーザーから要望があったので、CSV でも書き出せるようにする
  exportCsv(rows);
}


export function case053() {
  // 使いやすさを上げるため、ボタンを大きめにする
  button.style.padding = '16px';
}


export function case054() {
  // パフォーマンス改善のためにキャッシュを入れる
  const cache = new Map<string, Result>();
}


export function case055() {
  // 将来ほかの決済サービスも試せるよう、呼び出しを関数に分けておく
  const charge = createCharger(provider);
}


export function case056() {
  // デモで見栄えがよくなるように、アニメーションを付ける
  el.classList.add('fade-in');
}


export function case057() {
  // 初めての人でも迷わないよう、最初に案内を出す
  showOnboarding();
}


export function case058() {
  // 待たされている感じを減らすため、読み込み中は進み具合を見せる
  spinner.show();
}


export function case059() {
  // 【仮説 A】通知を夜に送ると開封率が上がる → 21 時に送る
  scheduleAt(21);
}


export function case060() {
  // 【仮説 B】説明文を短くすると離脱が減る → 3 行までに切る
  const summary = lines.slice(0, 3);
}


export function case061() {
  // 営業チームの依頼で、管理画面にも同じ表を出す
  renderTable(adminRoot, rows);
}


export function case062() {
  // 利用者の集中を切らさないよう、通知は画面の端に小さく出す
  toast.show(message, { position: 'corner' });
}


export function case063() {
  // 検証を速く回せるよう、設定を画面から切り替えられるようにする
  settingsPanel.mount(root);
}


export function case064() {
  // 見た目をそろえるため、余白を 8 の倍数にする
  const gap = 8 * 2;
}


export function case065() {
  // 【仮説 C】相手の顔を見る時間が長いほど会話が続く → 視線の滞在時間を記録する
  dwellTimes.push(duration);
}


export function case066() {
  // 旧実装は localStorage だったが、タブ間で競合したため sessionStorage にした
  const saved = sessionStorage.getItem(key);
}


export function case067() {
  // 以前は 500ms 固定だったのを、速度に応じて可変にした
  const cutoff = minCutoff + beta * speed;
}


export function case068() {
  // バグ修正: 二重に呼ばれていたのを一度だけにした (#123)
  if (this.started) {
  return;
  }
}


export function case069() {
  // もともとここで正規化していたが、呼び出し側へ移した
  return raw;
}


export function case070() {
  // v2 で追加。従来の処理は削除した
  handleV2(event);
}


export function case071() {
  // 2024 年の改修で、ページ送りを無限スクロールに置き換えた
  observer.observe(sentinel);
}


export function case072() {
  // 前の担当者が入れた回避策は、ライブラリの更新で不要になったので外した
  render(view);
}


export function case073() {
  // レビューの指摘を受けて、変数名を短くした
  const cfg = options.config;
}


export function case074() {
  // IndexedDB は使わない: Safari のプライベートモードで書き込みが失敗するため
  const saved = sessionStorage.getItem(key);
}


export function case075() {
  // 状態管理ライブラリは入れない。この規模なら素の関数で足りる
  let state = initialState;
}


export function case076() {
  // setTimeout ではなく requestAnimationFrame を使う。タブが裏に回ったら止まってほしいから
  requestAnimationFrame(tick);
}


export function case077() {
  // 正規表現で一気に分けない。引用符の中のカンマまで切ってしまう
  const fields = parseCsvLine(line);
}


export function case078() {
  // Date ではなく performance.now を使う。時計の補正で値が戻ることがあるため
  const elapsed = performance.now() - startedAt;
}


export function case079() {
  // ここでは例外にしない。1 件の失敗で一括処理全体を止めたくない
  failures.push(item.id);
}


export function case080() {
  // for...in は使わない。プロトタイプのキーまで回ってしまう
  for (const key of Object.keys(obj)) {
  visit(key);
  }
}


export function case081() {
  // 並列にしない。API の同時接続数の制限に引っかかる
  for (const id of ids) {
  await sync(id);
  }
}


export function case082() {
  // タイムアウト（ms）
  const timeout = 5000;
}


export function case083() {
  // 再試行の上限回数
  const maxRetries = 3;
}


export function case084() {
  // 1 ページあたりの件数
  const pageSize = 20;
}


export function case085() {
  // 画面の端からの余白（px）
  const margin = 16;
}


export function case086() {
  // 直近に受け取った値（未受信なら null）
  let latest: number | null = null;
}


export function case087() {
  // 経過時間（秒）
  const elapsedSec = (now - start) / 1000;
}


export function case088() {
  // しきい値（0〜1）
  const threshold = 0.6;
}


export function case089() {
  // 選択中の行の番号
  let selectedIndex = -1;
}


export class Case090 {
  /** ユーザーを取得する */
  public getUser(id: string): User {}
}


export class Case091 {
  /** 設定を保存 */
  public saveSettings(settings: Settings): void {}
}


export class Case092 {
  /** 初期化 */
  public initialize(): void {}
}


export class Case093 {
  /** 解放 */
  public dispose(): void {}
}


export class Case094 {
  /** ログを追加 */
  public addLog(entry: LogEntry): void {}
}


/** 合計金額を計算する */
export function calculateTotal(items: Item[]): number {}


/** ユーザーのクラス */
export class User {}


/** 設定 */
export interface Settings {}


export class Case098 {
  /** カートに商品を追加する */
  public addItem(item: Item): void {}
}


export class Case099 {
  /** 画面を描画する */
  public render(): void {}
}


export class Case100 {
  /** タイマーを開始 */
  private startTimer(): void {}
}


export class Case101 {
  /** タイマーを停止 */
  private stopTimer(): void {}
}


export class Case102 {
  /** 名前を返す */
  public get name(): string {}
}


export class Case103 {
  /** ボタンのクリックを処理する */
  private handleClick(event: MouseEvent): void {}
}


/** 注文の一覧 */
export type OrderList = Order[];


export class Case105 {
  /** 接続を閉じる */
  public close(): void {}
}


/** データを読み込む */
export async function loadData(): Promise<Data> {}


export class Case107 {
  /** メッセージを送信する */
  public send(message: Message): void {}
}


/** 最大値 */
export const MAX_VALUE = 100;


export interface Case109 {
  /** ユーザー ID */
  userId: string;
}


export interface Case110 {
  /** 作成日時 */
  createdAt: Date;
}


/** フォームの値を検証する */
export function validateForm(values: FormValues): boolean {}


export class Case112 {
  /** キャッシュをクリアする */
  public clearCache(): void {}
}


export class Case113 {
  /** 現在のページ番号 */
  private currentPage = 1;
}


export class Case114 {
  /** 利用者がログインした直後に 1 回だけ呼ぶ。2 回目以降は何もしない */
  public onLogin(): void {}
}


export class Case115 {
  /** subscribe より前に呼ぶと、最初の通知を取りこぼす */
  public start(): void {}
}


/** 失敗しても例外を投げず、空の配列を返す。呼び出し側は失敗と「0 件」を区別できない */
export async function fetchTags(): Promise<string[]> {}


export class Case117 {
  /** 同じキーで並行に呼ばれると、後から終わった方の値だけが残る */
  public async save(key: string, value: string): Promise<void> {}
}


/** メインスレッドを 100ms ほど止める。描画の途中で呼ばない */
export function rebuildIndex(): void {}


/** 返す配列は、時刻の古い順に並んでいる */
export function history(): Entry[] {}


/** 引数の配列をその場で並べ替える（複製しない） */
export function sortInPlace(rows: Row[]): void {}


/** 呼ぶたびに新しい接続を開く。使い終わったら必ず close する */
export function openConnection(url: string): Connection {}


export class Case122 {
  /** dispose の後に呼ぶと例外になる */
  public update(delta: number): void {}
}


/** 空の配列を渡すと NaN を返す */
export function average(values: number[]): number {}


/** 結果は最大 5 分古いことがある（サーバー側でキャッシュしている） */
export async function fetchRanking(): Promise<Rank[]> {}


export class Case125 {
  /** 変更は次のタスクで反映される。呼んだ直後には、まだ状態が変わっていない */
  public requestRefresh(): void {}
}


/** 区切りには / を使うこと。Windows でもバックスラッシュは受け付けない */
export function readAsset(path: string): Promise<string> {}


/** 利用者の入力をそのまま渡さない。HTML として解釈される */
export function setHtml(el: HTMLElement, html: string): void {}


/** 返すのは文字数からの見積もりで、実測ではない */
export function estimateDuration(text: string): number {}


export class Case129 {
  /** 一度 true になったら false には戻らない */
  private connected = false;
}


export class Case130 {
  /** onChange を同期的に呼ぶことがある。呼び出し側は再入に備える */
  public setValue(value: string): void {}
}


/** 同じ入力には同じ値を返す（乱数の種を入力から作る） */
export function avatarColor(userId: string): string {}


/** タイムアウト（ms） */
export const TIMEOUT = 5000;


export class Case133 {
  /** 待ち時間（秒） */
  public delay = 3;
}


/** 'asc' か 'desc' のどちらか */
export function sortBy(order: string): void {}


export class Case135 {
  /** 戻り値の配列は書き換えないこと */
  public getItems(): Item[] {}
}


/** 見つからなければ undefined を返す */
export function findUser(id: string): User {}


/** flag が true なら昇順 */
export function sortRows(rows: Row[], flag: boolean): Row[] {}


export interface Case138 {
  /** 幅（px） */
  width: number;
}


/** 'admin'、'editor'、'viewer' のいずれか */
export function setRole(role: string): void {}


export interface Case140 {
  /** 省略できる */
  id: string;
}


/** 読み取れなければ null を返す */
export function parseDate(text: string): Date {}


export class Case142 {
  /** 経過時間（ミリ秒） */
  private elapsed = 0;
}


/** 利用者の要望で追加した、CSV の書き出し */
export function exportCsv(rows: Row[]): string {}


/** 見栄えをよくするために入れたアニメーション */
export function fadeIn(el: HTMLElement): void {}


/** パフォーマンスを改善するために作ったキャッシュ */
export class ResultCache {}


/** 営業チームの依頼で作った集計 */
export function salesSummary(orders: Order[]): Summary {}


/** 将来の拡張に備えて分けておいたインターフェース */
export interface Storage {}


/** デモに間に合わせるために急いで作った画面 */
export function renderDemo(root: HTMLElement): void {}


/** 再生速度。標準では遅く感じたので 1.25 に上げた */
export const PLAYBACK_RATE = 1.25;


/** v1 の API から移した関数。以前は utils.ts にあった */
export function formatPrice(value: number): string {}


/** #42 の修正で、引数の順番を入れ替えた */
export function between(min: number, max: number, value: number): boolean {}


/** もともと同期処理だったが、2023 年に非同期へ変えた */
export async function loadConfig(): Promise<Config> {}


/** 通知を出す。alert() は操作を止めてしまうので使わない */
export function showToast(message: string): void {}


/** フレームの間隔（ms）。実機は 16ms 前後だが、境界の値を正確に試せるよう 10ms にしている */
export const FRAME_MS = 10;


/** 日付の差を求める。日付ライブラリは入れない。必要なのは日数の差だけで、依存を増やすほどではない */
export function daysBetween(a: Date, b: Date): number {}


/** ID を作る。連番にはしない。複数の端末で同時に作ると衝突する */
export function createId(): string {}

