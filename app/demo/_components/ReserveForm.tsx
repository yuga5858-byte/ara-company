"use client";

import { useState } from "react";
import styles from "./demo.module.css";

type Field = { id: string; label: string; type: "text" | "email" | "tel" | "date" | "select"; options?: string[]; required?: boolean };

// デモ用の予約フォーム。入力チェックまで動き、送信はしない。
export default function ReserveForm({ fields, submitLabel, className }: { fields: Field[]; submitLabel: string; className?: string }) {
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const missing = fields.filter((f) => f.required && !String(data.get(f.id) ?? "").trim());
    if (missing.length) {
      setMessage(`${missing.map((f) => f.label).join("・")}を入力してください。`);
      return;
    }
    setMessage("デモのため、予約は送信されません。実際のサイトでは、ここで予約を受け付けます。");
  }

  return (
    <form className={className} onSubmit={handleSubmit} noValidate>
      {fields.map((f) => (
        <label key={f.id} className={styles.field} htmlFor={f.id}>
          <span>
            {f.label}
            {f.required && <em> 必須</em>}
          </span>
          {f.type === "select" ? (
            <select id={f.id} name={f.id} defaultValue="">
              <option value="" disabled>選択してください</option>
              {f.options?.map((o) => <option key={o}>{o}</option>)}
            </select>
          ) : (
            <input id={f.id} name={f.id} type={f.type} autoComplete={f.type === "email" ? "email" : f.type === "tel" ? "tel" : f.id === "name" ? "name" : "off"} />
          )}
        </label>
      ))}
      <button type="submit">{submitLabel}</button>
      <p className={styles.formMsg} aria-live="polite">{message}</p>
    </form>
  );
}
