import { App, Pagination } from '@onr/core';
import { useCallback, useEffect, useState } from 'react';
import { AccountUser } from '../entities/interfaces/AccountUser';
import { UserService } from '../services';

interface Parameters {}

export const useUsers = (params?: Parameters) => {
  const userService = App.getInstance().getService<UserService>('userService');
  const [users, setUsers] = useState<AccountUser[]>();
  const [pagination, setPagination] = useState<Pagination>();

  const fetch = useCallback(
    async (payload?: any) => {
      const usersCollection = await userService.getUsers({ params: { ...params, ...payload } });
      setUsers(usersCollection.data);
      setPagination(usersCollection.meta);
    },
    [userService, params],
  );

  useEffect(() => {
    fetch({
      page: 1,
      size: 10,
    });
  }, [fetch]);

  return {
    users,
    pagination,
    fetch,
  };
};
