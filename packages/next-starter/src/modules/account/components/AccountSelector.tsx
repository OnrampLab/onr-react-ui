import React, { useEffect } from 'react';
import { Select, message } from 'antd';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { IAccount } from '@onr/account';
import { coreActions, IStore } from '@onr/core';

export const AccountSelector: React.FC = () => {
  const dispatch = useDispatch();
  const [accounts, setAccounts] = React.useState<IAccount[]>([]);
  const accountId = useSelector((store: IStore) => store.coreStore.accountId);
  const currentUser = useSelector((store: IStore) => store.authStore.currentUser);

  useEffect(() => {
    if (currentUser.accounts) {
      setAccounts(currentUser.accounts);

      if (accounts[0] && !accountId) {
        changeAccount(accounts[0].id);
      }
    }
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
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
