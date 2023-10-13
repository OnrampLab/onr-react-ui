module.exports = {
  mode: process.env.ENABLE_TAILWINDCSS_JIT === 'true' ? 'jit' : null,
  content: ['./src/**/*.{js,ts,jsx,tsx}', '../../plugins/home/**/*.{js,jsx,ts,tsx}'],
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
