import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DefaultPubSubContext, CoreStore } from '@onr/core';
import { AccountList, accountActions, StoreProps } from '@onr/account';

type Store = CoreStore & StoreProps;

export const AccountListPage: React.FC = () => {
  const dispatch = useDispatch();
  const accounts = useSelector((store: Store) => store.accountStore.accounts);
  const { subscribe } = useContext(DefaultPubSubContext);

  useEffect(() => {
    async function fetchData() {
      dispatch(
        accountActions.getAccounts({
          params: {},
        }),
      );
    }

    fetchData();

    const unsub = subscribe('account.updated', fetchData);

    return unsub;
  }, [dispatch, subscribe]);

  return (
    <>
      <AccountList accounts={accounts} />
    </>
  );
};
