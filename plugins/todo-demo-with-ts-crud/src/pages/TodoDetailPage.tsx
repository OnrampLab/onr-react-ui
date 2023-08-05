import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { TodoDetails } from '../components';
import { Todo } from '../definitions';
import { todoService } from '../services/TodoService';

export const TodoDetailPage: React.FC = () => {
  const router = useRouter();
  const [todo, setTodo] = useState<Todo | null>(null);
  const todoId = parseInt(
    Array.isArray(router.query.todoId) ? router.query.todoId[0] : router.query.todoId ?? '',
  );

  useEffect(() => {
    todoService.getTodo(todoId).then(setTodo);
  }, [todoId]);

  if (!todo) {
    return null;
  }

  return (
    <>
      <TodoDetails todo={todo} />
    </>
  );
};
