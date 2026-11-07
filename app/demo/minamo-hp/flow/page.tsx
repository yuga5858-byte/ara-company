import { demoMeta, HP } from "../../minamo/data";
import { ContactBand, Faq, Heading, Shell, Steps } from "../../minamo/parts";
import s from "../../minamo/minamo.module.css";
export const metadata = demoMeta("作業の流れ", `${HP}flow/`);
export default function Flow() { return <Shell current={`${HP}flow/`}><div className={s.wrap}><Heading en="HOW IT WORKS" title="作業の流れ">ご相談から仕上がりの確認まで、ひとつずつ。</Heading><section className={s.section}><h2>お問い合わせから作業後まで</h2><p className={s.note}>以下は架空の受付・作業フローです。フォーム・LINEから実際の相談は送信されません。</p><Steps /></section><section className={`${s.section} ${s.card}`}><h2>当日の準備について</h2><ul className={s.bullet}><li>清掃箇所の小物や貴重品を、作業前に移動する想定です。</li><li>電気・水道の使用可否を、事前に確認させていただく想定です。</li><li>駐車場所、設備の不具合や気になる点も、先にお知らせください。</li></ul></section><section className={s.section}><p className={s.kicker}>FAQ</p><h2>よくある質問</h2><Faq /></section></div><ContactBand /></Shell>; }
