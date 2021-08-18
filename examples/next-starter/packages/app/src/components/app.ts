import { createApp, OnrApp } from '@onr/core';
import { AccountService } from '@onr/plugin-account';
import { AuthService } from '@onr/plugin-auth';
import { UserService } from '@onr/plugin-user';
import { appConfig } from '../configs/appConfig';
import { menuItems } from '../configs/menuItems';
import { routes } from '../configs/routes';
import { LoadingPage } from './LoadingPage';

const app: OnrApp = createApp({
  appConfig,
  menuItems,
  routes,
  components: {
    LoadingPage,
  },
});

app.apis.adminAxiosInstance.interceptors.response.use(function(response: any) {
  return response.data;
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

export { app };
