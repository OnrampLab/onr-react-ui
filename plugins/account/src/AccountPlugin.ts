import { App, Plugin } from '@onr/core';
import { AccountService } from './services';

export class AccountPlugin implements Plugin {
  public name = 'AccountPlugin';

  async bootstrap(app: App): Promise<void> {
    this.registerServices(app);
  }

  private registerServices(app: App) {
    const adminAxiosInstance = app.apis.adminAxiosInstance;

    const accountService = AccountService.fromAxiosInstanceAndName<AccountService>(
      adminAxiosInstance,
      'accounts',
    );

    app.addService<AccountService>('accountService', accountService);
  }
}
