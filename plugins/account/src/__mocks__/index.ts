import { Mock } from '@onr/mock';
import { accountFactory } from './accountFactory';
import { accountModel } from './accountModel';
import accountSeeds from './accountSeeds.json';
import { accountSeedsCallback } from './accountSeedsCallback';

export const mocks = [
  Mock.create({
    resource: 'account',
    seeds: accountSeeds,
    model: accountModel,
    factory: accountFactory,
    seedsCallback: accountSeedsCallback,
  }),
];
