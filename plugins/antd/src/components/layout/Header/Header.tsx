import { coreActions, CoreStore, useAuth } from '@onr/core';
import { Avatar, Layout, Menu, MenuProps, Popconfirm } from 'antd';
import Link from 'next/link';
import React, { ComponentType } from 'react';
import { FiBarChart, FiSettings, FiTriangle } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { DashHeader } from './styles';

type AvatarProps = {
  avatar?: string;
};

type LogoProps = {
  logo?: string;
};

type Props = {
  HeaderMainSection: ComponentType;
} & AvatarProps &
  LogoProps;

const UserMenu: React.FC<AvatarProps> = ({ avatar }) => {
  const dispatch = useDispatch();
  const { user, signOut, signIn } = useAuth();

  const items: MenuProps['items'] = [
    {
      key: 'submenu',
      icon: <Avatar src={avatar ?? '/static/images/avatar.jpg'} />,
      children: [
        {
          key: 'setting',
          onClick: () => dispatch(coreActions.setOptionDrawer()),
          icon: <FiSettings size={20} strokeWidth={1} />,
        },
        {
          label: 'Profile',
          key: 'profile',
        },
        {
          type: 'divider',
        },
        {
          label: (
            <>
              {user && (
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
              )}
              {!user && <a onClick={() => signIn()}>Sign In</a>}
            </>
          ),
          key: 'auth',
        },
      ],
    },
  ];

  return <Menu mode="horizontal" items={items} />;
};

export const Header: React.FC<Props> = ({ HeaderMainSection, avatar, logo }: Props) => {
  const { name, mobile } = useSelector((store: CoreStore) => store.coreStore);
  const dispatch = useDispatch();

  return (
    <DashHeader>
      <Layout.Header className="header">
        {mobile && (
          <a onClick={() => dispatch(coreActions.setMobileDrawer())} className="trigger">
            <FiBarChart size={20} strokeWidth={1} />
          </a>
        )}
        <Link href="/" className="brand">
          {logo && <img src={logo} style={{ height: 24 }} />}
          {!logo && <FiTriangle size={24} strokeWidth={1} />}
          <strong className="mx-1 text-black">{name}</strong>
        </Link>

        <HeaderMainSection />

        <span className="mr-auto" />
        <UserMenu avatar={avatar} />
      </Layout.Header>
    </DashHeader>
  );
};
