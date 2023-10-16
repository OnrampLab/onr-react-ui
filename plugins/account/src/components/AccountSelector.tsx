import { useAuth } from '@onr/core';
import { message, Select } from 'antd';
import Router from 'next/router';
import React, { useCallback, useEffect } from 'react';
import { IAccount } from '../entities';
import { useCurrentAccount } from '../hooks/useCurrentAccount';

export const AccountSelector: React.FC = () => {
  const [accounts, setAccounts] = React.useState<IAccount[]>([]);
  const { accountId, setCurrentAccountId } = useCurrentAccount();

  const { user: currentUser } = useAuth();
  const changeAccount = useCallback(
    (accountId: number) => {
      setCurrentAccountId(accountId);
      Router.push('/admin');
      message.info('Account has been changed');
    },
    [setCurrentAccountId],
  );

  useEffect(() => {
    if (currentUser?.accounts) {
      setAccounts(currentUser.accounts);

      if (accounts[0] && !accountId) {
        changeAccount(accounts[0].id);
      }
    }
  }, [currentUser?.accounts, accountId, accounts, changeAccount]);

  if (accounts.length === 0) {
    return <></>;
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
