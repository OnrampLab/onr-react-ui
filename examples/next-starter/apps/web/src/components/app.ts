import { createApp, OnrApp } from '@onr/core';
import { AccountService } from '@onr/plugin-account';
import { FullPageLayout, HeaderBarLeftSideMenuLayout } from '@onr/plugin-antd';
import { AuthService } from '@onr/plugin-auth';
import { UserService } from '@onr/plugin-user';
import { appConfig } from '../configs/appConfig';
import { logConfig } from '../configs/logging';
import { menuItems } from '../configs/menuItems';
import { routes } from '../configs/routes';
import { LoadingPage } from './LoadingPage';

const app: OnrApp = createApp({
  appConfig,
  logConfig,
  menuItems,
  routes,
  components: {
    LoadingPage,
  },
});

const authService = AuthService.fromAxiosInstance(app.apis.adminAxiosInstance);
const accountService = AccountService.fromAxiosInstanceAndName(
  app.apis.adminAxiosInstance,
  'accounts',
);
const userService = UserService.fromAxiosInstanceAndName(app.apis.adminAxiosInstance, 'users');

// TODO: need to lazy load to minimize bundle size
app.addService('authService', authService);
app.addService('accountService', accountService);
app.addService('userService', userService);

app.setLayouts({
  'full-page': FullPageLayout,
  'header-bar-left-side-menu': HeaderBarLeftSideMenuLayout,
});

export { app };
