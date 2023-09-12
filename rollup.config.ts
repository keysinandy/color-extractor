import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'rollup';
import buble from '@rollup/plugin-buble';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import pkg from './package.json' assert { type: 'json' };
import dts from 'rollup-plugin-dts';

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
        file: resolveFile(pkg.main),
        format: 'cjs',
      },
      {
        file: resolveFile(pkg.module),
        format: 'es',
      },
    ],
    plugins: [typescript(), buble(), terser()],
  },
  {
    input: resolveFile('src/utils.ts'),
    output: [
      {
        file: resolveFile(pkg.exports['./utils'].require),
        format: 'cjs',
      },
      {
        file: resolveFile(pkg.exports['./utils'].import),
        format: 'es',
      },
    ],
    plugins: [typescript(), buble(), terser()],
  },
  {
    input: resolveFile('src/index.ts'),
    plugins: [dts()],
    output: {
      format: 'esm',
      file: 'index.d.ts',
    },
  },
]);

export default config;
