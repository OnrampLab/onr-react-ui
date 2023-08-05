import { useMenuItems } from '@onr/core';
import { useEffect } from 'react';
import { useTodos } from './useTodos';

export const useRecentTodos = () => {
  const { addSubMenuItem } = useMenuItems();
  const { todos } = useTodos({ size: 5 });

  useEffect(() => {
    todos.map(todo => {
      addSubMenuItem('Recent Todos', {
        path: `/todos/${todo.id}`,
        name: todo.title,
        login: false,
      });
    });
  }, [todos, addSubMenuItem]);
};
