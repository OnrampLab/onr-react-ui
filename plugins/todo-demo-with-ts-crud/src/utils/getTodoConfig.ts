import { App } from '@onr/core';
import { TodoConfig } from '../application/types';

export const getTodoConfig = () => {
  return App.getInstance().getConfig('todoConfig') as TodoConfig;
};
