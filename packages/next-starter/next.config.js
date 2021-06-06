/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require('next-compose-plugins');
const withLess = require('@zeit/next-less');
const withCSS = require('@zeit/next-css');
const withPurgeCss = require('next-purgecss');
const withSASS = require('@zeit/next-sass');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const withPWA = require('next-pwa');
const path = require('path');
const fs = require('fs');

/* eslint-enable @typescript-eslint/no-var-requires */

if (typeof require !== 'undefined') {
  require.extensions['.less'] = () => {};
}

const nextConfig = {
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
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // NOTE: should be able to remove after migrate all core module into core package
    const workspaceCorePath = path.resolve(__dirname, 'node_modules/@onr/core');
    const packageCorePath = path.resolve(__dirname, '../onr-core');

    config.resolve.alias = {
      ...config.resolve.alias,
    };

    return config;
  },
};

const plugins = [[withLess], [withBundleAnalyzer], [withSASS]];

if (process.env.NODE_ENV !== 'development') {
  plugins.push([withPWA], [withCSS, withPurgeCss]);
} else {
  plugins.push([withCSS]);
}

module.exports = withPlugins(plugins, nextConfig);
