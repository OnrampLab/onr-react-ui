import { CoreStore } from '@onr/core';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DynamicModuleLoader } from 'redux-dynamic-modules-react';
import { AccountList } from '../components/AccountList';
import { accountActions } from '../redux';
import { getAccountModule } from '../redux/getAccountModule';
import { StoreProps } from '../redux/types';

type Store = CoreStore & StoreProps;

export const AccountListContainer: React.FC = () => {
  const dispatch = useDispatch();
  const accounts = useSelector((store: Store) => store.accountStore.accounts);

  const fetchData = useCallback(() => {
    dispatch(
      accountActions.getAccounts({
        params: {},
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return <AccountList accounts={accounts} onAccountsChanged={() => fetchData()} />;
};

export const AccountListPage: React.FC = () => {
  return (
    <DynamicModuleLoader modules={[getAccountModule()]}>
      <AccountListContainer />
    </DynamicModuleLoader>
  );
};
