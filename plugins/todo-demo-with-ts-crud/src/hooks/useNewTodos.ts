import { useMenuItems } from '@onr/core';
import { useEffect } from 'react';
import { useTodos } from './useTodos';

export const useNewTodos = () => {
  const { addSubMenuItem, clearSubMenuItems } = useMenuItems();
  const { todos } = useTodos({ size: 5, orderBy: 'id', sort: 'desc' });

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
