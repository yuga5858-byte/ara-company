import type { ReactNode } from "react";
import DemoPhoto from "../_components/DemoPhoto";
import LineCta from "../_components/LineCta";
import SiteShell from "../_components/SiteShell";
import { faqs, HP, menus, nav, steps } from "./data";
import s from "./minamo.module.css";
export function Photo({ brief, className = "" }: { brief: string; className?: string }) { return <DemoPhoto tone="light" className={`${s.photo} ${className}`} photo={{ src: null, alt: brief, brief }} />; }
export function Line({ label = "LINEで見積もり・予約" }: { label?: string }) { return <LineCta className={s.button} label={label} note="写真でのお見積もり相談や日程のご相談ができます。" />; }
export function Shell({ current, children }: { current: string; children: ReactNode }) { return <SiteShell brand="ミナモ清掃" brandSub="MINAMO CLEANING" nav={nav} current={current} cta={{ href: `${HP}contact/`, label: "お問い合わせ" }} tone="light" className={s.theme}>{children}</SiteShell>; }
export function Heading({ en, title, children }: { en: string; title: string; children?: ReactNode }) { return <div className={s.heading}><p className={s.kicker}>{en}</p><h1>{title}</h1>{children && <p className={s.lead}>{children}</p>}</div>; }
export function Prices() { return <><div className={s.cards}>{menus.map(m => <article key={m.title} className={`${s.card} ${m.featured ? s.featured : ""}`}>{m.featured && <p className={s.tag}>まとめてお手入れ</p>}<h3>{m.title}</h3><p className={s.price}>{m.price}<small>（税込）</small></p><p>{m.body}</p></article>)}</div><p className={s.note}>※ デモ用の架空の料金です。設備・作業範囲によって異なる想定です。</p></>; }
export function Steps() { return <ol className={s.steps}>{steps.map((v, i) => <li key={v.title}><span className={s.number}>0{i + 1}</span><div><h3>{v.title}</h3><p>{v.body}</p></div></li>)}</ol>; }
export function Faq() { return <div className={s.faq}>{faqs.map(v => <details key={v.q}><summary>{v.q}</summary><p>{v.a}</p></details>)}</div>; }
export function ContactBand() { return <section className={`${s.section} ${s.tint}`}><div className={s.wrap}><p className={s.kicker}>LET’S TALK</p><h2>気になる場所から、<br />ひとつずつ。</h2><p>希望のメニューや日程を相談する画面をご覧いただけます。</p><div className={s.actions}><a className={s.button} href={`${HP}contact/`}>お問い合わせへ</a><Line /></div><p className={s.note}>制作デモのため、相談・予約は送信されません。</p></div></section>; }
