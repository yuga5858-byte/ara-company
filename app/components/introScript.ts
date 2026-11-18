// オープニング（IntroReveal）を出すかどうかを、ページが描かれる前に決める小さなスクリプト。
// html に .intro を付けると、CSS でページの中身を隠し、煙と「ARA COMPANY」だけを見せる。
// 1回の訪問で1度だけ（sessionStorage）。動きを減らす設定では出さない。
export const INTRO_KEY = "ara-intro-seen";
// JavaScript の読み込みに失敗してオープニングが終わらない場合に備え、6秒たったら必ず隠すのをやめる。
export const INTRO_FAILSAFE_MS = 6000;
export const INTRO_SCRIPT = `try{if(location.pathname==="/"&&!sessionStorage.getItem("${INTRO_KEY}")&&!matchMedia("(prefers-reduced-motion: reduce)").matches){var r=document.documentElement;r.classList.add("intro");setTimeout(function(){if(r.classList.contains("intro")){r.classList.remove("intro","intro-play");window.dispatchEvent(new Event("ara:intro-done"))}},${INTRO_FAILSAFE_MS})}}catch(e){}`;
