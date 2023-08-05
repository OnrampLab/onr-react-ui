import React from 'react';
import { Todo } from '../definitions';

interface Props {
  todo: Todo;
}

export const TodoDetails: React.FC<Props> = props => {
  const { todo } = props;

  return (
    <>
      <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
          <div className="mb-4">
            <h1 className="text-grey-darkest">Todo</h1>
          </div>
          <div>{todo.title}</div>
        </div>
      </div>
    </>
  );
};
