module.exports = {
  mode: process.env.ENABLE_TAILWINDCSS_JIT === 'true' ? 'jit' : null,
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    '../../node_modules/@onr/**/*.js',
    '../../../../node_modules/@onr/**/*.js',
  ],
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
