import { DefaultPubSubContext } from '@onr/core';
import { message } from 'antd';
import React, { useContext } from 'react';
import { AccountForm } from '.';
import { AccountService, IAccount } from '..';

interface UpdateAccountFormProps {
  currentAccount: IAccount;
  onSubmit(): void;
}

export const UpdateAccountForm: React.FC<UpdateAccountFormProps> = ({
  onSubmit,
  currentAccount,
}: UpdateAccountFormProps) => {
  // @ts-ignore
  const { publish } = useContext(DefaultPubSubContext);

  async function handleSubmit(account: IAccount) {
    await AccountService.updateAccount({
      accountId: currentAccount.id!,
      data: account,
    });

    message.info(`Account ${account.name} updated`);
    publish('account.updated');

    if (onSubmit) {
      onSubmit();
    }
  }

  return <AccountForm currentAccount={currentAccount} handleSubmit={handleSubmit} />;
};
