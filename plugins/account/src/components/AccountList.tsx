import { App, useGlobalModal } from '@onr/core';
import { Button, Card, Popconfirm, Table, message } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import React from 'react';
import { AccountService, IAccount } from '..';
import { CreateAccountForm } from './CreateAccountForm';
import { UpdateAccountForm } from './UpdateAccountForm';

interface IAccountListProps {
  accounts: IAccount[];
  onAccountsChanged(): void;
}

export const AccountList: React.FC<IAccountListProps> = ({
  accounts,
  onAccountsChanged,
}: IAccountListProps) => {
  const { showModal } = useGlobalModal();

  const showAccountModal = (currentAccount?: any) => {
    if (currentAccount) {
      showModal({
        title: 'Update Account',
        content: (
          <UpdateAccountForm currentAccount={currentAccount} onSubmit={() => onAccountsChanged()} />
        ),
      });
    } else {
      showModal({
        title: 'Create Account',
        content: <CreateAccountForm onSubmit={() => onAccountsChanged()} />,
      });
    }
  };

  const deleteAccount = async (account: IAccount) => {
    try {
      if (!account.id) {
        throw new Error('No account id');
      }
      const accountService = App.getInstance().getService('accountService') as AccountService;
      await accountService.deleteAccount({ accountId: account.id });
      message.success(`Account ${account.name} deleted`);
      onAccountsChanged();
    } catch (e) {
      if (e instanceof Error) {
        message.error(`Failed to delete account${e.message && `: ${e.message}`}`);
      }
    }
  };

  const columns: ColumnProps<IAccount>[] = [
    {
      key: 'id',
      title: 'ID',
      dataIndex: 'id',
    },
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
    },
    {
      key: 'operations',
      title: 'Operations',
      render: (_text, account) => {
        return (
          <span className="operations">
            <a onClick={() => showAccountModal(account)}>Edit</a>{' '}
            <Popconfirm
              title="Confirm delete account"
              onConfirm={async () => deleteAccount(account)}
            >
              <a>Delete</a>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  return (
    <>
      <Card
        title="Accounts"
        extra={
          <Button type="primary" onClick={() => showAccountModal()}>
            Create Account
          </Button>
        }
      >
        <Table<IAccount> rowKey="id" columns={columns} dataSource={accounts} pagination={false} />
      </Card>
    </>
  );
};
