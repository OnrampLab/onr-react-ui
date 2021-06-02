module.exports = {
  extends: ['eslint:recommended', 'prettier', 'promise'],
  plugins: [],
  rules: {
    // Enabled rules
    complexity: 'warn',
    'max-depth': ['error', { max: 4 }],
    'arrow-parens': ['warn', 'as-needed'],

    'prefer-const': [
      'error',
      {
        destructuring: 'all',
        ignoreReadBeforeAssign: true,
      },
    ],
  },
};
