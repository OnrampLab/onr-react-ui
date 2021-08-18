import React from 'react';
import { Todo } from '../definitions';

interface Props {
  todo: Todo;
}

const DoneItem: React.FC<Props> = props => {
  const { todo } = props;
  return (
    <>
      <p className="w-full line-through text-green">{todo.title}</p>
      <button className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-grey border-grey hover:bg-grey">
        Not Done
      </button>
    </>
  );
};

const UnDoneItem: React.FC<Props> = props => {
  const { todo } = props;
  return (
    <>
      <p className="w-full text-grey-darkest">{todo.title}</p>
      <button className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green">
        Done
      </button>
    </>
  );
};

export const TodoListItem: React.FC<Props> = props => {
  const { todo } = props;

  return (
    <>
      <div className="flex mb-4 items-center">
        {!todo.completed && <DoneItem todo={todo} />}
        {todo.completed && <UnDoneItem todo={todo} />}
        <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red">
          Remove
        </button>
      </div>
    </>
  );
};
