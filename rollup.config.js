import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser as uglify } from 'rollup-plugin-terser';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import babel from '@rollup/plugin-babel';

export default {
  input: 'src/main.ts',
  output: {
    file: 'dist/bundle.cjs.js',
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [
    resolve({
      resolveOnly: [''],
    }),
    commonjs(),
    // uglify(),
    babel({
      extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
      babelHelpers: 'runtime',
      exclude: ['node_modules/**'],
    }),
  ],
};
