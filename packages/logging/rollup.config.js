import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'rollup';
export default defineConfig({
  input: ['./src/index.ts', './src/ConsoleHandler.ts'],
  output: {
    dir: 'lib',
    format: 'es',
  },
  plugins: [typescript({ tsconfig: './tsconfig.json' })],
  treeshake: {
    correctVarValueBeforeDeclaration: true,
  },
});

console.log(process.env.NODE_ENV);
