import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import babel from "rollup-plugin-babel";

import pkg from "./package.json";

export default [
  {
    external: [...Object.keys(pkg.peerDependencies || {})],
    input: "src/index.js",
    output: [
      { file: pkg.main, format: "cjs", sourcemap: true },
      { file: pkg.module, format: "es", sourcemap: true },
    ],
    plugins: [
      resolve({ mainFields: ["module", "js:next", "main"] }),
      commonjs({ exclude: "src/**" }),
      babel({ exclude: "node_modules/**" }),
    ],
    watch: {
      clearScreen: false,
    },
  },
];
