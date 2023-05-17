/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const fg = require('fast-glob');
const path = require('path');

const files = fg
  .sync(`../../(packages|plugins)/**/package.json`, { deep: 3 })
  .map(e => path.relative(process.cwd(), e))
  .filter(e => e.startsWith('.'))
  .map(e => require(e).name);
if (!files.length) {
  console.error(new Error('no files'));
  process.exit(1);
}
const withTm = require('next-transpile-modules')([...files, '@onr/plugin-antd', '@onr/core']);

const withAntdLess = require('next-plugin-antd-less');

/* eslint-enable @typescript-eslint/no-var-requires */

if (typeof require !== 'undefined') {
  require.extensions['.less'] = () => {};
}

const nextConfig = {
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
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  experimental: {
    esmExternals: 'loose',
  },
  webpack(config) {
    config.optimization.usedExports = true;
    return config;
  },
};

const plugins = [[withAntdLess], [withBundleAnalyzer], [withTm]];

if (process.env.NODE_ENV !== 'development') {
} else {
  // plugins.push([]);
}

module.exports = withPlugins(plugins, nextConfig);
