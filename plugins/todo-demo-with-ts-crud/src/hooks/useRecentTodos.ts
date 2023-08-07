import { useMenuItems } from '@onr/core';
import { useEffect, useRef, useState } from 'react';
import { recentTodoAdapter } from '../adapters/recentTodoAdapter';
import { AddRecentTodoUseCase } from '../application/useCases/AddRecentTodoUseCase';
import { Todo } from '../definitions';

export const useRecentTodos = () => {
  const { addSubMenuItem, clearSubMenuItems } = useMenuItems();
  const todos = recentTodoAdapter.list();
  const [recentTodos, setRecentTodos] = useState(todos);

  const addTodo = (todo: Todo) => {
    const todos = new AddRecentTodoUseCase(todo).perform();

    setRecentTodos(todos);
  };

  const addTodoRef = useRef(addTodo);

  useEffect(() => {
    recentTodos.map(todo => {
      addSubMenuItem('Recent Todos', {
        path: `/todos/${todo.id}`,
        name: todo.title,
        login: false,
      });
    });

    return () => {
      clearSubMenuItems('Recent Todos');
    };
  }, [recentTodos, addSubMenuItem, clearSubMenuItems]);

  return { recentTodos, addTodo: addTodoRef.current };
};
