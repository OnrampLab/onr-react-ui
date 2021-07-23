if (!process.browser) {
  const { server } = require('./server');
  server.listen();
}
