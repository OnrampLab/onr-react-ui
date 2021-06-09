module.exports = {
  testMatch: ["**/*.(test|spec).(ts|tsx)"],
  preset: "ts-jest",
  coverageReporters: ["text"],
  globals: {
    "ts-jest": {
      diagnostics: false,
    },
  },
};
