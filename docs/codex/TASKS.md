# 作業分担ボード（Codex ⇄ Claude Code）

ルールは AGENTS.md の「作業の分担」。状態：未着手 → 作業中 → レビュー待ち → 完了（または 保留）

---

## 作業：工務店・清掃の LP／HP 制作デモ（2026-11-07／依頼：社長）

仕様：`docs/demo/DEMO_SPEC.md`／土台ブランチ：`demo/construction-cleaning`

| No | タスク | 触ってよいファイル | 担当 | 状態 | ブランチ | メモ |
|---|---|---|---|---|---|---|
| 1 | 共通部品（SiteShell・LineCta）と仕様書 | app/demo/_components/、docs/ | Claude Code | 完了 | demo/construction-cleaning | |
| 2 | 工務店 LP＋HP（木栖工務店） | app/demo/kisu/、app/demo/kisu-hp/ | Claude Code | 完了 | claude/2-kisu | Codex にレビューを依頼 |
| 3 | 清掃 LP＋HP（ミナモ清掃） | app/demo/minamo/、app/demo/minamo-hp/ | Codex | 完了 | codex/3-minamo | 共通部品は変更しない。直したい点は PR にコメント |
| 4 | お互いの作ったもののレビュー | — | 両方 | 完了 | | 2・3 の完了後 |
| 5 | デモ一覧ページ・最終確認・公開 | app/demo/page.tsx ほか | Claude Code | レビュー待ち | claude/5-demo-index | デモ一覧・共通フォームの改善（長文欄・完了文）済み。本番公開は社長の承認待ち |

---

## 作業：ARA COMPANY 公式サイト リニューアル「和モダン × コンテンポラリーアート」（2026-11-11／依頼：社長）

リニューアル前のサイト：ブランチ `backup/site-before-renewal-2026-11`（いつでも戻せる）

| No | タスク | 触ってよいファイル | 担当 | 状態 | ブランチ | メモ |
|---|---|---|---|---|---|---|
| 1 | アートディレクション・実装（トップページ） | app/(site)/、app/layout.tsx、app/components/ScrollFx.tsx、app/services.ts | Claude Code | レビュー待ち | claude/renewal-2026-11 | 文章は content.ts に旧サイトから一字一句移動 |
| 2 | レビュー（アクセシビリティ・スマホ表示・内容のルール） | — | Codex | 未着手 | | PR を開くと自動でレビュー |
| 3 | 本番公開 | — | Claude Code | 未着手 | | 社長の最終承認後 |
