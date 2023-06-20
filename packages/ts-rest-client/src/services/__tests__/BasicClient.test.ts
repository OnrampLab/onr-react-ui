import axios from 'axios';
import { RecordNotFoundError } from '../../errors/RecordNotFoundError';
import { BasicClient } from '../BasicClient';

describe('BasicClient', () => {
  it('respond for successful API call', async () => {
    const axiosInstance = axios.create();
    const chatClient = BasicClient.fromAxiosInstance(axiosInstance);

    const response = await chatClient.get('https://jsonplaceholder.typicode.com/todos/1');

    expect(response.data).toEqual({
      completed: false,
      id: 1,
      title: 'delectus aut autem',
      userId: 1,
    });
  });

  it('throw error for 404 error', async () => {
    const axiosInstance = axios.create();
    const chatClient = BasicClient.fromAxiosInstance(axiosInstance);

    try {
      await chatClient.post('https://jsonplaceholder.typicode.com/todos/1');
    } catch (error) {
      expect(error).toBeInstanceOf(RecordNotFoundError);
    }
  });
});
