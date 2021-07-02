import { IAccount } from '../entities';

export type StoreProps = {
  accountStore: {
    accounts: IAccount[];
  };
};
