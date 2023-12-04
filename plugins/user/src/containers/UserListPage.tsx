import { App } from '@onr/core';
import { IAccount, getAccountModule } from '@onr/plugin-account';
import { useGlobalModal } from '@onr/plugin-antd';
import { Button, Card, Popconfirm, Table, TablePaginationConfig, message } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import React from 'react';
import { DynamicModuleLoader } from 'redux-dynamic-modules-react';
import { CreateUserForm } from '../components/CreateUserForm';
import { UpdateUserForm } from '../components/UpdateUserForm';
import { AccountUser } from '../entities/interfaces/AccountUser';
import { UserRole } from '../entities/interfaces/IUser';
import { useUsers } from '../hooks/useUsers';
import { UserService } from '../services/UserService';

const UserListContainer: React.FC = () => {
  const { showModal } = useGlobalModal();
  const userService = App.getInstance().getService('userService') as UserService;

  const { users, pagination, fetch } = useUsers();

  const columns: ColumnProps<AccountUser>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: true,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: true,
    },
    {
      title: 'Roles',
      dataIndex: 'roles',
      render: (roles: UserRole[]) => {
        return roles.map(role => <div key={role.id}>{role.name}</div>);
      },
    },
    {
      title: 'Accounts',
      dataIndex: 'accounts',
      render: (accounts: IAccount[]) => {
        return accounts.slice(0, 3).map((account, i) => (
          <div key={account.id}>
            {account.id} | {account.name}
            {accounts.length > 3 && i === 2 ? '...' : ''}
          </div>
        ));
      },
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text, _record) => new Date(text).toLocaleDateString(),
    },
    {
      title: 'Operations',
      render: (_text, user) => {
        return (
          <div className="flex gap-2">
            <a onClick={() => openEditDialog(user)}>Edit</a>{' '}
            <Popconfirm
              className="text-red-600"
              title="Confirm delete user"
              onConfirm={() => deleteUser(user)}
            >
              <a>Delete</a>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const showUserModal = (currentUser?: any) => {
    if (currentUser) {
      showModal({
        title: 'Update User',
        content: <UpdateUserForm currentUser={currentUser} onSubmit={() => fetch()} />,
        footer: null,
      });
    } else {
      showModal({
        title: 'Create User',
        content: <CreateUserForm onSubmit={() => fetch()} />,
        footer: null,
      });
    }
  };

  function openEditDialog(user: AccountUser) {
    if (user) {
      showUserModal(user);
    }
  }

  const deleteUser = async (user: AccountUser) => {
    try {
      if (!user.id) {
        throw new Error('No user id');
      }
      await userService.deleteUser({ userId: user.id });
      message.success(`User ${user.name} deleted`);
      fetch();
    } catch (error) {
      let errorMessage = 'Unknown Error';

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      message.error(`Failed to delete user: ${errorMessage}`);
    }
  };

  const onChange = ({ current, pageSize }: TablePaginationConfig, _filters: any, sorter: any) => {
    fetch({
      page: current,
      size: pageSize,
      sort_by: sorter.field,
      sort: sorter.order === 'ascend' ? 'ASC' : 'DESC',
    });
  };

  return (
    <>
      <Card
        title="Users"
        extra={
          <Button type="primary" onClick={() => showUserModal()}>
            Create
          </Button>
        }
      >
        <Table<AccountUser>
          rowKey="id"
          columns={columns}
          dataSource={users}
          pagination={{
            defaultCurrent: pagination?.current_page ?? 1,
            showSizeChanger: true,
            pageSize: pagination?.per_page,
            total: pagination?.total,
          }}
          rowClassName={() => 'verticle-top'}
          onChange={onChange}
        />
      </Card>
    </>
  );
};

export const UserListPage: React.FC = () => {
  return (
    <DynamicModuleLoader modules={[getAccountModule()]}>
      <UserListContainer />
    </DynamicModuleLoader>
  );
};
