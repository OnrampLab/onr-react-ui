import { coreActions, CoreStore, useAuth } from '@onr/core';
import { message, Select } from 'antd';
import Router from 'next/router';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IAccount } from '../entities';

export const AccountSelector: React.FC = () => {
  const dispatch = useDispatch();
  const [accounts, setAccounts] = React.useState<IAccount[]>([]);
  const accountId = useSelector((store: CoreStore) => store.coreStore.accountId);

  const { user: currentUser } = useAuth();
  const changeAccount = useCallback(
    (accountId: number) => {
      dispatch(coreActions.setAccountId(accountId));
      Router.push('/admin');
      message.info('Account has been changed');
    },
    [dispatch],
  );

  useEffect(() => {
    if (currentUser.accounts) {
      setAccounts(currentUser.accounts);

      if (accounts[0] && !accountId) {
        changeAccount(accounts[0].id);
      }
    }
  }, [currentUser.accounts, accountId, accounts, changeAccount]);

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
