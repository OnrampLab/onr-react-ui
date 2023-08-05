import { MenuItem } from '@onr/core';
import React from 'react';
import { FiHome, FiServer } from 'react-icons/fi';
import { UserRoleName } from './roles';

export const menuItems: MenuItem[] = [
  {
    path: '/todos',
    name: 'TODO List',
    login: false,
    icon: <FiHome strokeWidth={1} size={16} />,
  },
  {
    path: '/admin',
    name: 'Dashboard',
    login: true,
    icon: <FiHome strokeWidth={1} size={16} />,
  },
  {
    name: 'Admin',
    icon: <FiServer strokeWidth={1} size={16} />,
    login: true,
    roles: [UserRoleName.SystemAdmin],
    children: [
      {
        path: '/admin/accounts',
        name: 'Accounts',
        login: true,
      },
      {
        path: '/admin/users',
        name: 'Users',
        login: true,
      },
    ],
  },
];
