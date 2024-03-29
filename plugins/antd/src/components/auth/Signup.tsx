import { Button, Form, Input, message as Message, Row, Tooltip } from 'antd';
import Link from 'next/link';
import Router from 'next/router';
import { FiEye, FiHelpCircle, FiMail, FiTriangle, FiUser } from 'react-icons/fi';
import styled from 'styled-components';

const FormItem = Form.Item;

const Content = styled.div`
  max-width: 400px;
  z-index: 2;
  min-width: 300px;
`;

const Signup = () => (
  <Row
    align="middle"
    justify="center"
    className="px-3 bg-white flex"
    style={{ minHeight: '100dvh' }}
  >
    <Content>
      <div className="text-center mb-5">
        <Link href="/signup" className="brand mr-0">
          <FiTriangle size={32} strokeWidth={1} />
        </Link>
        <h5 className="mb-0 mt-3">Sign up</h5>

        <p className="text-muted">create a new account</p>
      </div>

      <Form
        layout="vertical"
        onFinish={() => {
          Message.success('Account created. Please check your inbox!').then(
            async () => Router.push('/signin'),
            () => {},
          );
        }}
        onFinishFailed={err => {
          Message.error(
            err instanceof Error
              ? err.message
              : typeof err === 'object'
              ? JSON.stringify(err)
              : err,
          );
        }}
      >
        <FormItem
          label={
            <span>
              Nickname&nbsp;
              <Tooltip title="What do you want others to call you?">
                <FiHelpCircle size={16} strokeWidth={1} />
              </Tooltip>
            </span>
          }
          name="nickname"
          rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
        >
          <Input
            prefix={<FiUser size={16} strokeWidth={1} style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Nickname"
          />
        </FormItem>

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

        <FormItem
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<FiEye size={16} strokeWidth={1} style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
          />
        </FormItem>

        <FormItem
          label="Confirm password"
          name="confirm"
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            form => ({
              validator: (_, value, callback) => {
                if (value && value !== form.getFieldValue('password')) {
                  callback("Passwords don't match!");
                } else {
                  callback();
                }
              },
            }),
          ]}
        >
          <Input
            prefix={<FiEye size={16} strokeWidth={1} style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Confirm password"
          />
        </FormItem>

        <FormItem>
          <Button type="primary" htmlType="submit" block>
            Sign up
          </Button>
        </FormItem>

        <div className="text-center">
          <small className="text-muted">
            <span>Already have an account?</span> <Link href="/signin">&nbsp;Login Now!</Link>
          </small>
        </div>
      </Form>
    </Content>
  </Row>
);

export { Signup };
