import { Client } from './Client';

export interface Resourceable<T> extends Client {
  create(requestData: T): Promise<T>;
  update(id: number, requestData: T): Promise<T>;
  list(params: any): Promise<T[]>;
  find(id: number): Promise<T>;
  delete(id: number): Promise<void>;
}
