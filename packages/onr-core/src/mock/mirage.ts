import { Server, Serializer } from 'miragejs';
import { Mocks } from './Mocks';

interface ServerOptions {
  environment: string;
  mocks: Mocks;
}

export function makeServer({ environment = 'test', mocks }: ServerOptions): Server {
  const models = mocks.getModels();
  const factories = mocks.getFactories();
  const serializers = mocks.getSerializers();

  const server = new Server({
    environment,

    models,

    factories,

    serializers: {
      application: Serializer,
      ...serializers,
    },

    seeds(server) {
      mocks.getAll().forEach(mock => mock.applySeeds(server));
    },

    routes() {
      mocks.registerRoutes(this);
    },
  });

  return server;
}
