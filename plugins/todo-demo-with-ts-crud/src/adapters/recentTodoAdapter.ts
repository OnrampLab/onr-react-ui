import { LocalStorageAdapter } from '@onr/core';
import { Todo } from '../definitions';

const STORE_NAME = 'recent-todos-store';

class RecentTodoAdapter {
  constructor(private storage: LocalStorageAdapter<Todo[]>) {}

  replaceWith(todos: Todo[]): void {
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
