import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { CoreStore } from '@onr/core';
import { accountActions, IAccount } from '@onr/plugin-account';
import { Button, Form, Input, Select, Spin, Transfer } from 'antd';
import { FormProps } from 'antd/lib/form';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IUser, UserRoleName } from '../entities/interfaces/IUser';
import { UserRequestPayload } from '../services/interfaces';

interface AccountUser extends IUser {
  accounts: IAccount[];
}

interface IUserFormProps extends FormProps {
  currentUser: AccountUser;
  handleSubmit(user: UserRequestPayload): Promise<void>;
}

interface AccountStore extends CoreStore {
  accountStore: any;
}

const layout = {
  form: {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  },
  submit: {
    wrapperCol: { span: 12, offset: 6 },
  },
};

const accountsToTransferOptions = (accounts: IAccount[]) =>
  accounts.map(account => ({
    key: `${account.id}`,
    title: account.name,
  }));

export const UserForm: React.FC<IUserFormProps> = ({
  currentUser,
  handleSubmit,
}: IUserFormProps) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { accounts } = currentUser;
  const allAccounts: IAccount[] = useSelector((store: CoreStore) => store.accountStore.accounts);
  const allAccountOptions = accountsToTransferOptions(allAccounts);

  const fetchData = useCallback(() => {
    dispatch(
      accountActions.getAccounts({
        params: {},
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    fetchData();
    form?.resetFields();
  }, [fetchData, currentUser]);

  const onFinish = async (values: UserRequestPayload['data']) => {
    console.log('Received values of form: ', values);
    setLoading(true);
    const formData = values;
    Object.keys(formData).forEach(key => {
      formData[key as keyof typeof formData] || delete formData[key as keyof typeof formData];
    });
    formData.accounts = formData.accounts.map(accountId => +accountId);
    await handleSubmit({ data: formData });

    setLoading(false);
  };

  const isCreateForm = Object.keys(currentUser).length === 0;

  return (
    <Spin spinning={loading}>
      <Form
        {...layout.form}
        onFinish={async values => onFinish(values as Parameters<typeof onFinish>[0])}
        initialValues={{
          ...currentUser,
          roles: currentUser?.roles?.map(role => role.name) || [],
          accounts: accounts?.map(x => `${x.id}`) || [],
        }}
        form={form}
      >
        <Form.Item
          label="Name"
          name="name"
          hasFeedback
          rules={[{ required: true, message: 'Please input name!', type: 'string' }]}
        >
          <Input style={{ width: 300 }} />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          hasFeedback
          rules={[{ required: true, message: 'Please input email!', type: 'email' }]}
        >
          <Input style={{ width: 300 }} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          hasFeedback
          rules={[{ required: isCreateForm, message: 'Please input password!', type: 'string' }]}
        >
          <Input.Password
            style={{ width: 300 }}
            iconRender={(visible: boolean) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>

        <Form.Item
          label="Roles"
          name="roles"
          hasFeedback
          rules={[{ required: false, type: 'array' }]}
        >
          <Select mode="multiple" style={{ width: 300 }}>
            {Object.keys(UserRoleName).map((key, i) => {
              // @ts-ignore
              const roleName = UserRoleName[key];
              return (
                <Select.Option key={i.toString()} value={roleName}>
                  {roleName.replace('-', ' ')}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item
          label="Accounts"
          hasFeedback
          name="accounts"
          rules={[{ type: 'array' }]}
          valuePropName="targetKeys"
        >
          <Transfer
            listStyle={{
              width: 250,
            }}
            dataSource={allAccountOptions}
            titles={['Available Accounts', 'My Accounts']}
            render={item => item.title || ''}
          />
        </Form.Item>

        <Form.Item {...layout.submit}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};