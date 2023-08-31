import { coreActions, CoreStore, useAuth } from '@onr/core';
import { Avatar, Layout, Menu, MenuProps } from 'antd';
import Link from 'next/link';
import { ComponentType, FC, ReactNode } from 'react';
import { FiBarChart, FiSettings, FiTriangle } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { DashHeader } from './styles';

type AvatarProps = {
  avatar?: string;
};

type LogoProps = {
  logo?: ReactNode;
};

type Props = {
  HeaderMainSection: ComponentType;
} & AvatarProps &
  LogoProps;

const UserMenu: FC<AvatarProps> = ({ avatar }) => {
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
              {user && <a onClick={signOut}>Sign Out</a>}
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

const DefaultLogo: FC = () => {
  const { name } = useSelector((store: CoreStore) => store.coreStore);
  return (
    <>
      <FiTriangle size={24} strokeWidth={1} />
      <strong className="mx-1 text-black">{name}</strong>
    </>
  );
};

export const Header: FC<Props> = ({ HeaderMainSection, avatar, logo = <DefaultLogo /> }: Props) => {
  const { mobile } = useSelector((store: CoreStore) => store.coreStore);
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
          {logo}
        </Link>

        <HeaderMainSection />

        <span className="mr-auto" />
        <UserMenu avatar={avatar} />
      </Layout.Header>
    </DashHeader>
  );
};
