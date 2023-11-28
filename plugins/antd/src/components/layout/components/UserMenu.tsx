import { coreActions, useAuth } from '@onr/core';
import { Avatar, Menu, MenuProps } from 'antd';
import { useDispatch } from 'react-redux';

interface Props {
  avatar?: string;
}

export const UserMenu: React.FC<Props> = ({ avatar }) => {
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
