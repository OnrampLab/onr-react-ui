import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'rollup';
export default defineConfig({
  input: './src/index.ts',
  output: {
    dir: 'lib',
    format: 'es',
  },
  plugins: [typescript({ tsconfig: './tsconfig.json' }), commonjs()],
  treeshake: {
    correctVarValueBeforeDeclaration: true,
  },
});
