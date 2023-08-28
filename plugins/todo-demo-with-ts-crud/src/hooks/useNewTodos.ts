import { useMenuItems } from '@onr/core';
import { useEffect, useState } from 'react';
import { useTodos } from './useTodos';

export const useNewTodos = () => {
  const { addSubMenuItem, clearSubMenuItems } = useMenuItems();
  const [payload] = useState({ size: 5, orderBy: 'id', sort: 'desc' });
  const { todos } = useTodos(payload);

  useEffect(() => {
    todos.map(todo => {
      addSubMenuItem('New Todos', {
        path: `/todos/${todo.id}`,
        name: todo.title,
        login: false,
      });
    });

    return () => {
      clearSubMenuItems('New Todos');
    };
  }, [todos, addSubMenuItem, clearSubMenuItems]);
};
