import { coreActions, CoreStore, useAuth } from '@onr/core';
import { Avatar, Layout, Menu, Popconfirm } from 'antd';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import { FiBarChart, FiSettings, FiTriangle } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { DashHeader } from './styles';

const { SubMenu } = Menu;

type Props = {
  HeaderMainSection: ReactNode;
};

export const Header: React.FC<Props> = ({ HeaderMainSection }: Props) => {
  const dispatch = useDispatch();
  // @ts-ignore
  const { signOut } = useAuth();

  const { name, mobile } = useSelector((store: CoreStore) => store.coreStore);

  return (
    <DashHeader>
      <Layout.Header className="header">
        {mobile && (
          <a onClick={() => dispatch(coreActions.setMobileDrawer())} className="trigger">
            <FiBarChart size={20} strokeWidth={1} />
          </a>
        )}
        <Link href="/" className="brand">
          <FiTriangle size={24} strokeWidth={1} />
          <strong className="mx-1 text-black">{name}</strong>
        </Link>

        {/* @ts-ignore */}
        <HeaderMainSection />

        <span className="mr-auto" />
        <Menu mode="horizontal">
          <Menu.Item key="m1" onClick={() => dispatch(coreActions.setOptionDrawer())}>
            <FiSettings size={20} strokeWidth={1} />
          </Menu.Item>

          <SubMenu key="submenu" title={<Avatar src="/static/images/avatar.jpg" />}>
            <Menu.Item key="sub1">Profile</Menu.Item>
            <Menu.Divider />
            <Menu.Item key="sub2">
              <a href="https://one-readme.fusepx.com">Help?</a>
            </Menu.Item>
            <Menu.Item key="sub3">
              <Popconfirm
                placement="top"
                title="Are you sure you want to sign out?"
                // TODO: should use client side render to improve UX
                onConfirm={() => signOut()}
                okText="Yes"
                cancelText="Cancel"
              >
                <a>Sign Out</a>
              </Popconfirm>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Layout.Header>
    </DashHeader>
  );
};
