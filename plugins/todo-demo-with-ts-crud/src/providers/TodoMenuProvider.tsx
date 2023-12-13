import { MenuItem, MenuItemsContextProvider, PageProps, useInitializeMenuItems } from '@onr/core';
import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { FiHome } from 'react-icons/fi';
import { useTodos } from '../hooks';

export const TodoMenuProvider: React.FC<PageProps> = props => {
  const { children, loadingLogo } = props;
  const menuItemsContext = useInitializeMenuItems([]);
  const [loading, setLoading] = useState(true);
  const { updateMenuItems } = menuItemsContext;
  const { todos } = useTodos();

  useEffect(() => {
    const children: MenuItem[] = todos.slice(0, 10).map(todo => ({
      name: todo.title,
      path: `/todos-custom-menu/${todo.id}`,
      login: false,
    }));

    const menuItems: MenuItem[] = [
      {
        name: 'Todo Items',
        login: false,
        icon: <FiHome strokeWidth={1} size={16} />,
        props: {
          type: 'group',
        },
        children,
      },
      {
        name: 'Demo Menu',
        login: false,
        icon: <FiHome strokeWidth={1} size={16} />,
        children: [
          {
            name: 'Sub Menu',
            login: false,
            children: [
              {
                name: 'Sub Sub Menu',
                login: false,
              },
            ],
          },
          {
            name: 'Sub Menu2',
            login: false,
            children: [
              {
                name: 'Sub Sub Menu',
                login: false,
              },
              {
                name: 'Sub Sub Menu2',
                login: false,
              },
            ],
          },
        ],
      },
      {
        name: 'Demo Menu2',
        login: false,
        icon: <FiHome strokeWidth={1} size={16} />,
        children: [
          {
            name: 'Sub Menu',
            login: false,
          },
        ],
      },
    ];

    updateMenuItems(menuItems);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [todos, updateMenuItems]);

  if (loading) {
    return <>{loadingLogo}</> ?? <Spin spinning />;
  }

  return <MenuItemsContextProvider value={menuItemsContext}>{children}</MenuItemsContextProvider>;
};
