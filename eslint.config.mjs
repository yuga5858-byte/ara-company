import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,
  {
    // 制作デモ⇔公式サイトは見た目（CSS）が混ざらないよう、あえて <a> で全ページ読み込みにしている
    files: ["app/demo/**/*.tsx"],
    rules: { "@next/next/no-html-link-for-pages": "off" },
  },
  globalIgnores([".next/**", "out/**", "build/**", ".wrangler/**", "next-env.d.ts"]),
]);

export default eslintConfig;
