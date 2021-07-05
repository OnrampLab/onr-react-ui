//#region Local Imports
import { Http } from '@onr/common';
import { GetAccountsPayload, GetAccountsResponse } from './interfaces';
//#endregion Local Imports

export const AccountService = {
  getAccounts: async (payload: GetAccountsPayload): Promise<GetAccountsResponse> => {
    try {
      const response = await Http.get<GetAccountsResponse>(`/accounts`, {
        params: payload.params,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(`[AccountService] getAccounts Error: ${JSON.stringify(error)}`);
    }
  },

  createAccount: async (payload: { data: any }): Promise<{}> => {
    try {
      const response = await Http.post<{}>(`/accounts`, {
        data: payload.data,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(`[AccountService] createAccount Error: ${JSON.stringify(error)}`);
    }
  },

  updateAccount: async (payload: { data: any; accountId: number }): Promise<{}> => {
    try {
      const response = await Http.patch<{}>(`/accounts/${payload.accountId}`, {
        data: payload.data,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(`[AccountService] updateAccount Error: ${JSON.stringify(error)}`);
    }
  },

  deleteAccount: async (payload: { accountId: number }): Promise<{}> => {
    try {
      const response = await Http.delete<{}>(`/accounts/${payload.accountId}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(`[AccountService] deleteAccount Error: ${JSON.stringify(error)}`);
    }
  },
};
