import { coreActions, CoreStore } from '@onr/core';
import { Avatar, Layout, Menu } from 'antd';
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
  const { name, mobile } = useSelector((store: CoreStore) => store.coreStore);

  return (
    <DashHeader>
      <Layout.Header>
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
          <Menu.Item onClick={() => dispatch(coreActions.setOptionDrawer())}>
            <FiSettings size={20} strokeWidth={1} />
          </Menu.Item>

          <SubMenu title={<Avatar src="/static/images/avatar.jpg" />}>
            <Menu.Item>FiSettings</Menu.Item>
            <Menu.Item>Profile</Menu.Item>
            <Menu.Divider />
            <Menu.Item>
              <a href="https://one-readme.fusepx.com">Help?</a>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Layout.Header>
    </DashHeader>
  );
};
