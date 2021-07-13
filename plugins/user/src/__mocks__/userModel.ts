import { hasMany, Model } from 'miragejs';
import { ModelDefinition } from 'miragejs/-types';
import { IUser } from '../entities';

export const userModel: ModelDefinition<IUser> = Model.extend({
  accounts: hasMany('account'),
  roles: hasMany('role'),
});
