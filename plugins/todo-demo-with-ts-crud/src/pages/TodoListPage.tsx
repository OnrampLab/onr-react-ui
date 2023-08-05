import React from 'react';
import { TodoList } from '../components';
import { useTodos } from '../hooks/useTodos';

export const TodoListPage: React.FC = () => {
  const { todos } = useTodos();

  return (
    <>
      <TodoList todos={todos} />
    </>
  );
};
