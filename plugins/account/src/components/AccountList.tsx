import { DefaultPubSubContext } from '@onr/core';
import { Button, Card, message, Modal, Popconfirm, Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import React, { useContext, useState } from 'react';
import { AccountService, IAccount } from '..';
import { CreateAccountForm } from './CreateAccountForm';
import { UpdateAccountForm } from './UpdateAccountForm';

interface IAccountListProps {
  accounts: IAccount[];
}

export const AccountList: React.FC<IAccountListProps> = ({ accounts }: IAccountListProps) => {
  const [currentAccount, setCurrentAccount] = useState<IAccount>(accounts[0]);
  const [createAccountModalVisible, setCreateAccountModalVisible] = useState(false);
  const [updateAccountModalVisible, setUpdateAccountModalVisible] = useState(false);
  // @ts-ignore
  const { publish } = useContext(DefaultPubSubContext);

  const openCreateDialog = () => {
    setCreateAccountModalVisible(true);
  };

  const openEditDialog = (account: IAccount) => {
    setCurrentAccount(account);
    setUpdateAccountModalVisible(true);
  };

  const deleteAccount = async (account: IAccount) => {
    try {
      if (!account.id) {
        throw new Error('No account id');
      }
      await AccountService.deleteAccount({ accountId: account.id });
      message.success(`Account ${account.name} deleted`);
      publish('account.updated');
    } catch (e) {
      message.error(`Failed to delete account${e.message && `: ${e.message}`}`);
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
      // eslint-disable-next-line react/display-name
      render: (_text, account) => {
        return (
          <span className="operations">
            <a onClick={() => openEditDialog(account)}>Edit</a>
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
          <Button type="primary" onClick={() => openCreateDialog()}>
            Create Account
          </Button>
        }
      >
        <Table<IAccount> rowKey="id" columns={columns} dataSource={accounts} pagination={false} />
      </Card>

      {createAccountModalVisible && (
        <Modal
          title="Create Account"
          visible={createAccountModalVisible}
          width={600}
          onCancel={() => setCreateAccountModalVisible(false)}
          footer={null}
        >
          <CreateAccountForm
            onSubmit={() => {
              publish('account.updated');
              setCreateAccountModalVisible(false);
            }}
          />
        </Modal>
      )}

      {updateAccountModalVisible && (
        <Modal
          title="Update Account"
          width={800}
          visible={updateAccountModalVisible}
          onCancel={() => setUpdateAccountModalVisible(false)}
          footer={null}
        >
          <UpdateAccountForm
            currentAccount={currentAccount}
            onSubmit={() => {
              publish('account.updated');
              setUpdateAccountModalVisible(false);
            }}
          />
        </Modal>
      )}
    </>
  );
};
