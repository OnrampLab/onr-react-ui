const path = require('path');

module.exports = {
  // presets: [
  //   {
  //     name: 'storybook-addon-deps/preset',
  //     options: {
  //       exclude: /^@babel/,
  //     },
  //   },
  // ],
  stories: ['../src/**/*.stories.@(mdx|tsx)'],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
      },
    },
    '@storybook/addon-essentials',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-knobs',
  ],
  // https://github.com/styleguidist/react-docgen-typescript/issues/356
  typescript: {
    reactDocgen: 'react-docgen',
  },
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
      options: {
        presets: [require.resolve('babel-preset-react-app')],
      },
    });

    config.module.rules.push(
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        loaders: [
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: './.storybook/',
              },
            },
          },
        ],

        include: path.resolve(__dirname, '../src/'),
      },
    );

    config.resolve.extensions.push('.ts', '.tsx');

    return config;
  },
};
