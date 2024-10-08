import { Button, Checkbox, Form, FormRule, Input, message, Row } from 'antd';
import { NextPageContext } from 'next';
// TODO: Should wrap next-auth in @onr/core to avoid expose implementation details
import { getCsrfToken, getSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { FiEye, FiMail, FiTriangle } from 'react-icons/fi';
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

const EMAIL_RULES: FormRule[] = [
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

export const Signin: React.FC<Props> = ({ csrfToken }) => {
  const router = useRouter();

  async function onFinish({ email, password }: any) {
    try {
      const result = await signIn('credentials', {
        email: email,
        password: password,
        redirect: false,
        callbackUrl: (router.query.callbackUrl as string) ?? '/',
      });

      if (!result) {
        throw new Error('Unknown Error: signIn result is null');
      }

      const { error, ok, url } = result;

      if (ok && url) {
        window.location.href = url;
        return;
      }

      if (error) {
        throw new Error('Incorrect email or password');
      }
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message);
      }
    }
  }

  return (
    <Row
      align="middle"
      justify="center"
      className="flex px-3 bg-white mh-page"
      style={{ minHeight: '100dvh' }}
    >
      <Content>
        <div className="mb-5 text-center">
          <Link href="/signin" className="mr-0 brand">
            <FiTriangle size={32} strokeWidth={1} />
          </Link>
          <h5 className="mt-3 mb-0">Sign in</h5>

          <p style={{ color: 'rgb(131, 118, 118)', backgroundColor: '#fff' }}>
            get started with our service
          </p>
        </div>

        <Form
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={err => {
            message.error(err.errorFields[0].errors);
          }}
          initialValues={INIT_VALUES}
          method="post"
        >
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <FormItem label="Email" name="email" rules={EMAIL_RULES}>
            <Input
              prefix={<FiMail size={16} strokeWidth={1} style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="email"
              placeholder="Email"
            />
          </FormItem>

          <FormItem label="Password" name="password" rules={PASSWORD_RULES}>
            <Input
              prefix={<FiEye size={16} strokeWidth={1} style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          </FormItem>

          <FormItem>
            <FormItem name="remember" noStyle valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </FormItem>
            <Link href="/forgot" className="text-xs-right">
              <small>Forgot password</small>
            </Link>
            <Button type="primary" htmlType="submit" block className="mt-3">
              Log in
            </Button>
          </FormItem>

          <div className="text-center">
            <small className="text-muted">
              <span>{`Don't have an account yet?`}</span>{' '}
              <Link href="/signup">&nbsp;Create one now!</Link>
            </small>
          </div>
        </Form>
      </Content>
    </Row>
  );
};

export async function getSigninServerSideProps(context: NextPageContext) {
  const { callbackUrl } = context.query;
  const session = await getSession(context);

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
