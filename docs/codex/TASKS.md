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
| 1 | アートディレクション・実装（トップページ） | app/(site)/、app/layout.tsx、app/components/ScrollFx.tsx、app/services.ts | Claude Code | 保留（墨の背景つきで公開後、社長の判断で前のデザインに戻した 2026-11-11。部品 InkField・BrushEnso はリポジトリに残す） | claude/renewal-2026-11 | 文章は content.ts に旧サイトから一字一句移動 |
| 2 | レビュー（アクセシビリティ・スマホ表示・内容のルール） | — | Codex | 未着手 | | PR を開くと自動でレビュー |
| 3 | 本番公開 | — | Claude Code | 未着手 | | 社長の最終承認後 |

---

## 作業：ARA COMPANY 公式サイトの複数ページ化と白い墨の水面（2026-11-15／依頼：社長）

方針：今のデザインのまま、トップ／私たちについて／企業理念／事業構想／Web制作・AI導入／創業の原点／お問い合わせ に分ける。文章は一字一句そのまま。背景の水面に白い墨が溶けて流れる表現を足す。

| No | タスク | 触ってよいファイル | 担当 | 状態 | ブランチ | メモ |
|---|---|---|---|---|---|---|
| 1 | ページ分け・白い墨 | app/(site)/、app/components/Water.tsx、app/sitemap.ts | Claude Code | 完了 | claude/ara-multipage-white-ink | 旧URL（/#story など）は該当ページへ自動で移動 |
| 2 | レビュー | — | Codex | 完了 | | 指摘1件（ページ移動後にスクロール演出が出ない）を 92d8b76 で修正 |
| 3 | 本番公開 | — | Claude Code | 完了 | | 2026-11-16 社長の承認で公開（#13）。パソコンの「アニメーションを減らす」設定でも水面がゆっくり動くよう修正済み |

---

## 作業：煙の背景と映画風の演出（2026-11-18／依頼：社長。参考：kazera.jp の雰囲気。素材・コードは使わない）

方針：背景を水から煙（流体シミュレーション）に変え、映画風の枠・煙から現れるオープニング・スクロールで円相が煙に崩れる演出を足す。文章・ページ構成は変えない。重い作業のため分担を書くが、部品どうしが煙の背景に依存するので、実装は Claude Code がまとめて行い、Codex はレビューを担当する。

| No | タスク | 触ってよいファイル | 担当 | 状態 | ブランチ | メモ |
|---|---|---|---|---|---|---|
| 1 | 煙の背景（WebGL2 流体。使えない端末は水面に戻す） | app/components/Smoke.tsx、app/(site)/_parts/chrome.tsx | Claude Code | レビュー待ち | claude/ara-smoke-bg | 試作済み（917d015） |
| 2 | 映画風の枠（下の黒帯・スクロールの進み具合・四隅の SCENE／FRAME／TC） | app/components/CinemaHud.tsx、app/(site)/globals.css | Claude Code | レビュー待ち | claude/ara-smoke-bg | 読み上げ対象外（aria-hidden）。スマホは控えめに |
| 3 | オープニング：煙の中から「ARA COMPANY」が現れる | app/components/IntroReveal.tsx、app/components/Enso.tsx、app/(site)/layout.tsx、app/layout.tsx | Claude Code | レビュー待ち | claude/ara-smoke-bg | 1回の訪問で1度だけ。クリック・スクロールで飛ばせる。動きを減らす設定では出さない |
| 4 | スクロールで円相とロゴが煙・砂のように崩れる | app/components/EnsoDissolve.tsx、app/(site)/_parts/sections.tsx | Claude Code | レビュー待ち | claude/ara-smoke-bg | 戻すと元の形に戻る。動きを減らす設定では崩さない |
| 5 | レビュー（表示崩れ・重さ・アクセシビリティ・内容のルール） | — | Codex | 未着手 | | PR を開くと自動でレビュー |
| 6 | 本番公開 | — | Claude Code | 未着手 | | 社長の承認後 |
