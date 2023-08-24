import axios from 'axios';
import { RecordNotFoundError } from '../../errors';
import { ResourceClient } from '../ResourceClient';

describe('ResourceClient', () => {
  it('respond for successful API call', async () => {
    const axiosInstance = axios.create({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
    const client = ResourceClient.fromAxiosInstanceAndName(axiosInstance, 'todos');

    const { data: todo } = await client.find(1);

    expect(todo).toEqual({
      completed: false,
      id: 1,
      title: 'delectus aut autem',
      userId: 1,
    });
  });

  it('throw error for 404 error', async () => {
    const axiosInstance = axios.create({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
    const client = ResourceClient.fromAxiosInstanceAndName(axiosInstance, 'todos');

    try {
      await client.find(1111);
    } catch (error) {
      expect(error).toBeInstanceOf(RecordNotFoundError);
    }
  });
});
