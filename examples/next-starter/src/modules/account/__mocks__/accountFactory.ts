import { Factory } from 'miragejs';
import * as faker from 'faker';

export const accountFactory = Factory.extend({
  name() {
    return faker.company.companyName();
  },
  created_at() {
    return faker.date.recent().toISOString();
  },
});
