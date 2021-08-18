import axios from 'axios';
import nock from 'nock';
import { ResourceClient } from './ResourceClient';

interface User {
  id: number;
  name: string;
}

describe('ResourceClient', () => {
  let resource: ResourceClient<User>;
  const usersData = [
    { id: 1, name: 'A' },
    { id: 2, name: 'B' },
  ];

  beforeAll(() => {
    // fix CORS issue
    axios.defaults.adapter = require('axios/lib/adapters/http');

    resource = new ResourceClient('todos', {
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  describe('list', () => {
    it('should return lists of resource', async () => {
      nock('https://jsonplaceholder.typicode.com').get('/todos').reply(200, usersData);

      const users = await resource.list();

      expect(users.length).toEqual(2);
    });
  });

  describe('get', () => {
    it('should return a resource', async () => {
      nock('https://jsonplaceholder.typicode.com').get('/todos/1').reply(200, usersData[0]);

      const user = await resource.find(1);

      expect(user).toBeDefined();
      expect(user.id).toBeDefined();
      expect(user.name).toBeDefined();
    });
  });

  describe('create', () => {
    it('should return a resource', async () => {
      const userData = {
        id: 3,
        name: 'C',
      };
      nock('https://jsonplaceholder.typicode.com').post('/todos').reply(201, userData);

      const user = await resource.create(userData);

      expect(user).toBeDefined();
      expect(user.id).toEqual(userData.id);
      expect(user.name).toEqual(userData.name);
    });
  });

  describe('update', () => {
    it('should return a resource', async () => {
      const userData = {
        id: 4,
        name: 'C',
      };
      nock('https://jsonplaceholder.typicode.com')
        .patch(`/todos/${userData.id}`)
        .reply(200, userData);

      const user = await resource.update(userData.id, userData);

      expect(user).toBeDefined();
      expect(user.id).toEqual(userData.id);
      expect(user.name).toEqual(userData.name);
    });
  });

  describe('delete', () => {
    it('should return a resource', async () => {
      nock('https://jsonplaceholder.typicode.com').delete('/todos/1').reply(204, {});

      await resource.delete(1);
    });
  });

  describe('custom tranformResponse', () => {
    it('should return a resource', async () => {
      const transformResponse = [
        (data: string) => {
          let resp;

          try {
            resp = JSON.parse(data);
          } catch (error) {
            throw Error(
              `[requestClient] Error parsing response JSON data - ${JSON.stringify(error)}`,
            );
          }

          return resp.data;
        },
      ];
      resource = new ResourceClient('todos', {
        baseURL: 'https://jsonplaceholder.typicode.com',
        transformResponse,
      });

      nock('https://jsonplaceholder.typicode.com')
        .get('/todos/1')
        .reply(200, { data: usersData[0] });

      const user = await resource.find(1);

      expect(user).toBeDefined();
      expect(user.id).toBeDefined();
      expect(user.name).toBeDefined();
    });
  });
});
