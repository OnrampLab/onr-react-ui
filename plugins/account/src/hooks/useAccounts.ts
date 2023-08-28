import { CoreStore } from '@onr/core';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreProps, accountActions } from '../redux';

interface Parameters {}

type Store = CoreStore & StoreProps;

export const useAccounts = (params?: Parameters) => {
  const dispatch = useDispatch();
  const accounts = useSelector((store: Store) => store.accountStore?.accounts ?? []);
  const pagination = useSelector((store: Store) => store.accountStore?.pagination ?? []);

  const fetch = useCallback(
    (payload?: any) => {
      dispatch(
        accountActions.getAccounts({
          params: { ...params, ...payload },
        }),
      );
    },
    [dispatch, params],
  );

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    accounts,
    pagination,
    fetch,
  };
};
