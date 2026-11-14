"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { mainNav, serviceNav, norm } from "./nav";

// PC：ホーム｜サービス▼｜会社概要｜お問い合わせ。サービスはクリック（またはキーボード）で開くドロップダウン。
// スマホ：ハンバーガーで開く全画面メニュー（サービスは中で開閉）。
export default function SiteHeader() {
  const pathname = norm(usePathname() ?? "/");
  const [dropOpen, setDropOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);
  const dropRef = useRef<HTMLLIElement>(null);

  const isCurrent = (href: string) => norm(href) === pathname;
  const inServices = pathname.startsWith("/services");

  // ページを移動したら閉じる（描画中に前回のパスと比べる）
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setDropOpen(false);
    setMenuOpen(false);
  }

  // ドロップダウン：外側クリック・Escape で閉じる
  useEffect(() => {
    if (!dropOpen) return;
    const onDown = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDropOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDropOpen(false);
        dropRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [dropOpen]);

  // スマホメニュー：背景のスクロールを止める・Escape で閉じる
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    const onResize = () => window.innerWidth > 900 && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    document.documentElement.classList.add("menu-open");
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      document.documentElement.classList.remove("menu-open");
    };
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="wrap">
        <Link className="logo" href="/" aria-label="ARA COMPANY ホーム">
          <span className="logo-mark" aria-hidden="true" />
          <b>ARA COMPANY</b>
        </Link>

        <nav className="gnav" aria-label="メインメニュー">
          <ul>
            {mainNav.map((n) =>
              "children" in n ? (
                <li key={n.href} className="has-drop" ref={dropRef}>
                  <button
                    type="button"
                    className={`nav-trigger${inServices ? " is-current" : ""}`}
                    aria-expanded={dropOpen}
                    aria-controls="services-menu"
                    onClick={() => setDropOpen((v) => !v)}
                  >
                    {n.label}
                    <span className="caret" aria-hidden="true" />
                  </button>
                  <div className="dropdown" id="services-menu" hidden={!dropOpen}>
                    <ul>
                      {serviceNav.map((s) => (
                        <li key={s.href}>
                          <Link href={s.href} aria-current={isCurrent(s.href) ? "page" : undefined}>
                            <strong>{s.label}{s.status ? <span className="sr-only">（{s.status}）</span> : null}</strong>
                            <small>{s.short}</small>
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link className="drop-all" href="/services/" aria-current={isCurrent("/services/") ? "page" : undefined}>
                          サービス一覧を見る <span aria-hidden="true">→</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={n.href}>
                  <Link href={n.href} aria-current={isCurrent(n.href) ? "page" : undefined}>{n.label}</Link>
                </li>
              ),
            )}
            <li>
              <Link className="nav-cta" href="/contact/" aria-current={isCurrent("/contact/") ? "page" : undefined}>お問い合わせ</Link>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          className="menu-btn"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>

      <nav className="mobile-menu" id="mobile-menu" hidden={!menuOpen} aria-label="メインメニュー（スマートフォン）">
        <ul>
          <li><Link href="/" aria-current={isCurrent("/") ? "page" : undefined}>ホーム</Link></li>
          <li>
            <button type="button" className="sub-trigger" aria-expanded={subOpen} aria-controls="mobile-services" onClick={() => setSubOpen((v) => !v)}>
              サービス <span className="caret" aria-hidden="true" />
            </button>
            <ul className="sub" id="mobile-services" hidden={!subOpen}>
              <li><Link href="/services/" aria-current={isCurrent("/services/") ? "page" : undefined}>サービス一覧</Link></li>
              {serviceNav.map((s) => (
                <li key={s.href}><Link href={s.href} aria-current={isCurrent(s.href) ? "page" : undefined}>{s.label}</Link></li>
              ))}
            </ul>
          </li>
          <li><Link href="/about/" aria-current={isCurrent("/about/") ? "page" : undefined}>会社概要</Link></li>
          <li><Link href="/contact/" aria-current={isCurrent("/contact/") ? "page" : undefined}>お問い合わせ</Link></li>
        </ul>
        <Link className="btn btn-block" href="/contact/">お問い合わせ <span className="arrow" aria-hidden="true">→</span></Link>
      </nav>
    </header>
  );
}
