import axios from 'axios';
import nock from 'nock';
import { BasicClient } from '../BasicClient';
import { Resource } from '../Resource';

describe('Resource', () => {
  let client: BasicClient;
  let resource: Resource;
  const commentsData = [
    {
      id: 1,
      postId: 1,
      name: 'eos est animi quis',
      email: 'Preston_Hudson@blaise.tv',
      body: 'comment 1',
    },
    {
      id: 2,
      postId: 2,
      name: 'eos est animi quis',
      email: 'Preston_Hudson@blaise.tv',
      body: 'comment 2',
    },
  ];

  beforeAll(() => {
    const axiosInstance = axios.create({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
    client = BasicClient.fromAxiosInstance(axiosInstance);

    resource = Resource.createByResourceName(client, 'comment');
  });

  describe('list', () => {
    it('should return lists of resource', async () => {
      nock('https://jsonplaceholder.typicode.com')
        .get('/comments?postId=1')
        .reply(200, commentsData);

      const { data: comments } = await resource.list({ postId: 1 });

      expect(comments.length).toEqual(2);
    });

    it('should return lists of when parameters contains null value', async () => {
      nock('https://jsonplaceholder.typicode.com').get('/comments').reply(200, commentsData);
      const { data: comments } = await resource.list({ postId: undefined });
      expect(comments.length).toEqual(2);
    });
  });

  describe('get', () => {
    it('should return a resource', async () => {
      nock('https://jsonplaceholder.typicode.com').get('/comments/1').reply(200, commentsData[0]);

      const { data: comment } = await resource.find(1);

      expect(comment).toBeDefined();
      expect(comment.id).toBeDefined();
      expect(comment.name).toBeDefined();
    });
  });

  describe('create', () => {
    it('should return a resource', async () => {
      const commentData = {
        id: 3,
        name: 'C',
      };
      nock('https://jsonplaceholder.typicode.com').post('/comments').reply(201, commentData);

      const { data: comment } = await resource.create(commentData);

      expect(comment).toBeDefined();
      expect(comment.id).toEqual(commentData.id);
      expect(comment.name).toEqual(commentData.name);
    });
  });

  describe('update', () => {
    it('should return a resource', async () => {
      const commentData = {
        id: 4,
        name: 'C',
      };
      nock('https://jsonplaceholder.typicode.com')
        .patch(`/comments/${commentData.id}`)
        .reply(200, commentData);

      const { data: comment } = await resource.update(commentData.id, commentData);

      expect(comment).toBeDefined();
      expect(comment.id).toEqual(commentData.id);
      expect(comment.name).toEqual(commentData.name);
    });
  });

  describe('delete', () => {
    it('should return a resource', async () => {
      nock('https://jsonplaceholder.typicode.com').delete('/comments/1').reply(204, {});

      await resource.delete(1);
    });
  });
});
