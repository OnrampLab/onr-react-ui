import { Mock } from '@onr/mock';
import { IUser } from '../entities';
import { userModel } from './userModel';
import { userRouteCallback } from './userRouteCallback';
import userSeeds from './userSeeds.json';
import { serializer } from './userSerializer';

export const mocks = [
  Mock.create({
    resource: 'user',
    seeds: userSeeds as Partial<IUser>[],
    model: userModel,
    serializer,
    routesCallback: userRouteCallback,
  }),
];
