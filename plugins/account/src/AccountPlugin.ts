import { App, Plugin } from '@onr/core';
import { AccountService } from './services';

export class AccountPlugin implements Plugin {
  public name = 'AccountPlugin';

  bootstrap(app: App) {
    this.registerServices(app);
  }

  private registerServices(app: App) {
    const adminAxiosInstance = app.apis.adminAxiosInstance;

    const accountService = AccountService.fromAxiosInstanceAndName(adminAxiosInstance, 'accounts');

    app.addService('accountService', accountService);
  }
}
