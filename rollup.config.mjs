import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import autoprefixer from 'autoprefixer';
import postcss from 'rollup-plugin-postcss';
import tailwindcss from 'tailwindcss';

const isProd = process.env.BUILD === 'production';

export default {
  // Entry point
  input: 'src/main.ts',

  // Output configuration
  output: {
    dir: 'dist',
    entryFileNames: 'main.js',
    sourcemap: isProd ? false : true,
    format: 'cjs',
    exports: 'default',
  },

  // External dependencies provided by the host (Obsidian) only.
  // NOTE: React and React DOM must be bundled into the plugin because
  // Obsidian does not provide them at runtime. Leaving them external
  // causes "Cannot find module 'react'" when the plugin loads.
  external: ['obsidian'],

  plugins: [
    // Resolve node_modules first so TS can find types when bundling
    nodeResolve({
      browser: true,
      preferBuiltins: false,
    }),

    // Handle CommonJS modules
    commonjs({
      include: /node_modules/,
    }),

    // Compile TypeScript (exclude test files)
    typescript({
      tsconfig: './tsconfig.json',
      sourceMap: !isProd,
      exclude: ['**/*.test.ts', '**/*.test.tsx', 'test/**/*'],
    }),

    // Process Tailwind/PostCSS from src/shared/styles/
    postcss({
      plugins: [tailwindcss(), autoprefixer()],
      extract: 'styles.css',
      minimize: isProd,
      sourceMap: !isProd,
      inject: false, // keep CSS as separate file for Obsidian to load
    }),
  ],
};
