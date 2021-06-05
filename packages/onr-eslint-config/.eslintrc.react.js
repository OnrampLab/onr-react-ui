module.exports = {
  extends: ['plugin:react/recommended', 'prettier/react', 'plugin:react-hooks/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    // Disabled Rules
    'react/react-in-jsx-scope': 'off',

    // Enabled rules
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
