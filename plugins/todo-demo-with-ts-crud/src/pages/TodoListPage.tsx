import React, { useEffect, useState } from 'react';
import { TodoList } from '../components';
import { Todo } from '../definitions';
import { todoService } from '../services/TodoService';

export const TodoListPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    todoService.customList().then((allTodos: Todo[]) => {
      const todos = allTodos.slice(0, 10);

      setTodos(todos);
    });
  }, []);

  return (
    <>
      <TodoList todos={todos} />
    </>
  );
};
