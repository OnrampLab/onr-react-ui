module.exports = {
  extends: ['plugin:react/recommended', 'plugin:react-hooks/recommended'],
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
    'react/prop-types': 'off',

    // Enabled rules
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
