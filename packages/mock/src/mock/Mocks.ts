import { getDebugger } from '@onr/common';
import { Serializer, Server } from 'miragejs';
import { FactoryDefinition, ModelDefinition } from 'miragejs/-types';
import { Mock } from './Mock';

const debug = getDebugger('onr:core:mocks');

type IMocks = {
  urlPrefix: string;
  namespace: string;
};

type IModels = Record<string, ModelDefinition>;
type IFactories = Record<string, FactoryDefinition>;
type ISerializers = Record<string, Serializer>;

export class Mocks implements IMocks {
  protected mocks: Mock[] = [];
  public urlPrefix: string;
  public namespace: string;

  constructor({ urlPrefix, namespace }: IMocks) {
    this.urlPrefix = urlPrefix;
    this.namespace = namespace;
  }

  static create(properties: IMocks): Mocks {
    return new Mocks(properties);
  }

  getAll() {
    return this.mocks;
  }

  addMock(mock: Mock): Mocks {
    this.mocks.push(mock);

    debug(`added mock => ${mock.resource}`);

    return this;
  }

  addMocks(mocks: Mock[]): Mocks {
    mocks.forEach(mock => this.addMock(mock));

    return this;
  }

  registerRoutes(server: Server) {
    if (this.urlPrefix) {
      server.urlPrefix = this.urlPrefix;
    }

    if (this.namespace) {
      server.namespace = this.namespace;
    }

    this.mocks.forEach(mock => mock.registerRoutes(server));

    server.passthrough(request => {
      if (request.url.startsWith('/_next/') || !request.url.includes('/api/')) {
        return true;
      }
    });
  }

  getSerializers(): ISerializers {
    return this.mocks.reduce((serializers, mock) => {
      if (mock.model && mock.serializer) {
        serializers[mock.resource] = mock.serializer;
      }

      return serializers;
    }, {} as ISerializers);
  }

  getModels(): IModels {
    return this.mocks.reduce((models, mock) => {
      if (mock.model) {
        models[mock.resource] = mock.model;
      }

      return models;
    }, {} as IModels);
  }

  getFactories(): IFactories {
    return this.mocks.reduce((factories, mock) => {
      if (mock.factory) {
        return {
          ...factories,
          [mock.resource]: mock.factory,
        };
      }

      return factories;
    }, {} as IFactories);
  }
}
