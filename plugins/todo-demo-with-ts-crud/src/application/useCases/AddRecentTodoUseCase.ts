import { UseCase } from '@onr/core';
import { recentTodoAdapter } from '../../adapters/recentTodoAdapter';
import { Todo } from '../../definitions';

export class AddRecentTodoUseCase extends UseCase {
  constructor(private todo: Todo) {
    super();
  }

  perform() {
    return this.addRecentTodo();
  }

  addRecentTodo(): Todo[] {
    let todos = recentTodoAdapter.list();

    const index = todos.findIndex(t => {
      return t.id === this.todo.id;
    });

    if (index !== -1) {
      todos.splice(index, 1);
    }

    todos.unshift(this.todo);

    if (todos.length > 5) {
      todos = todos.slice(0, 5);
    }

    recentTodoAdapter.replaceWith(todos);

    return todos;
  }
}
