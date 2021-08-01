const { createServer } = require('@onr/next-server');
const routes = require('./routes');
const proxy = require('./proxy');

const serverOptions = {
  assetPrefix: process.env.STATIC_PATH,
  staticPath: '../../static',
  mode: process.env.NODE_ENV,
  routes,
  proxy,
  proxyMode: process.env.PROXY_MODE,
  port: process.env.PORT || 3000,
};

const server = createServer(serverOptions);
