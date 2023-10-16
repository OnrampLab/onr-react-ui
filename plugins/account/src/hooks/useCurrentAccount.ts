import { CoreStore, coreActions } from '@onr/core';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useCurrentAccount = () => {
  const dispatch = useDispatch();
  const accountId = useSelector((store: CoreStore) => store.coreStore.accountId);

  const setCurrentAccountId = useCallback(
    (accountId: number) => {
      dispatch(coreActions.setAccountId(accountId));
    },
    [dispatch],
  );

  return {
    accountId,
    setCurrentAccountId,
  };
};
