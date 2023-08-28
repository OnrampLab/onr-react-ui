import { ResourceClient } from '@onr/ts-rest-client';
import { Todo } from '../definitions';

class TodoService extends ResourceClient {
  async listTodos(params: any = {}) {
    const { size, orderBy, sort } = params;

    const response = await this.axiosInstance.request({
      url: '/todos',
    });

    let allTodos = response.data;

    if (orderBy) {
      allTodos = allTodos.sort((a: any, b: any) => {
        return sort === 'asc' ? a[orderBy] - b[orderBy] : b[orderBy] - a[orderBy];
      });
    }

    const todos = size ? allTodos.slice(0, size) : allTodos;

    return todos as Todo[];
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
