import { ResourceClient } from '@onr/ts-rest-client';
import { Todo } from '../definitions';

class TodoService extends ResourceClient<Todo> {
  async customList() {
    const response = await this.client.request<Todo[]>({
      url: '/todos',
    });

    return response.data;
  }
}

export const todoService = new TodoService('todos', {
  baseURL: 'https://jsonplaceholder.typicode.com',
});
