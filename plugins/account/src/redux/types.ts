import { Pagination } from '@onr/core';
import { IAccount } from '../entities';

export type StoreProps = {
  accountStore: {
    accounts: IAccount[];
    pagination: Pagination;
  };
};
