import { App, Plugin } from '@onr/core';
import { AuthService } from './services';

export class AuthPlugin implements Plugin {
  public name = 'AuthPlugin';

  async bootstrap(app: App): Promise<void> {
    this.registerServices(app);
  }

  private registerServices(app: App) {
    const adminAxiosInstance = app.apis.adminAxiosInstance;

    const authService = AuthService.fromAxiosInstance<AuthService>(adminAxiosInstance);

    // TODO: need to lazy load to minimize bundle size
    app.addService<AuthService>('authService', authService);
  }
}
