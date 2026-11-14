import Link from "next/link";
// お問い合わせへの導線（各ページの最後に置く）。topic を渡すと、お問い合わせページで相談内容が選ばれた状態になる。
export default function CtaBand({
  title = "まずは、お気軽にご相談ください。",
  lead = "内容が固まっていなくても大丈夫です。業種と、困っていることをメールでお送りください。",
  topic,
  label = "お問い合わせ",
}: { title?: string; lead?: string; topic?: string; label?: string }) {
  const href = topic ? `/contact/?topic=${encodeURIComponent(topic)}` : "/contact/";
  return (
    <section className="cta-band" aria-labelledby="cta-title">
      <div className="wrap">
        <h2 id="cta-title">{title}</h2>
        <p>{lead}</p>
        <div className="actions">
          <Link className="btn" href={href}>{label} <span className="arrow" aria-hidden="true">→</span></Link>
        </div>
      </div>
    </section>
  );
}
