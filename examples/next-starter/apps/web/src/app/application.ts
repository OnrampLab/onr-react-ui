import { createApp, OnrApp } from '@onr/core';
import { AccountService } from '@onr/plugin-account';
import { FullPageLayout, HeaderBarLeftSideMenuLayout } from '@onr/plugin-antd';
import { AuthService } from '@onr/plugin-auth';
import { UserService } from '@onr/plugin-user';
import { LoadingPage } from '../components/LoadingPage';
import { MyApp } from '../components/MyApp';
import { configs } from '../configs';
import { withApp } from './withApp';

export class Application {
  private app: OnrApp;

  constructor() {
    this.app = createApp({
      configs,
      components: {
        LoadingPage,
      },
    });
    this.bootstrap();
  }

  getAppComponent() {
    return withApp(MyApp, this.app);
  }

  getService<T>(serviceName: string) {
    return this.app.getService(serviceName) as T;
  }

  private bootstrap() {
    this.registerServices();
    this.registerLayouts();
  }

  private registerServices() {
    const adminAxiosInstance = this.app.apis.adminAxiosInstance;

    const authService = AuthService.fromAxiosInstance(adminAxiosInstance);
    const accountService = AccountService.fromAxiosInstanceAndName(adminAxiosInstance, 'accounts');
    const userService = UserService.fromAxiosInstanceAndName(adminAxiosInstance, 'users');

    // TODO: need to lazy load to minimize bundle size
    this.app.addService('authService', authService);
    this.app.addService('accountService', accountService);
    this.app.addService('userService', userService);
  }

  private registerLayouts() {
    this.app.setLayouts({
      'full-page': FullPageLayout,
      'header-bar-left-side-menu': HeaderBarLeftSideMenuLayout,
    });
  }
}

export const application = new Application();
