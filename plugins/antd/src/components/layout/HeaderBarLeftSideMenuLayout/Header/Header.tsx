import { coreActions, CoreStore, Logo, useAuth } from '@onr/core';
import { Avatar, Layout, Menu, MenuProps } from 'antd';
import Link from 'next/link';
import { ComponentType, FC, ReactNode } from 'react';
import { FiBarChart } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { DashHeader } from './styles';

interface AvatarProps {
  avatar?: string;
}

interface LogoProps {
  logo?: ReactNode;
}

interface Props extends AvatarProps, LogoProps {
  HeaderMainSection?: ComponentType;
}

const UserMenu: FC<AvatarProps> = ({ avatar }) => {
  const dispatch = useDispatch();
  const { user, signOut, signIn } = useAuth();

  const items: MenuProps['items'] = [
    {
      key: 'submenu',
      icon: <Avatar src={avatar ?? '/static/images/avatar.jpg'} />,
      children: [
        {
          key: 'settings',
          label: 'Settings',
          onClick: () => dispatch(coreActions.setOptionDrawer()),
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

export const Header: FC<Props> = props => {
  const { HeaderMainSection, avatar, logo } = props;
  const { mobile } = useSelector((store: CoreStore) => store.coreStore);
  const dispatch = useDispatch();

  return (
    <DashHeader>
      <Layout.Header className="header">
        {mobile && (
          <div className="flex-none">
            <div onClick={() => dispatch(coreActions.setMobileDrawer())} className="trigger">
              <FiBarChart size={20} strokeWidth={1} />
            </div>
          </div>
        )}

        {logo && (
          <div className="flex-none">
            <Logo mobile={mobile}>
              <Link href="/">{logo}</Link>
            </Logo>
          </div>
        )}

        <div className="flex-grow">{HeaderMainSection && <HeaderMainSection />}</div>

        <div className="flex-none">
          <UserMenu avatar={avatar} />
        </div>
      </Layout.Header>
    </DashHeader>
  );
};
