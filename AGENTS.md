# AGENTS.md — ARA COMPANY 公式サイト（開発・レビューの共通ルール）

このファイルは Codex と Claude Code の両方が読む共通ルールです。
ARA COMPANY は大阪府の個人事業（代表 安羅 夕雅）です。法人ではありません。
このリポジトリには、Web・AI 事業 ARVR TECH の制作デモ（`app/demo/`）も入っています。

## 役割分担と連絡

| 担当 | 役割 |
|---|---|
| 社長（代表） | 最終決定。公開（main への push）・価格・ブランドの重要事項を決める |
| Claude Code | 設計・実装・最後のまとめと確認・公開作業 |
| Codex | 分担した部分の実装、Claude Code の変更のレビュー |

- 連絡は GitHub の Issue と Pull Request のコメントで行う。Claude Code から Codex への依頼は Issue に `@codex` と書く。Codex は終わったこと・分からなかったことを同じ Issue／PR にコメントする
- Codex は `main` に直接 push しない。作業は `codex/` で始まるブランチで行い、Pull Request にする
- お互いの変更はうのみにせず、確認してからまとめる
- `main` に push すると Cloudflare が自動で本番公開する。サイトの表示・内容が変わる変更を main に入れるのは社長の承認後
- 例外：ルール・ドキュメントだけの変更（AGENTS.md・CLAUDE.md・docs/ 以下）は、チェックを通したうえで Claude Code が main に入れてよい（2026-11-06 社長承認）

## 作業の分担

- 分担は `docs/codex/TASKS.md` に書く。タスクごとに「触ってよいファイル」を決め、同じファイルを2人が同時に触らない
- 取りかかるときに状態を「作業中」、終わったら「レビュー待ち」にしてブランチ名を書く

## 技術

- Next.js 16（App Router）/ TypeScript。静的書き出し（`out/`）を Cloudflare Workers で配信（無料プラン）
- Next.js 16 は以前の版と仕様が違う。書く前に `node_modules/next/dist/docs/` の該当ガイドを読む
- 公開URL：https://ara-company.jp（`app/site.ts` の `siteUrl` で固定。環境変数で上書きしない）
- `worker.js`：旧URL（*.workers.dev）から独自ドメインへの 301 転送。消さない

## 変更前後に必ず通すチェック

```bash
npm run lint
npx tsc --noEmit
npm run build:static
```

## 内容のルール（必ず守る）

- 架空の制作実績・口コミ・お客様の声・施工事例・売上増加率・顧客数を書かない。お客様の声や事例は「掲載イメージ」の枠だけにする
- 制作デモは、ページ上部の `DemoBanner` で「制作デモ・架空」と必ず明記し、`robots: { index: false, follow: false }` にする
- デモの会社名・人名・住所・電話番号は架空にする。実在する番号の形（例：06-xxxx-xxxx）を書かない。住所は「大阪府〇〇市（架空）」程度にとどめる
- ARA COMPANY を法人のように書かない（「株式会社」「法人」「設立」を使わない）
- できないサービス・未実装の機能を約束しない（LINE・予約などのボタンは「デモ」と分かる動きにする）
- 有料のAPI・素材・写真を勝手に使わない。写真は `DemoPhoto` の差し替え枠を使う
- 業種ごとの決まりに注意する（例：工事の「最安」「No.1」などの根拠のない表現、建設業許可番号の創作をしない）
- APIキー・パスワードなどの秘密情報を書かない
