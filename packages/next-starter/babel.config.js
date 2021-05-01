const fs = require('fs');

module.exports = {
  presets: ['next/babel'],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    [
      'babel-plugin-react-remove-properties',
      {
        properties: ['data-testid'],
      },
    ],
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@app': './src/app',
          '^@onr/(.+)': ([, name]) => {
            const modulePath = `./src/modules/${name}`;
            const packageName = `@onr/${name}`;

            if (fs.existsSync(modulePath)) {
              return modulePath;
            }

            if (require.resolve(packageName)) {
              return packageName;
            }

            return packageName;
          },
        },
      },
    ],
    [
      'babel-plugin-styled-components',
      {
        ssr: true,
        displayName: true,
        preprocess: false,
      },
    ],
    [
      'import',
      {
        libraryName: 'antd',
      },
      'ant',
    ],
  ],
};
