import { coreActions, CoreStore, useAuth } from '@onr/core';
import { message, Select } from 'antd';
import Router from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IAccount } from '../entities';

export const AccountSelector: React.FC = () => {
  const dispatch = useDispatch();
  const [accounts, setAccounts] = React.useState<IAccount[]>([]);
  const accountId = useSelector((store: CoreStore) => store.coreStore.accountId);
  //@ts-ignore
  const { user: currentUser } = useAuth();

  useEffect(() => {
    //@ts-ignore
    if (currentUser.accounts) {
      //@ts-ignore
      setAccounts(currentUser.accounts);

      if (accounts[0] && !accountId) {
        changeAccount(accounts[0].id);
      }
    }
    // @ts-ignore
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser.accounts]);

  function changeAccount(accountId: number) {
    dispatch(coreActions.setAccountId(accountId));
    Router.push('/');
    message.info('Account has been changed');
  }

  return (
    <>
      <Select
        showSearch
        style={{ width: 200 }}
        optionFilterProp="children"
        onChange={changeAccount}
        value={accountId}
        filterOption={(input, option) =>
          option?.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {accounts.map(account => (
          <Select.Option key={account.id} value={account.id}>
            {account.id} | {account.name}
          </Select.Option>
        ))}
      </Select>
    </>
  );
};
