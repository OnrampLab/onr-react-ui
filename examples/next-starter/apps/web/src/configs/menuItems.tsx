import { ReactElement } from 'react';
import { FiHome, FiServer } from 'react-icons/fi';
import { UserRoleName } from './roles';

export interface MenuItem {
  name: string;
  path?: string;
  icon?: ReactElement;
  children?: MenuItem[];
  roles?: UserRoleName[];
}

export const menuItems: MenuItem[] = [
  {
    path: '/admin',
    name: 'Dashboard',
    icon: <FiHome strokeWidth={1} size={16} />,
  },
  {
    name: 'Admin',
    icon: <FiServer strokeWidth={1} size={16} />,
    roles: [UserRoleName.SystemAdmin],
    children: [
      {
        path: '/admin/accounts',
        name: 'Accounts',
      },
      {
        path: '/admin/users',
        name: 'Users',
      },
    ],
  },
];
