module.exports = {
  testMatch: ['**/*.(test|spec).(ts|tsx)'],
  preset: 'ts-jest',
  coverageReporters: ['text'],
  notify: true,
  // notifyMode: 'always',
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};
