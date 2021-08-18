import { App } from '@onr/core';
import { Dispatch } from 'redux';
import { AccountService } from '../services/AccountService';
import { actionConsts } from './actionConsts';

export const accountActions = {
  setAccounts: (payload: {}) => ({
    payload,
    type: actionConsts.account.setAccounts,
  }),

  getAccounts: (payload: any) => async (dispatch: Dispatch) => {
    const accountService = App.getInstance().getService('accountService') as AccountService;
    const accounts = await accountService.getAccounts({
      params: payload.params,
    });

    // FIXME: should not save accounts to store
    // when fetching accounts in account list page, it will affect the data in UserSelector
    dispatch(
      accountActions.setAccounts({
        accounts,
      }),
    );
  },
};
