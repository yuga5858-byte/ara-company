import Link from "next/link";
import { services, servicePath } from "../../services";

// サービスのカード（トップ・サービス一覧で共通）。showPrice で料金の目安を出す。
export default function ServiceCards({ showPrice = false, headingLevel = 3 }: { showPrice?: boolean; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <ul className="cards">
      {services.map((s) => (
        <li key={s.slug} className="card">
          <div className="card-top">
            <p className="card-en">{s.en}</p>
            {s.status && <span className="badge badge-soft">{s.status}</span>}
          </div>
          <H>{s.name}</H>
          <p>{s.short}</p>
          {showPrice && <p className="card-price">料金の目安：<b>{s.priceHint}</b></p>}
          <div className="card-foot">
            <Link className="text-link stretched" href={servicePath(s.slug)}>
              詳細を見る<span className="sr-only">（{s.name}）</span> <span aria-hidden="true">→</span>
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
