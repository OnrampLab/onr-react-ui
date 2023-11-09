import { useEffect, useState } from 'react';
import { Todo } from '../definitions';
import { todoService } from '../services/TodoService';

export const useTodos = (params?: any) => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await todoService.listTodos(params).then(setTodos);
      setLoading(false);
    })();
  }, [params]);

  return { loading, todos };
};
