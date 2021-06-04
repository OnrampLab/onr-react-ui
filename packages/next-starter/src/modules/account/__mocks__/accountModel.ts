import { hasMany, Model } from 'miragejs';
import { ModelDefinition } from 'miragejs/-types';
import { IAccount } from '../entities';

export const accountModel: ModelDefinition<IAccount> = Model.extend({
  users: hasMany(),
});
