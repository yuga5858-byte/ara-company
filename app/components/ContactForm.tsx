"use client";

import { useState } from "react";

export default function ContactForm() {
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    if (!name || !/^\S+@\S+\.\S+$/.test(email)) {
      setMessage("お名前と正しいメールアドレスを入力してください。");
      return;
    }
    // TODO: 問い合わせ用メールアドレスが決まったら送信処理をつなぐ
    setMessage("現在、フォームの送信先を準備中です。公開後にご利用いただけます。");
  }

  return (
    <form className="inq" onSubmit={handleSubmit} noValidate>
      <div className="field"><label htmlFor="f-name">お名前</label><input id="f-name" name="name" type="text" autoComplete="name" required /></div>
      <div className="field"><label htmlFor="f-mail">メールアドレス</label><input id="f-mail" name="email" type="email" autoComplete="email" required /></div>
      <div className="field">
        <label htmlFor="f-topic">お問い合わせの種類</label>
        <select id="f-topic" name="topic">
          <option>ORMOSCIAについて</option>
          <option>協業のご相談</option>
          <option>取材のご依頼</option>
          <option>その他</option>
        </select>
      </div>
      <div className="field"><label htmlFor="f-body">お問い合わせ内容</label><textarea id="f-body" name="body" /></div>
      <button className="btn" type="submit">送信する</button>
      <p className="form-msg" aria-live="polite">{message}</p>
    </form>
  );
}
