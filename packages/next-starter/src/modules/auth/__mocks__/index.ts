import { Mock } from '@onr/mock';
import { IRole, roleModel } from './roleModel';
import authRoutes from './routes.json';
import roleSeeds from './roleSeeds.json';
import { authRouteCallback } from './authRouteCallback';

export const mocks = [
  Mock.create({
    resource: 'role',
    seeds: roleSeeds as IRole[],
    model: roleModel,
  }),
  Mock.create({
    resource: 'auth',
    routes: authRoutes,
    routesCallback: authRouteCallback,
  }),
];
