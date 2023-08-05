import { ResourceClient } from '@onr/ts-rest-client';
import { Todo } from '../definitions';

class TodoService extends ResourceClient<Todo> {
  async list(params: any = {}) {
    const { size } = params;

    const response = await this.axiosInstance.request<Todo[]>({
      url: '/todos',
    });

    const allTodos = response.data;
    const todos = size ? allTodos.slice(0, size) : allTodos;

    return todos;
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
