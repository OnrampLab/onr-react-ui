import { App, Plugin } from '@onr/core';
import { UserService } from './services';

export class UserPlugin implements Plugin {
  public name = 'UserPlugin';

  bootstrap(app: App) {
    this.registerServices(app);
  }

  private registerServices(app: App) {
    const adminAxiosInstance = app.apis.adminAxiosInstance;

    const userService = UserService.fromAxiosInstanceAndName(adminAxiosInstance, 'users');

    app.addService('userService', userService);
  }
}
