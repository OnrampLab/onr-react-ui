import { Button, Form, Input, message as Message, Row } from 'antd';
import Link from 'next/link';
import Router from 'next/router';
import React from 'react';
import { FiMail, FiTriangle } from 'react-icons/fi';
import styled from 'styled-components';

const FormItem = Form.Item;

const Content = styled.div`
  max-width: 400px;
  z-index: 2;
  min-width: 300px;
`;

export const Forgot: React.FC = () => {
  async function onFinish(value: { email: string }) {
    console.dir(value);
    await Message.success('Reset email sent. Please check your inbox.');
    Router.push('/signin');
  }
  return (
    <Row
      align="middle"
      justify="center"
      className="px-3 bg-white flex"
      style={{ minHeight: '100dvh' }}
    >
      <Content>
        <div className="text-center mb-5">
          <Link href="/forgot" className="brand mr-0">
            <FiTriangle size={32} strokeWidth={1} />
          </Link>
          <h5 className="mb-0 mt-3">Recover your password</h5>

          <p className="text-muted">receive password reset instructions.</p>
        </div>

        <Form
          layout="vertical"
          onFinish={e => {
            onFinish(e as { email: string });
          }}
          onFinishFailed={err => console.error(err)}
        >
          <FormItem
            label="Email"
            name="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input
              prefix={<FiMail size={16} strokeWidth={1} style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="email"
              placeholder="Email"
            />
          </FormItem>

          <FormItem>
            <Button type="primary" htmlType="submit" block>
              Reset password
            </Button>
          </FormItem>

          <div className="text-center">
            <small className="text-muted text-center">
              <span>{`Don't have an account yet?`}</span>
              <Link href="/signup">&nbsp;Create one now!</Link>
            </small>
          </div>
        </Form>
      </Content>
    </Row>
  );
};
