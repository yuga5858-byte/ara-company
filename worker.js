// 旧URL（*.workers.dev）へのアクセスを、独自ドメインの同じページへ 301 で転送する。
// それ以外（独自ドメイン）へのアクセスは、これまでどおり out/ の静的ファイルを返す。
const CANONICAL_ORIGIN = "https://ara-company.jp";

const worker = {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname.endsWith(".workers.dev")) {
      return Response.redirect(CANONICAL_ORIGIN + url.pathname + url.search, 301);
    }
    return env.ASSETS.fetch(request);
  },
};

export default worker;
