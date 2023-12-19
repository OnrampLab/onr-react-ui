import { App, Plugin } from '@onr/core';
import { UserService } from './services';

export class UserPlugin implements Plugin {
  public name = 'UserPlugin';

  async bootstrap(app: App): Promise<void> {
    this.registerServices(app);
  }

  private registerServices(app: App) {
    const adminAxiosInstance = app.apis.adminAxiosInstance;

    const userService = UserService.fromAxiosInstanceAndName<UserService>(
      adminAxiosInstance,
      'users',
    );

    app.addService<UserService>('userService', userService);
  }
}
