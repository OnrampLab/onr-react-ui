import { DefaultAuthUser } from '@onr/core';
import { IAccount } from '@onr/plugin-account';

export class AppUser extends DefaultAuthUser {
  public accounts: IAccount[];

  constructor(params: any) {
    super(params);

    this.accounts = params.accounts || [];
  }
}
