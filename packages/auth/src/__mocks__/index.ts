import { Mock } from '@onr/mock';
import { authRouteCallback } from './authRouteCallback';
import { roleModel } from './roleModel';
import roleSeeds from './roleSeeds.json';
import authRoutes from './routes.json';

export const mocks = [
  Mock.create({
    resource: 'role',
    seeds: roleSeeds,
    model: roleModel,
  }),
  Mock.create({
    resource: 'auth',
    routes: authRoutes,
    routesCallback: authRouteCallback,
  }),
];

export { roleModel };
