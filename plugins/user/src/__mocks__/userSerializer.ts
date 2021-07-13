import { Serializer } from 'miragejs';

export const serializer = Serializer.extend({
  include: ['accounts', 'roles'],
  embed: true,
});
