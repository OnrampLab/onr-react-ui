import { ResourceClient } from '@onr/ts-rest-client';
import { IAccount } from '../entities/interfaces/IAccount';
import { GetAccountsPayload } from './interfaces/AccountModel';

export class AccountService extends ResourceClient<IAccount> {
  async getAccounts(payload: GetAccountsPayload): Promise<IAccount[]> {
    try {
      const accounts = await this.list(payload.params);

      return accounts;
    } catch (error) {
      console.log(error);
      throw new Error(`[AccountService] getAccounts Error: ${JSON.stringify(error)}`);
    }
  }

  async createAccount(payload: { data: IAccount }) {
    try {
      const account = await this.create(payload.data);
      return account;
    } catch (error) {
      console.log(error);
      throw new Error(`[AccountService] createAccount Error: ${JSON.stringify(error)}`);
    }
  }

  async updateAccount(payload: { data: any; accountId: number }) {
    try {
      const account = await this.update(payload.accountId, payload.data);
      return account;
    } catch (error) {
      console.log(error);
      throw new Error(`[AccountService] updateAccount Error: ${JSON.stringify(error)}`);
    }
  }

  async deleteAccount(payload: { accountId: number }): Promise<void> {
    try {
      await this.delete(payload.accountId);
    } catch (error) {
      console.log(error);
      throw new Error(`[AccountService] deleteAccount Error: ${JSON.stringify(error)}`);
    }
  }
}
