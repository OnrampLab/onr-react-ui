import { IAccount } from '@onr/plugin-account';
import { Button, Card, message, Modal, Popconfirm, Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import { CreateUserForm } from '../components/CreateUserForm';
import { UpdateUserForm } from '../components/UpdateUserForm';
import { IUser, UserRole } from '../entities/interfaces/IUser';
import { UserService } from '../services/UserService';

export const UserListPage: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  // @ts-ignore
  const [currentUser, setCurrentUser] = useState<IUser>({});
  const [createUserModalVisible, setCreateUserModalVisible] = useState(false);
  const [updateUserModalVisible, setUpdateUserModalVisible] = useState(false);

  useEffect(() => {
    fetchUserListData();
  }, []);

  const columns: ColumnProps<IUser>[] = [
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
      // eslint-disable-next-line react/display-name
      render: (_text, user) => {
        return (
          <>
            <span className="operations">
              <a onClick={() => openEditDialog(user)}>Edit</a>
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

  function openEditDialog(user: IUser) {
    if (user) {
      setCurrentUser(user);
      setUpdateUserModalVisible(true);
    }
  }

  async function fetchUserListData() {
    const users = await UserService.getUsers({});
    setUsers(users);
  }

  const onCreateUserFormSubmit = () => {
    setCreateUserModalVisible(false);
    fetchUserListData();
  };

  const onUpdateUserFormSubmit = () => {
    setUpdateUserModalVisible(false);
    fetchUserListData();
  };

  const deleteUser = async (user: IUser) => {
    try {
      if (!user.id) {
        throw new Error('No user id');
      }
      await UserService.deleteUser({ userId: user.id });
      message.success(`User ${user.name} deleted`);
      fetchUserListData();
    } catch (e) {
      message.error(`Failed to delete user${e.message && `: ${e.message}`}`);
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
        <Table<IUser>
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
        <UpdateUserForm currentUser={currentUser} onSubmit={() => onUpdateUserFormSubmit()} />
      </Modal>
    </>
  );
};
