import { AxiosResponse } from 'axios';
import { Client } from './Client';

export interface Resourceable extends Client {
  create(requestData: any): Promise<AxiosResponse>;
  update(id: number, requestData: any): Promise<AxiosResponse>;
  list(params: any): Promise<AxiosResponse>;
  find(id: number): Promise<AxiosResponse>;
  delete(id: number): Promise<AxiosResponse>;
}
