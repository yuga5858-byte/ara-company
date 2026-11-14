"use client";

import { useState, useSyncExternalStore } from "react";
import { site, mailtoHref, gmailHref } from "../../site";
import { inquiryTopics } from "../../services";
import CopyEmail from "../CopyEmail";

const subscribeNothing = () => () => {};

function buildMail(topicId: string) {
  const t = inquiryTopics.find((x) => x.id === topicId);
  if (!t) return { subject: "お問い合わせ", body: "" };
  return {
    subject: t.subject,
    body: [`ご相談内容：${t.label}`, "", "業種・会社名／店舗名：", "ご相談の詳細：", "ご希望の時期・ご予算（決まっていれば）：", ""].join("\n"),
  };
}

// お問い合わせ方法はメールに統一。相談内容を選ぶと、件名と本文の書き出しに入る。
// 各サービスページから ?topic=〇〇 付きで来たときは、その内容を選んだ状態にする。
export default function MailContact() {
  // URL の ?topic=（サーバーでの書き出し時は空）
  const search = useSyncExternalStore(subscribeNothing, () => window.location.search, () => "");
  const fromUrl = new URLSearchParams(search).get("topic") ?? "";
  const [chosen, setChosen] = useState<string | null>(null);
  const topic = chosen ?? (inquiryTopics.some((t) => t.id === fromUrl) ? fromUrl : "");
  const setTopic = (v: string) => setChosen(v);
  const [fallback, setFallback] = useState(false);

  if (!site.email) return null;
  const { subject, body } = buildMail(topic);

  function onMail() {
    let left = false;
    const onBlur = () => { left = true; };
    window.addEventListener("blur", onBlur, { once: true });
    window.setTimeout(() => {
      window.removeEventListener("blur", onBlur);
      if (!left && document.visibilityState === "visible") setFallback(true);
    }, 1500);
  }

  return (
    <div className="contact-box">
      <div>
        <p className="eyebrow">Email</p>
        <p className="addr" id="contact-email">{site.email}</p>
      </div>
      <div className="field">
        <label htmlFor="topic">ご相談内容<small>（任意）</small></label>
        <div className="select-wrap">
          <select id="topic" value={topic} onChange={(e) => setTopic(e.target.value)} aria-describedby="topic-help">
            <option value="">選択しない</option>
            {inquiryTopics.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
          </select>
        </div>
        <p className="help" id="topic-help">選ぶと、メールの件名と本文の書き出しに入ります。</p>
      </div>
      <div className="actions">
        <a className="btn" href={mailtoHref(subject, body)} onClick={onMail}>メールで問い合わせる <span className="arrow" aria-hidden="true">→</span></a>
        <CopyEmail email={site.email} targetId="contact-email" />
      </div>
      <p className={fallback ? "mail-fallback" : "help"} role={fallback ? "status" : undefined}>
        メールアプリが開かない場合は、<a href={gmailHref(subject, body)} target="_blank" rel="noopener noreferrer">Gmailで作成する<span className="sr-only">（新しいタブで開きます）</span></a>か、アドレスをコピーしてお使いのメールからお送りください。
      </p>
    </div>
  );
}
