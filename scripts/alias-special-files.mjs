// 静的書き出しのあとに実行する。
// Next.js はページの先読み用に、名前に「!」や「$」を含むファイルを書き出す
// （例：ルートグループ (site) の __next.!KHNpdGUp.__PAGE__.txt）。Cloudflare の静的配信では、
// これらの文字を含むパスが転送のループになり読み込めないため、「_」に置き換えた名前の
// コピーを同じ場所に作る。worker.js が、これらの文字を含むリクエストをこのコピーで返す。
import { copyFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";
const SPECIAL = /[!$]/g;
let count = 0;

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) walk(path);
    else if (SPECIAL.test(entry.name)) {
      SPECIAL.lastIndex = 0;
      copyFileSync(path, join(dir, entry.name.replace(SPECIAL, "_")));
      count++;
    }
    SPECIAL.lastIndex = 0;
  }
}

walk(OUT);
console.log(`alias-special-files: ${count} 件`);
