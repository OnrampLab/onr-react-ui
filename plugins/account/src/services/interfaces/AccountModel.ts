import { AccountsPayload, AccountsResponse } from '.';
import { IAccount } from '../../entities/interfaces';

export interface GetAccountsPayload {
  params: AccountsPayload;
}

export interface GetAccountsResponse extends AccountsResponse {}
export interface GetAccountResponse {
  data: IAccount;
}
