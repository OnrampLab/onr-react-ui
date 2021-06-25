const glob = require('glob-all');
const { override, addPostcssPlugins } = require('customize-cra');

const plugins = ['tailwindcss', 'autoprefixer'];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    'postcss-flexbugs-fixes',
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
        features: {
          'custom-properties': false,
        },
      },
    ],
    [
      '@fullhuman/postcss-purgecss',
      {
        content: [
          './src/**/*.{js,jsx,ts,tsx}',
          './node_modules/antd/es/**/*.css',
          '../../node_modules/antd/es/**/*.css',
        ],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
        safelist: ['html', 'body'],
        css: ['./node_modules/antd/es/**/*.css', '../../node_modules/antd/es/**/*.css'],
      },
    ],
  );
}

module.exports = {
  plugins,
};
