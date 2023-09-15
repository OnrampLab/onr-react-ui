import { Configs } from '@onr/core';
import { appConfig } from './app';
import { authConfig } from './auth';
import { logConfig } from './logging';
import { menuItems } from './menuItems';
import { routes } from './routes';
import { themeConfig } from './theme';

export const configs: Configs = {
  appConfig,
  authConfig,
  menuItems,
  routes,
  logConfig,
  themeConfig,
};
