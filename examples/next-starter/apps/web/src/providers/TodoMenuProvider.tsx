import { MenuItem, MenuItemsContextProvider, useInitializeMenuItems } from '@onr/core';
import { useTodos } from '@onr/plugin-todo-demo-with-ts-rest-client';
import { Spin } from 'antd';
import React, { useEffect } from 'react';
import { FiHome } from 'react-icons/fi';

export const TodoMenuProvider: React.FC<any> = ({ children }) => {
  const menuItemsContext = useInitializeMenuItems([]);
  const { updateMenuItems } = menuItemsContext;
  const { loading, todos } = useTodos();

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
  }, [todos, updateMenuItems]);

  if (loading) {
    return <Spin spinning />;
  }

  return <MenuItemsContextProvider value={menuItemsContext}>{children}</MenuItemsContextProvider>;
};
