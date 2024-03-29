import { App } from '@onr/core';
import { message } from 'antd';
import React from 'react';
import { AccountForm } from '.';
import { AccountService, IAccount } from '..';

interface CreateAccountFormProps {
  onSubmit(): void;
}

export const CreateAccountForm: React.FC<CreateAccountFormProps> = ({
  onSubmit,
}: CreateAccountFormProps) => {
  const currentAccount: Partial<IAccount> = {};

  async function handleSubmit(Account: IAccount) {
    const accountService = App.getInstance().getService<AccountService>('accountService');
    await accountService.createAccount({
      data: Account,
    });

    message.info(`Account ${Account.name} created`);

    if (onSubmit) {
      onSubmit();
    }
  }

  return <AccountForm currentAccount={currentAccount} handleSubmit={handleSubmit} />;
};
