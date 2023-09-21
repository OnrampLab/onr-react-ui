import { AxiosResponse } from 'axios';
import stringify from 'qs-stringify';
import { BasicClient } from './BasicClient';
import { removeEmptyKeys } from './removeEmptyKeys';

export class Resource {
  protected endpoint: string = '';

  constructor(protected client: BasicClient) {}

  static createByResourceName(client: BasicClient, resourceName: string) {
    const resource = new Resource(client);

    resource.endpoint = `${resourceName}s`;

    return resource;
  }

  async create(payload: any): Promise<AxiosResponse> {
    const response = await this.client.post<any>(`${this.endpoint}`, payload);

    return response;
  }

  async update(id: number, payload: any): Promise<AxiosResponse> {
    const response = await this.client.patch<any>(`${this.endpoint}/${id}`, payload);

    return response;
  }

  async find(id: number): Promise<AxiosResponse> {
    const response = await this.client.get<any>(`${this.endpoint}/${id}`);

    return response;
  }

  async delete(id: number): Promise<AxiosResponse> {
    const response = await this.client.delete<any>(`${this.endpoint}/${id}`);

    return response;
  }

  async list(params?: any): Promise<AxiosResponse> {
    params = removeEmptyKeys(params);
    const paramsString = stringify(params);
    const url =
      params && Object.keys(params).length ? `${this.endpoint}?${paramsString}` : this.endpoint;

    const response = await this.client.get<any>(url);

    return response;
  }
}
