//#region Global Imports
//#endregion Global Imports

//#region Local Imports
import { actionConsts } from '../actionConsts';
//#endregion Local Imports

//#region Interface Imports
import { IAction } from '@onr/core';
//#endregion Interface Imports

/**
 * INITIAL_STATE
 */
const INITIAL_STATE = {
  accounts: [],
  pagination: {},
};

/**
 * REDUCER
 */
export const accountReducer = (state = INITIAL_STATE, action: IAction<any>) => {
  switch (action.type) {
    case actionConsts.account.setAccounts:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
