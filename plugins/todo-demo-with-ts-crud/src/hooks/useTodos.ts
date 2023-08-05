import { useEffect, useState } from 'react';
import { Todo } from '../definitions';
import { todoService } from '../services/TodoService';

export const useTodos = (params: any = {}) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    todoService.list(params).then(setTodos);
  }, []);

  return { todos };
};
