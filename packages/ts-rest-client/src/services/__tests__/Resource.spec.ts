import axios from 'axios';
import nock from 'nock';
import { BasicClient } from '../BasicClient';
import { Resource } from '../Resource';

describe('Resource', () => {
  let client: BasicClient;
  let resource: Resource;
  const usersData = [
    { id: 1, name: 'A' },
    { id: 2, name: 'B' },
  ];

  beforeAll(() => {
    const axiosInstance = axios.create({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
    client = BasicClient.fromAxiosInstance(axiosInstance);

    resource = Resource.createByResourceName(client, 'comment');
  });

  describe.only('list', () => {
    it('should return lists of resource', async () => {
      nock('https://jsonplaceholder.typicode.com').get('/comments?postId=1').reply(200, usersData);

      const { data: users } = await resource.list({ postId: 1 });

      expect(users.length).toEqual(2);
    });
  });

  describe('get', () => {
    it('should return a resource', async () => {
      nock('https://jsonplaceholder.typicode.com').get('/comments/1').reply(200, usersData[0]);

      const { data: user } = await resource.find(1);

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
      nock('https://jsonplaceholder.typicode.com').post('/comments').reply(201, userData);

      const { data: user } = await resource.create(userData);

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
        .patch(`/comments/${userData.id}`)
        .reply(200, userData);

      const { data: user } = await resource.update(userData.id, userData);

      expect(user).toBeDefined();
      expect(user.id).toEqual(userData.id);
      expect(user.name).toEqual(userData.name);
    });
  });

  describe('delete', () => {
    it('should return a resource', async () => {
      nock('https://jsonplaceholder.typicode.com').delete('/comments/1').reply(204, {});

      await resource.delete(1);
    });
  });
});
