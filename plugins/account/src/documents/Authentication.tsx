import { useAppState } from '@onr/core';
import React, { useEffect, useState } from 'react';
import { IAccountApiKey } from '../entities';
import { AccountService } from '../services';
import AccountApiKey from './AccountApiKey.mdx';

export const Authentication: React.FC = () => {
  const [accountApiKey, setAccountApiKey] = useState<IAccountApiKey | null>(null);
  const [state] = useAppState();
  const fetchData = async () => {
    const apiKeys = await AccountService.getAccountApiKeys({
      accountId: state.accountId,
    });

    setAccountApiKey(apiKeys[0] || {});
  };

  useEffect(() => {
    if (state.accountId) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.accountId]);

  return <>{accountApiKey && <AccountApiKey accountApiKey={accountApiKey} />}</>;
};
