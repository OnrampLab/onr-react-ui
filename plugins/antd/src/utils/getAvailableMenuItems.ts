import { AuthUser, MenuItem } from '@onr/core';

export const getAvailableMenuItems = (menuItems: MenuItem[], currentUser?: AuthUser) => {
  return menuItems.filter(route => {
    if (!route.login) {
      return true;
    }

    if (!currentUser) {
      return false;
    }

    if (!route.roles) {
      return true;
    }

    for (const role of route.roles) {
      if (currentUser.roles?.map(x => x.name).indexOf(role) !== -1) {
        return true;
      }
    }

    return false;
  });
};
