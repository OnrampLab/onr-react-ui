import { Mock } from '@onr/mock';
import { roleModel } from './roleModel';
import roleSeeds from './roleSeeds.json';

export const mocks = [
  Mock.create({
    resource: 'role',
    seeds: roleSeeds,
    model: roleModel,
  }),
];

export { roleModel };
