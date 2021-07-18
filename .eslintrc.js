module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['@onr/eslint-config'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'], // Your TypeScript files extension
      parserOptions: {
        project: ['./tsconfig.json'], // Specify it only for TypeScript files
      },
    },
  ],
};
