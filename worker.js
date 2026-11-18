// 旧URL（*.workers.dev）へのアクセスを、独自ドメインの同じページへ 301 で転送する。
// それ以外（独自ドメイン）へのアクセスは、これまでどおり out/ の静的ファイルを返す。
const CANONICAL_ORIGIN = "https://ara-company.jp";

const worker = {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname.endsWith(".workers.dev")) {
      return Response.redirect(CANONICAL_ORIGIN + url.pathname + url.search, 301);
    }
    // 名前に「!」や「$」を含む先読み用ファイルは、Cloudflare の静的配信で転送のループになるため、
    // 書き出し後に作った「_」に置き換えたコピーを返す（scripts/alias-special-files.mjs）
    if (/[!$]|%21|%24/i.test(url.pathname)) {
      const alias = new URL(url);
      alias.pathname = url.pathname.replace(/[!$]|%21|%24/gi, "_");
      return env.ASSETS.fetch(new Request(alias, request));
    }
    return env.ASSETS.fetch(request);
  },
};

export default worker;
