import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
// import { terser as uglify } from 'rollup-plugin-terser';
import { DEFAULT_EXTENSIONS } from "@babel/core";
import babel from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";

export default {
  input: "packages/cli/index.ts",
  output: {
    banner: "#!/usr/bin/env node",
    file: "dist/index.js",
    format: "cjs",
    sourcemap: true,
  },
  plugins: [
    resolve({
      resolveOnly: [""],
    }),
    commonjs(),
    // uglify(),
    json(),
    babel({
      extensions: [...DEFAULT_EXTENSIONS, ".ts", ".tsx"],
      babelHelpers: "runtime",
      exclude: ["node_modules/**"],
    }),
  ],
};
