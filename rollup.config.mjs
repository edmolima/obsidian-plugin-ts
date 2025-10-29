import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

const isProd = process.env.BUILD === 'production';

export default {
  input: 'src/main.ts',
  output: {
    dir: 'dist',
    entryFileNames: 'main.js',
    sourcemap: isProd ? false : 'inline',
    format: 'cjs',
    exports: 'default',
  },
  external: ['obsidian'],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      sourceMap: !isProd,
    }),
    nodeResolve({
      browser: true,
      preferBuiltins: false,
    }),
    commonjs(),
    json(),
  ],
};
