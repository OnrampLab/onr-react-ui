/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const withPWA = require('next-pwa');
const withAntdLess = require('next-plugin-antd-less');

/* eslint-enable @typescript-eslint/no-var-requires */

if (typeof require !== 'undefined') {
  require.extensions['.less'] = () => {};
}

const nextConfig = {
  webpack5: true,

  // optional
  modifyVars: {},
  // optional
  lessVarsFilePath: './src/assets/antd-custom.less',
  // optional
  lessVarsFilePathAppendToEndOfContent: false,
  // optional https://github.com/webpack-contrib/css-loader#object
  cssLoaderOptions: {},

  publicRuntimeConfig: {
    // Will be available on both server and client
    processEnv: process.env,
  },
  onDemandEntries: {
    maxInactiveAge: 1000 * 60 * 60,
    pagesBufferLength: 5,
  },
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../bundles/server.html',
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../bundles/client.html',
    },
  },
  typescript: {
    ignoreDevErrors: true,
    ignoreBuildErrors: true,
  },
  pwa: {
    dest: 'public',
  },
};

const plugins = [[withAntdLess], [withBundleAnalyzer]];

if (process.env.NODE_ENV !== 'development') {
  plugins.push([withPWA]);
}

module.exports = withPlugins(plugins, nextConfig);
