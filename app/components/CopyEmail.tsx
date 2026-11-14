"use client";

import { useState } from "react";

// メールアドレスをコピーするボタン。クリップボードが使えない環境では、アドレスの文字を選択状態にする。
export default function CopyEmail({ email, targetId }: { email: string; targetId: string }) {
  const [copied, setCopied] = useState(false);

  function selectText() {
    const el = document.getElementById(targetId);
    const sel = window.getSelection();
    if (!el || !sel) return;
    const range = document.createRange();
    range.selectNodeContents(el);
    sel.removeAllRanges();
    sel.addRange(range);
  }

  async function handleClick() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      selectText();
    }
  }

  return (
    <button type="button" className="btn btn-ghost" onClick={handleClick} aria-live="polite">
      {copied ? "コピーしました" : "アドレスをコピー"}
    </button>
  );
}
