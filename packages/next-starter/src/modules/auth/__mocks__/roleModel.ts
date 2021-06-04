import { hasMany, Model } from 'miragejs';
import { ModelDefinition } from 'miragejs/-types';

export type IRole = {
  id: number;
  name: string;
  created_at: string; // eslint-disable-line
  updated_at: string; // eslint-disable-line
};

export const roleModel: ModelDefinition<IRole> = Model.extend({
  users: hasMany(),
});
