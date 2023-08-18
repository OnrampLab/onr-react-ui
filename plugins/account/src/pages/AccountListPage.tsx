import React from 'react';
import { DynamicModuleLoader } from 'redux-dynamic-modules-react';
import { AccountList } from '../components/AccountList';
import { useAccounts } from '../hooks';
import { getAccountModule } from '../redux/getAccountModule';

export const AccountListPage: React.FC = () => {
  const { accounts, fetch } = useAccounts();

  return (
    <DynamicModuleLoader modules={[getAccountModule()]}>
      <AccountList accounts={accounts} onAccountsChanged={() => fetch()} />
    </DynamicModuleLoader>
  );
};
