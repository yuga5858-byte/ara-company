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

## 作業：コーポレートサイトのマルチページ化（2026-11-14／依頼：社長）

構成案：`docs/renewal-multipage-plan.md`。2026-11-14 社長確認済み：サイトは ARVR TECH の事業だけを扱う（ORMOSCIA・OUR STORY などは載せない）／Web広告運用は「ご相談受付中」／料金は tech.ara-company.jp の料金表にそろえる
共通のデータとレイアウトを全ページが使うため、同時に分けると衝突する。Claude Code が順番に進め、Codex はレビューを担当する。

| No | タスク | 触ってよいファイル | 担当 | 状態 | ブランチ | メモ |
|---|---|---|---|---|---|---|
| 1 | 共通レイアウト（ヘッダー・ドロップダウン・スマホメニュー・フッター）とデザインの土台 | app/(site)/layout.tsx、app/(site)/globals.css、app/components/ | Claude Code | レビュー待ち | claude/corporate-multipage | |
| 2 | サービスのデータ（5サービス・料金・FAQ・3プラン） | app/services.ts、app/site.ts | Claude Code | レビュー待ち | 同上 | 料金を勝手に決めない。未確定は「お見積もり」 |
| 3 | トップページの作り直し | app/(site)/page.tsx、app/(site)/content.ts | Claude Code | レビュー待ち | 同上 | 旧アンカーの案内を入れる |
| 4 | サービス一覧・詳細5ページ | app/(site)/services/ | Claude Code | レビュー待ち | 同上 | 共通テンプレートで8ブロック |
| 5 | 会社概要・お問い合わせ・プライバシーポリシー | app/(site)/about/、app/(site)/contact/、app/(site)/privacy/ | Claude Code | レビュー待ち | 同上 | フォームは送信先が決まるまで非表示のまま |
| 6 | SEO（title・description・canonical）、sitemap、リンク切れ確認、PC・スマホ確認 | app/sitemap.ts ほか | Claude Code | レビュー待ち | 同上 | |
| 7 | レビュー（内容のルール・表示・アクセシビリティ） | — | Codex | 未着手 | — | 本番公開は社長の承認後 |
