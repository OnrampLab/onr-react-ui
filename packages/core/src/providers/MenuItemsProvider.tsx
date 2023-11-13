import { createContext, useContext, useRef, useState } from 'react';
import { MenuItem } from '../types';

type MenuItemsContextType = {
  menuItems: MenuItem[];
  updateMenuItems: (menuItems: MenuItem[]) => void;
  addMenuItem: (menuItem: MenuItem) => void;
  addSubMenuItem: (parentMenuItemName: string, menuItem: MenuItem) => void;
  clearSubMenuItems: (parentMenuItemName: string) => void;
};

const initialContext = {
  menuItems: [],
  updateMenuItems: (_menuItems: MenuItem[]) => {},
  addMenuItem: (_menuItem: MenuItem) => {},
  addSubMenuItem: (_parentMenuItemName: string, _menuItem: MenuItem) => {},
  clearSubMenuItems: (_parentMenuItemName: string) => {},
};

export const MenuItemsContext = createContext<MenuItemsContextType>(initialContext);

export const useMenuItems = () => useContext(MenuItemsContext);

export const MenuItemsContextProvider = MenuItemsContext.Provider;

export const useInitializeMenuItems = (initialMenuItems: any): MenuItemsContextType => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);

  const updateMenuItems = (menuItems: MenuItem[]) => {
    setMenuItems(menuItems);
  };

  const addMenuItem = (menuItem: MenuItem) => {
    const newMenuItems = [...menuItems, menuItem];

    setMenuItems(newMenuItems);
  };

  const addSubMenuItem = (parentMenuItemName: string, menuItem: MenuItem) => {
    const parentMenuItem = menuItems.find(menuItem => menuItem.name === parentMenuItemName);

    if (!parentMenuItem) {
      console.log(`Could not find menu item: ${parentMenuItemName}`);
      return;
    }

    const subItems = parentMenuItem.children ?? [];
    parentMenuItem.children = [...subItems, menuItem];

    const newMenuItems = [...menuItems];

    setMenuItems(newMenuItems);
  };

  const clearSubMenuItems = (parentMenuItemName: string) => {
    const parentMenuItem = menuItems.find(menuItem => menuItem.name === parentMenuItemName);

    if (!parentMenuItem) {
      console.log(`Could not find menu item: ${parentMenuItemName}`);
      return;
    }

    parentMenuItem.children = [];

    const newMenuItems = [...menuItems];

    setMenuItems(newMenuItems);
  };

  const updateMenuItemsRef = useRef(updateMenuItems);
  const addMenuItemRef = useRef(addMenuItem);
  const addSubMenuItemRef = useRef(addSubMenuItem);
  const clearSubMenuItemsRef = useRef(clearSubMenuItems);

  return {
    menuItems,
    updateMenuItems: updateMenuItemsRef.current,
    addMenuItem: addMenuItemRef.current,
    addSubMenuItem: addSubMenuItemRef.current,
    clearSubMenuItems: clearSubMenuItemsRef.current,
  };
};
