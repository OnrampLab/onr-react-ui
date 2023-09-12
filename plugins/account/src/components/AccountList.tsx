import { App, Pagination } from '@onr/core';
import { useGlobalModal } from '@onr/plugin-antd';
import { Button, Card, Popconfirm, Table, TablePaginationConfig, message } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import React from 'react';
import { AccountService, IAccount } from '..';
import { CreateAccountForm } from './CreateAccountForm';
import { UpdateAccountForm } from './UpdateAccountForm';

interface IAccountListProps {
  accounts: IAccount[];
  pagination: Pagination;
  onAccountsChanged(params?: any): void;
}

export const AccountList: React.FC<IAccountListProps> = ({
  accounts,
  pagination,
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
      sorter: true,
    },
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
    },
    {
      key: 'created_at',
      title: 'Created At',
      dataIndex: 'created_at',
      render: (text, _record) => new Date(text).toLocaleDateString(),
      sorter: true,
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

  const onChange = ({ current, pageSize }: TablePaginationConfig, _filters: any, sorter: any) => {
    onAccountsChanged({
      page: current,
      size: pageSize,
      sort_by: sorter.field,
      sort: sorter.order === 'ascend' ? 'ASC' : 'DESC',
    });
  };

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
        <Table<IAccount>
          rowKey="id"
          columns={columns}
          dataSource={accounts}
          pagination={{
            defaultCurrent: pagination?.current_page ?? 1,
            showSizeChanger: true,
            pageSize: pagination?.per_page,
            total: pagination?.total,
          }}
          onChange={onChange}
        />
      </Card>
    </>
  );
};
