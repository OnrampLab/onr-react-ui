import { Model } from 'miragejs';
import accountSeeds from './accountSeeds.json';

export const seeds = {
  accounts: accountSeeds,
};

export const models = {
  account: Model,
};
