import { Button, Checkbox, Form, Input, message as Message, Row } from 'antd';
import { NextPageContext } from 'next';
import { getCsrfToken, getSession } from 'next-auth/client';
import Link from 'next/link';
import React from 'react';
import { Eye, Mail, Triangle } from 'react-feather';
import styled from 'styled-components';

const FormItem = Form.Item;

const Content = styled.div`
  max-width: 400px;
  z-index: 2;
  min-width: 300px;
`;

const INIT_VALUES = {
  email: '',
  password: '',
  remember: true,
};

const EMAIL_RULES = [
  {
    type: 'email',
    message: 'The input is not valid E-mail!',
  },
  {
    required: true,
    message: 'Please input your E-mail!',
  },
];

const PASSWORD_RULES = [{ required: true, message: 'Please input your Password!' }];

interface Props {
  csrfToken: string;
}

const Signin: React.FC<Props> = ({ csrfToken }) => {
  async function onFinish() {
    try {
      document.querySelector('form')?.submit();
    } catch (error) {
      Message.error(error.message);
    }
  }

  return (
    <Row
      align="middle"
      justify="center"
      className="px-3 bg-white mh-page flex"
      style={{ minHeight: '100vh' }}
    >
      <Content>
        <div className="text-center mb-5">
          <Link href="/signin">
            <a className="brand mr-0">
              <Triangle size={32} strokeWidth={1} />
            </a>
          </Link>
          <h5 className="mb-0 mt-3">Sign in</h5>

          <p style={{ color: 'rgb(131, 118, 118)', backgroundColor: '#fff' }}>
            get started with our service
          </p>
        </div>

        <Form
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={err => {
            Message.error(err);
          }}
          initialValues={INIT_VALUES}
          method="post"
          action="/api/auth/callback/credentials"
        >
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          {/* @ts-ignore  */}
          <FormItem label="Email" name="email" rules={EMAIL_RULES}>
            <Input
              prefix={<Mail size={16} strokeWidth={1} style={{ color: 'rgba(0,0,0,.25)' }} />}
              name="email"
              type="email"
              placeholder="Email"
            />
          </FormItem>

          <FormItem label="Password" name="password" rules={PASSWORD_RULES}>
            <Input
              prefix={<Eye size={16} strokeWidth={1} style={{ color: 'rgba(0,0,0,.25)' }} />}
              name="password"
              type="password"
              placeholder="Password"
            />
          </FormItem>

          <FormItem>
            <FormItem name="remember" noStyle valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </FormItem>
            <Link href="/forgot">
              <a className="text-xs-right">
                <small>Forgot password</small>
              </a>
            </Link>
            <Button type="primary" htmlType="submit" block className="mt-3">
              Log in
            </Button>
          </FormItem>

          <div className="text-center">
            <small className="text-muted">
              <span>{`Don't have an account yet?`}</span>{' '}
              <Link href="/signup">
                <a>&nbsp;Create one now!</a>
              </Link>
            </small>
          </div>
        </Form>
      </Content>
    </Row>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  // @ts-ignore
  const { callbackUrl }: string = context.query;
  const session = await getSession(context);

  // @ts-ignore
  if (session && Date.now() < new Date(session.expires).getTime()) {
    return {
      redirect: {
        destination: callbackUrl || '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

export { Signin };
