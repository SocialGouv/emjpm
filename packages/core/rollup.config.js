import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";

import pkg from "./package.json";

export default [
  {
    external: [...Object.keys(pkg.peerDependencies || {}), /@babel\/runtime/],
    input: "src/index.js",
    output: [
      { file: pkg.main, format: "cjs", sourcemap: true },
      { file: pkg.module, format: "es", sourcemap: true },
    ],
    plugins: [
      resolve({ mainFields: ["module", "js:next", "main"] }),
      commonjs({ exclude: "src/**" }),
      babel({
        babelHelpers: "runtime",
        exclude: "node_modules/**",
      }),
    ],
    watch: {
      clearScreen: false,
    },
  },
];
