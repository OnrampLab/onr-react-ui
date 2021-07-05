import { CoreStore, DefaultPubSubContext } from '@onr/core';
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AccountList } from '../components/AccountList';
import { accountActions } from '../redux';
import { StoreProps } from '../redux/types';

type Store = CoreStore & StoreProps;

export const AccountListPage: React.FC = () => {
  const dispatch = useDispatch();
  const accounts = useSelector((store: Store) => store.accountStore.accounts);
  // @ts-ignore
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AccountList accounts={accounts} />
    </>
  );
};