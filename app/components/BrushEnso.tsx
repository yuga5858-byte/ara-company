import { brushEnso as d } from "./brushEnsoData";

// 筆で描いた円相。太い入り（墨だまり）→ 運び → 細い抜け、後半にかすれと毛先のすじ。
// 描く演出は、筆の進む向きに沿って太い線のマスクを伸ばして、形を少しずつ見せることで行う（CSS: .enso-reveal）。
// 墨の縁のにじみは SVG フィルター（ノイズで縁を揺らす）で出す。
export default function BrushEnso({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 600 600" aria-hidden="true" focusable="false">
      <defs>
        <filter id="enso-brush" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" result="grain" />
          <feDisplacementMap in="SourceGraphic" in2="grain" scale="5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <mask id="enso-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="600" height="600">
          <path className="enso-reveal" d={d.center} pathLength={1} fill="none" stroke="#fff" strokeWidth="96" strokeLinecap="round" />
        </mask>
      </defs>
      <g mask="url(#enso-mask)">
        <g filter="url(#enso-brush)" className="enso-ink">
          <g opacity="0.92">
            <ellipse cx={d.blob.cx} cy={d.blob.cy} rx={d.blob.rx} ry={d.blob.ry} />
            <path d={d.body} />
          </g>
          <g className="enso-dry" fill="none" strokeLinecap="round">
            {d.dry.map((b, i) => <path key={i} d={b.d} strokeWidth={b.w} opacity={b.o} />)}
          </g>
          <g className="enso-bristle" fill="none" strokeLinecap="round">
            {d.bristles.map((b, i) => <path key={i} d={b.d} strokeWidth={b.w} opacity={b.o} />)}
          </g>
          {d.dots.map((c, i) => <circle key={i} cx={c.cx} cy={c.cy} r={c.r} />)}
        </g>
      </g>
    </svg>
  );
}
