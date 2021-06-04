import { Mock } from '@core';
import { IUser } from '../entities';
import { userModel } from './userModel';
import userSeeds from './userSeeds.json';
import { serializer } from './userSerializer';

export const mocks = [
  Mock.create({
    resource: 'user',
    seeds: userSeeds as Partial<IUser>[],
    model: userModel,
    serializer,
  }),
];
