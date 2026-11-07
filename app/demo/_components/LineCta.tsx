"use client";

import { useState } from "react";
import styles from "./demo.module.css";

// LINE 相談・予約ボタンの見本。デモなので LINE には移動せず、実際の動きを説明する。
export default function LineCta({ label, note, className }: { label: string; note: string; className?: string }) {
  const [shown, setShown] = useState(false);
  return (
    <div className={styles.line}>
      <button type="button" className={className ?? styles.lineBtn} onClick={() => setShown(true)}>
        <span className={styles.lineMark} aria-hidden="true">LINE</span>
        {label}
      </button>
      <p className={styles.formMsg} aria-live="polite">
        {shown ? `デモのため LINE には移動しません。実際のサイトでは、ここからお店の LINE が開き、${note}` : ""}
      </p>
    </div>
  );
}
