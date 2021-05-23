import { Model } from 'miragejs';
import userSeeds from './userSeeds.json';

export const seeds = {
  users: userSeeds,
};

export const models = {
  user: Model,
};
