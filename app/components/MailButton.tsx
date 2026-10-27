"use client";

import { useState } from "react";

// mailto はメールアプリが設定されていない端末では何も起きないため、
// 押してもページから離れなかったときに Gmail で作成する案内を出す。
export default function MailButton({ href, gmailHref, className }: { href: string; gmailHref: string; className?: string }) {
  const [fallback, setFallback] = useState(false);

  function handleClick() {
    let left = false;
    const onBlur = () => { left = true; };
    window.addEventListener("blur", onBlur, { once: true });
    window.setTimeout(() => {
      window.removeEventListener("blur", onBlur);
      if (!left && document.visibilityState === "visible") setFallback(true);
    }, 1500);
  }

  return (
    <>
      <a className={className} href={href} onClick={handleClick}>メールでお問い合わせ <span aria-hidden="true">→</span></a>
      {fallback && (
        <p className="mail-fallback" role="status">
          メールアプリが起動しない場合は、<a href={gmailHref} target="_blank" rel="noopener noreferrer">Gmailで作成する</a>か、アドレスをコピーしてお送りください。
        </p>
      )}
    </>
  );
}
