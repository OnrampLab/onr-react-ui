import React from 'react';
import { Avatar, Layout, Menu } from 'antd';
import { BarChart, Settings, Triangle } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

import { coreActions, CoreStore } from '@onr/core';

import DashHeader from './styles/Header';

const { SubMenu } = Menu;

type Props = {
  HeaderMainSection: React.Component;
};

export const Header: React.FC = ({ HeaderMainSection }: Props) => {
  const dispatch = useDispatch();
  const { name, mobile } = useSelector((store: CoreStore) => store.coreStore);

  return (
    <DashHeader>
      <Layout.Header>
        {mobile && (
          <a onClick={() => dispatch(coreActions.setMobileDrawer())} className="trigger">
            <BarChart size={20} strokeWidth={1} />
          </a>
        )}
        <Link href="/">
          <a className="brand">
            <Triangle size={24} strokeWidth={1} />
            <strong className="mx-1 text-black">{name}</strong>
          </a>
        </Link>

        <HeaderMainSection />

        <span className="mr-auto" />
        <Menu mode="horizontal">
          <Menu.Item onClick={() => dispatch(coreActions.setOptionDrawer())}>
            <Settings size={20} strokeWidth={1} />
          </Menu.Item>

          <SubMenu title={<Avatar src="/static/images/avatar.jpg" />}>
            <Menu.Item>Settings</Menu.Item>
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
