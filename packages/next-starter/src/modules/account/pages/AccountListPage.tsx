import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DefaultPubSubContext, IStore } from '@onr/core';
import { AccountList, accountActions } from '@onr/account';

export const AccountListPage: React.FC = () => {
  const dispatch = useDispatch();
  const accounts = useSelector((store: IStore) => store.accountStore.accounts);
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
