import { App, Plugin } from '@onr/core';
import { AuthService } from './services';

export class AuthPlugin implements Plugin {
  public name = 'AuthPlugin';

  bootstrap(app: App) {
    this.registerServices(app);
  }

  private registerServices(app: App) {
    const adminAxiosInstance = app.apis.adminAxiosInstance;

    const authService = AuthService.fromAxiosInstance(adminAxiosInstance);

    // TODO: need to lazy load to minimize bundle size
    app.addService('authService', authService);
  }
}
