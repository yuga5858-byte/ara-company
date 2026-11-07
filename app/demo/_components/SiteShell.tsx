import type { ReactNode } from "react";
import { solutions } from "../../site";
import DemoBanner from "./DemoBanner";
import styles from "./shell.module.css";

export type NavItem = { href: string; label: string };

// 複数ページの HP デモに共通する枠（デモ表示・ヘッダー・メニュー・フッター・スマホの固定ボタン）。
// 色と書体は、各デモの CSS で定義した変数（--bg --fg --muted --line --surface --accent --accent-fg --body --display）を使う。
// className にその変数を定義したクラスを渡す。
export default function SiteShell({
  brand,
  brandSub,
  nav,
  current,
  cta,
  tone,
  className,
  children,
}: {
  brand: string;
  brandSub?: string;
  nav: NavItem[];
  current: string;
  cta: NavItem;
  tone: "dark" | "light";
  className: string;
  children: ReactNode;
}) {
  const home = nav[0];
  return (
    <div className={`${className} ${styles.root}`}>
      <DemoBanner tone={tone} />

      <header className={styles.header}>
        <a className={styles.logo} href={home.href}>
          {brand}
          {brandSub && <small>{brandSub}</small>}
        </a>
        <nav className={styles.nav} aria-label="サイト内メニュー">
          {nav.map((n) => (
            <a key={n.href} href={n.href} aria-current={n.href === current ? "page" : undefined}>
              {n.label}
            </a>
          ))}
        </nav>
        <a className={styles.headerCta} href={cta.href}>{cta.label}</a>
        <details className={styles.menu}>
          <summary aria-label="メニューを開く">
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </summary>
          <nav aria-label="サイト内メニュー（スマートフォン）">
            {nav.map((n) => (
              <a key={n.href} href={n.href} aria-current={n.href === current ? "page" : undefined}>
                {n.label}
              </a>
            ))}
            <a className={styles.menuCta} href={cta.href}>{cta.label}</a>
          </nav>
        </details>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <p className={styles.logo}>
            {brand}
            {brandSub && <small>{brandSub}</small>}
          </p>
          <nav aria-label="フッターメニュー">
            {nav.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
          </nav>
        </div>
        <p className={styles.footerNote}>
          この会社・店舗は実在しません。ARVR TECH（運営：ARA COMPANY）による Web 制作デモです。
        </p>
        <a className={styles.footerLink} href={solutions.url ?? "/#services"}>ARVR TECH の Web 制作について</a>
      </footer>

      <a className={styles.stickyCta} href={cta.href}>{cta.label}</a>
    </div>
  );
}
