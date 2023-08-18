import { App } from '@onr/core';
import { getAccountModule, IAccount } from '@onr/plugin-account';
import { Button, Card, message, Modal, Popconfirm, Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import React, { useState } from 'react';
import { DynamicModuleLoader } from 'redux-dynamic-modules-react';
import { CreateUserForm } from '../components/CreateUserForm';
import { UpdateUserForm } from '../components/UpdateUserForm';
import { AccountUser } from '../entities/interfaces/AccountUser';
import { UserRole } from '../entities/interfaces/IUser';
import { useUsers } from '../hooks/useUsers';
import { UserService } from '../services/UserService';

const UserListContainer: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<AccountUser | null>(null);
  const [createUserModalVisible, setCreateUserModalVisible] = useState(false);
  const [updateUserModalVisible, setUpdateUserModalVisible] = useState(false);

  const userService = App.getInstance().getService('userService') as UserService;

  const { users, fetch } = useUsers();

  const columns: ColumnProps<AccountUser>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
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
      title: 'Operations',
      render: (_text, user) => {
        return (
          <>
            <span className="operations">
              <a onClick={() => openEditDialog(user)}>Edit</a>{' '}
              <Popconfirm title="Confirm delete user" onConfirm={() => deleteUser(user)}>
                <a>Delete</a>
              </Popconfirm>
            </span>
          </>
        );
      },
    },
  ];

  function openCreateDialog() {
    setCreateUserModalVisible(true);
  }

  function openEditDialog(user: AccountUser) {
    if (user) {
      setCurrentUser(user);
      setUpdateUserModalVisible(true);
    }
  }

  const onCreateUserFormSubmit = () => {
    setCreateUserModalVisible(false);
    fetch();
  };

  const onUpdateUserFormSubmit = () => {
    setUpdateUserModalVisible(false);
    fetch();
  };

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

  return (
    <>
      <Card
        title="Users"
        extra={
          <Button type="primary" onClick={() => openCreateDialog()}>
            Create
          </Button>
        }
      >
        <Table<AccountUser>
          rowKey="id"
          columns={columns}
          dataSource={users}
          pagination={false}
          rowClassName={() => 'verticle-top'}
        />
      </Card>

      <Modal
        title="Create User"
        visible={createUserModalVisible}
        width={800}
        onCancel={() => setCreateUserModalVisible(false)}
        footer={null}
      >
        <CreateUserForm onSubmit={() => onCreateUserFormSubmit()} />
      </Modal>

      <Modal
        title="Update User"
        width={800}
        visible={updateUserModalVisible}
        onCancel={() => setUpdateUserModalVisible(false)}
        footer={null}
      >
        {currentUser && (
          <UpdateUserForm currentUser={currentUser} onSubmit={() => onUpdateUserFormSubmit()} />
        )}
      </Modal>
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
