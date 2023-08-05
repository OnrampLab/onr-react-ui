import { useEffect, useState } from 'react';
import { Todo } from '../definitions';
import { todoService } from '../services/TodoService';

export const useTodos = (_filter: any = {}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    todoService.customList().then((allTodos: Todo[]) => {
      const todos = allTodos.slice(0, 10);

      setTodos(todos);
    });
  }, []);

  return { todos };
};
