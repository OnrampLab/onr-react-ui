import { Server } from 'miragejs';
import { getDebugger } from '@onr/common';

const debug = getDebugger('onr:core:mirage');

export function makeServer({ environment = 'test', seeds = {}, models = {}, routes = {} } = {}) {
  const server = new Server({
    environment,
    models,
    seeds(server) {
      for (const resourceName in models) {
        for (const resource of seeds[`${resourceName}s`]) {
          server.create(resourceName, resource);
        }
      }
    },
    routes() {
      this.urlPrefix = `${process.env.NEXT_PUBLIC_API_URL?.replace(/(.[^\/])$/, '$1/')}`;
      this.namespace = 'api';

      const registerCRUD = resource => {
        debug(`register resource ${resource}`);

        this.get(`/${resource}`, schema => {
          return {
            data: schema[resource].all().models,
          };
        });

        this.post(`/${resource}`, (schema, request) => {
          return {
            data: [schema[resource].create(JSON.parse(request.requestBody))],
          };
        });

        this.patch(`/${resource}/:id`, (schema, request) => {
          const { id } = request.params;

          schema[resource].find(id).update(JSON.parse(request.requestBody));

          return {
            message: 'success',
          };
        });

        this.delete(`/${resource}/:id`, (schema, request) => {
          const { id } = request.params;

          schema.db[resource].remove(id);

          return {
            message: 'success',
          };
        });
      };

      for (const resourceName in models) {
        registerCRUD(`${resourceName}s`);
      }

      const registerRoute = (json: Record<string, any>) => {
        const methods: any = {
          post: this.post,
          get: this.get,
          delete: this.delete,
          patch: this.patch,
        };

        for (const methodName of Object.keys(json)) {
          if (methodName in methods) {
            const routes = json[methodName];
            for (const route of Object.keys(routes)) {
              debug(`register route ${methodName} ${route}`);

              methods[methodName](route, () => routes[route as keyof typeof routes]);
            }
          }
        }
      };

      for (const route in routes) {
        registerRoute(routes[route]);
      }

      this.passthrough(request => {
        if (request.url === '/_next/static/development/_devPagesManifest.json') {
          return true;
        }
      });
    },
  });

  return server;
}
