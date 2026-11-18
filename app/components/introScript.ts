// オープニング（IntroReveal）を出すかどうかを、ページが描かれる前に決める小さなスクリプト。
// html に .intro を付けると、CSS でページの中身を隠し、煙と「ARA COMPANY」だけを見せる。
// 1回の訪問で1度だけ（sessionStorage）。動きを減らす設定では出さない。
export const INTRO_KEY = "ara-intro-seen";
export const INTRO_SCRIPT = `try{if(location.pathname==="/"&&!sessionStorage.getItem("${INTRO_KEY}")&&!matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.classList.add("intro")}}catch(e){}`;
