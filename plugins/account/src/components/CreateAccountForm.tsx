import { DefaultPubSubContext } from '@onr/core';
import { message } from 'antd';
import React, { useContext } from 'react';
import { AccountForm } from '.';
import { AccountService, IAccount } from '..';

interface CreateAccountFormProps {
  onSubmit(): void;
}

export const CreateAccountForm: React.FC<CreateAccountFormProps> = ({
  onSubmit,
}: CreateAccountFormProps) => {
  const { publish } = useContext(DefaultPubSubContext);
  const currentAccount: Partial<IAccount> = {};

  async function handleSubmit(Account: IAccount) {
    await AccountService.createAccount({
      data: Account,
    });

    message.info(`Account ${Account.name} created`);
    publish('account.updated');

    if (onSubmit) {
      onSubmit();
    }
  }

  return <AccountForm currentAccount={currentAccount} handleSubmit={handleSubmit} />;
};
