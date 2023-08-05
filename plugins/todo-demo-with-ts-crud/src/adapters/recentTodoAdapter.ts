import { Todo } from '../definitions';
import { LocalStorageAdapter } from './LocalStorageAdapter';

const STORE_NAME = 'recent-todos-store';

class RecentTodoAdapter {
  constructor(private storage: LocalStorageAdapter<Todo[]>) {}

  put(todo: Todo): void {
    let todos = this.list();

    const index = todos.findIndex(t => {
      return t.id === todo.id;
    });

    if (index !== -1) {
      todos.splice(index, 1);
    }

    todos.unshift(todo);

    if (todos.length > 5) {
      todos = todos.slice(0, 5);
    }

    this.storage.set(STORE_NAME, todos);
  }

  list(): Todo[] {
    const todos = this.getStore();

    return todos;
  }

  private getStore(): Todo[] {
    return this.storage.get(STORE_NAME) || [];
  }
}

export const recentTodoAdapter = new RecentTodoAdapter(new LocalStorageAdapter());
