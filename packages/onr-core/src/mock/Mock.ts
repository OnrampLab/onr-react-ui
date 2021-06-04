import { FactoryDefinition, ModelDefinition } from 'miragejs/-types';
import { getDebugger } from '@onr/common';
import { Serializer, Server } from 'miragejs';
import { MockCallback } from './types';

const debug = getDebugger('onr:core:mock');

type IMock = {
  resource: string;
  model: ModelDefinition;
  factory: FactoryDefinition;
  serializer: Serializer;
  seeds: any;
  routes: any;
  seedsCallback: MockCallback;
  routesCallback: MockCallback;
};

export class Mock implements IMock {
  public resource;
  public model;
  public factory;
  public serializer;
  public seeds;
  public routes;
  public seedsCallback;
  public routesCallback;

  constructor({
    resource,
    model,
    serializer,
    factory,
    seeds,
    routes,
    seedsCallback,
    routesCallback,
  }: IMock) {
    this.resource = resource;
    this.model = model;
    this.factory = factory;
    this.serializer = serializer;
    this.routes = routes;
    this.seeds = seeds;
    this.seedsCallback = seedsCallback;
    this.routesCallback = routesCallback;
  }

  static create(properties: IMock): Mock {
    return new Mock(properties);
  }

  registerRoutes(server: Server) {
    if (this.model) {
      this.registerResourceRoutes(server, `${this.resource}s`);
    }

    if (this.routes) {
      this.registerStaticRoutes(server);
    }

    if (this.routesCallback) {
      this.routesCallback(server);
    }
  }

  private registerResourceRoutes(server: Server, resource: any) {
    debug(`register resource routes => ${resource}`);

    server.get(`/${resource}`, schema => {
      return {
        data: schema[resource].all().models,
      };
    });

    server.post(`/${resource}`, (schema, request) => {
      return {
        data: [schema[resource].create(JSON.parse(request.requestBody))],
      };
    });

    server.patch(`/${resource}/:id`, (schema, request) => {
      const { id } = request.params;

      schema[resource].find(id).update(JSON.parse(request.requestBody));

      return {
        message: 'success',
      };
    });

    server.delete(`/${resource}/:id`, (schema, request) => {
      const { id } = request.params;

      schema.db[resource].remove(id);

      return {
        message: 'success',
      };
    });
  }

  registerStaticRoutes(server: Server) {
    const methods: any = {
      post: server.post,
      get: server.get,
      delete: server.delete,
      patch: server.patch,
    };

    for (const methodName of Object.keys(this.routes)) {
      if (methodName in methods) {
        const method = methods[methodName];
        const routeMap = this.routes[methodName];

        for (const routeUrl of Object.keys(routeMap)) {
          debug(`register static route => ${methodName}[${routeUrl}]`);

          method(routeUrl, () => routeMap[routeUrl as keyof typeof routeMap]);
        }
      } else {
        debug(`unsupported method ${methodName} in ${this.resource} route`);
      }
    }
  }

  applySeeds(server: Server) {
    // static seeds
    debug(`adding seed => ${this.resource}`);
    if (this.seeds) {
      for (const seed of this.seeds) {
        server.create(this.resource, seed);
      }
    }

    // dynamic seeds
    if (this.seedsCallback) {
      this.seedsCallback(server);
    }
  }
}