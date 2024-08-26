import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/api/index.ts'],
  noExternal: [],
  format: ['cjs'],
  sourcemap: true,
  dts: true,
  clean: false,
  cjsInterop: true,
});
