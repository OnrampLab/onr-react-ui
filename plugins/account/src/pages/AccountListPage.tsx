import React from 'react';
import { DynamicModuleLoader } from 'redux-dynamic-modules-react';
import { AccountList } from '../components/AccountList';
import { useAccounts } from '../hooks';
import { getAccountModule } from '../redux/getAccountModule';

export const AccountListPage: React.FC = () => {
  const { accounts, pagination, fetch } = useAccounts();

  return (
    // @ts-ignore
    <DynamicModuleLoader modules={[getAccountModule()]}>
      <AccountList accounts={accounts} pagination={pagination} onAccountsChanged={fetch} />
    </DynamicModuleLoader>
  );
};
