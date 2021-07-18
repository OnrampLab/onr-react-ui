import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import next from 'next';
import path from 'path';
import { ServerOptions } from './definitions';
import { generateNextRoutes } from './generateNextRoutes';

export const createServer = ({
  assetPrefix,
  staticPath,
  mode,
  routes,
  proxy,
  proxyMode,
  port = 3000,
}: ServerOptions) => {
  const app = next({
    dev: mode !== 'production',
  });

  const nextRoutes = generateNextRoutes(routes);
  const handler = nextRoutes.getRequestHandler(app);

  app.prepare().then(() => {
    const server = express();

    app.setAssetPrefix(assetPrefix);

    server.use(express.static(path.join(__dirname, staticPath)));

    if (proxyMode === 'local') {
      Object.keys(proxy).forEach(function (context) {
        server.use(createProxyMiddleware(context, proxy[context]));
      });
    }

    server.get('*', async (req, res) => {
      return handler(req, res);
    });

    const instance = server.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`);

      // NOTE: we enabled the cluster mode of pm2.
      //       http://pm2.keymetrics.io/docs/usage/cluster-mode/#cluster-mode
      //       it required slave processes to notify master process if it's ready to accept requests.
      if (process.send) {
        console.log(`process(${process.pid}) is ready`);
        process.send('ready');
      }
    });

    const shutdown = async () => {
      console.log('server is closing now');

      instance.close(error => {
        if (error) {
          console.error('server closed with error', error);
          process.exit(1);
        }

        console.log('server closed');
        process.exit(0);
      });
    };

    process.on('SIGINT', async () => {
      console.error(`SIGINT ${process.pid}`);
      shutdown();
    });
  });

  return app;
};
