import { ResourceClient } from '@onr/ts-rest-client';
import { Todo } from '../definitions';

class TodoService extends ResourceClient<Todo> {
  async customList() {
    const response = await this.axiosInstance.request<Todo[]>({
      url: '/todos',
    });

    return response.data;
  }

  async getTodo(id: number) {
    const response = await this.axiosInstance.request<Todo>({
      url: `/todos/${id}`,
    });

    return response.data;
  }
}

export const todoService = new TodoService('todos', {
  baseURL: 'https://jsonplaceholder.typicode.com',
});
