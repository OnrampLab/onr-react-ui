import { App } from '@onr/core';
import { useCallback, useEffect, useState } from 'react';
import { AccountUser } from '../entities/interfaces/AccountUser';
import { UserService } from '../services';

interface Parameters {}

export const useUsers = (params?: Parameters) => {
  const userService = App.getInstance().getService('userService') as UserService;
  const [users, setUsers] = useState<AccountUser[]>();
  const fetch = useCallback(() => {
    userService.list(params).then(setUsers);
  }, [userService, params]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    users,
    fetch,
  };
};
