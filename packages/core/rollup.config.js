import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'rollup';
export default defineConfig({
  input: { index: './src/index.ts', api: './src/api/index.ts' },
  output: {
    dir: 'lib',
    format: 'es',
  },
  plugins: [typescript({ tsconfig: './tsconfig.json' }), commonjs()],
  treeshake: {
    correctVarValueBeforeDeclaration: true,
  },
});
