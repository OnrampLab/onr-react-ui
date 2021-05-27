import { models as accountModels, seeds as accountSeeds } from '@onr/account/__mocks__';
import { routes as accountRoutes } from '@onr/auth/__mocks__';
import { models as userModels, seeds as userSeeds } from '@onr/user/__mocks__';

export const seeds = {
  ...accountSeeds,
  ...userSeeds,
};

export const models = {
  ...accountModels,
  ...userModels,
};

export const routes = {
  ...accountRoutes,
};
