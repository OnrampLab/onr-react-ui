module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier/@typescript-eslint',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    // Disabled Rules
    '@typescript-eslint/no-non-null-assertion': 'off',

    // Enabled rules
    '@typescript-eslint/consistent-type-assertions': [
      'warn',
      { assertionStyle: 'as', objectLiteralTypeAssertions: 'allow-as-parameter' },
    ],
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/no-magic-numbers': [
      'error',
      {
        // it mainly avoids magic numbers in calculation,
        // so ignoring common magic numbers
        // number of days in a week, hours in a day, seconds in one minutes, one hours and one day
        ignore: [7, 24, 60, 3600, 86400],
        ignoreDefaultValues: true,
        enforceConst: true,
        ignoreArrayIndexes: true,
        // to allow style magic number which is usually defined as object
        // eg. style={{width: 300}} or const layout = {span: 3, offset: 4}
        detectObjects: false,
        ignoreEnums: true,
        ignoreNumericLiteralTypes: true,
        ignoreReadonlyClassProperties: true,
      },
    ],
    '@typescript-eslint/array-type': 'warn',
    '@typescript-eslint/member-ordering': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-unnecessary-qualifier': 'warn',
    '@typescript-eslint/no-parameter-properties': 'warn',
    '@typescript-eslint/prefer-function-type': 'error',
    '@typescript-eslint/promise-function-async': 'error',
    '@typescript-eslint/unified-signatures': 'error',
    '@typescript-eslint/naming-convention': 'error',
  },
  overrides: [
    {
      files: ['*.tsx', '*.ts'],
      rules: {
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'default',
            format: ['camelCase'],
            leadingUnderscore: 'allow',
            trailingUnderscore: 'allow',
          },
          {
            selector: 'variable',
            format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
            leadingUnderscore: 'allow',
            trailingUnderscore: 'allow',
          },
          {
            selector: ['parameter', 'function', 'typeProperty'],
            // to allow passing react component as function parameter
            format: ['camelCase', 'PascalCase'],
          },
          {
            selector: ['typeLike', 'enumMember'],
            format: ['PascalCase'],
          },
        ],
      },
    },
  ],
};
