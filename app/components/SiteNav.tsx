"use client";

import { useEffect, useState } from "react";

type NavLink = { href: string; label: string; ja: string };

// PC では横並びのメニュー、スマホではハンバーガーボタンで開く全画面メニューにする。
export default function SiteNav({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth > 860 && setOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    document.documentElement.classList.add("menu-open");
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      document.documentElement.classList.remove("menu-open");
    };
  }, [open]);

  return (
    <>
      <nav className="main" aria-label="メインメニュー">
        {links.map((l) => (
          <a key={l.href} href={l.href}>{l.label}</a>
        ))}
      </nav>
      <button
        type="button"
        className="menu-btn"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "メニューを閉じる" : "メニューを開く"}
        onClick={() => setOpen((v) => !v)}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>
      <div id="mobile-menu" className="mobile-menu" hidden={!open}>
        <ul>
          {links.map((l, i) => (
            <li key={l.href} style={{ "--d": i } as React.CSSProperties}>
              <a href={l.href} onClick={() => setOpen(false)}>
                <span className="en">{l.label}</span>
                <span className="ja">{l.ja}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
