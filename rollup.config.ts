import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'rollup';
import buble from '@rollup/plugin-buble';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resolveFile = function (filePath: string) {
  return path.join(__dirname, filePath);
};

const config = defineConfig([
  {
    input: resolveFile('src/index.ts'),
    output: [
      {
        file: resolveFile('dist/index.js'),
        format: 'cjs',
      },
      {
        file: resolveFile('dist/index.mjs'),
        format: 'es',
      },
    ],
    plugins: [typescript(), buble(), terser()],
  },
  {
    input: resolveFile('src/utils.ts'),
    output: [
      {
        file: resolveFile('dist/utils.js'),
        format: 'cjs',
      },
      {
        file: resolveFile('dist/utils.mjs'),
        format: 'es',
      },
    ],
    plugins: [typescript(), buble(), terser()],
  },
]);

export default config;
