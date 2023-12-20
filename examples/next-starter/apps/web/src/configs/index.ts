import { Configs } from '@onr/core';
import { TodoConfigMapping, todoConfig } from '@onr/plugin-todo-demo-with-ts-rest-client';
import { appConfig } from './app';
import { authConfig } from './auth';
import { logConfig } from './logging';
import { menuItems } from './menuItems';
import { routes } from './routes';
import { themeConfig } from './theme';

type MyConfigs = TodoConfigMapping & Configs;

export const configs: MyConfigs = {
  appConfig,
  authConfig,
  menuItems,
  routes,
  logConfig,
  themeConfig,
  todoConfig,
};
