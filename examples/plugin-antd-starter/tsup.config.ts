import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  noExternal: [],
  format: ['cjs'],
  sourcemap: true,
  clean: false,
  cjsInterop: true,
});
