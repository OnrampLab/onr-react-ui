module.exports = {
  mode: process.env.ENABLE_TAILWINDCSS_JIT === 'true' ? 'jit' : null,
  content: [
    './src/**/*.{ts,tsx}',
    '../../../../plugins/**/*.{ts,tsx}',
    '../../../../packages/**/*.{ts,tsx}',
    '!../../../../node_modules/**/*',
  ],
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
