import { BasicClient } from './BasicClient';

export class Resource<T> {
  protected endpoint: string = '';

  constructor(protected client: BasicClient) {}

  static createByResourceName<T>(client: BasicClient, resourceName: string) {
    const resource = new Resource<T>(client);

    resource.endpoint = `${resourceName}s`;

    return resource;
  }

  async create(payload: any): Promise<T> {
    const response = await this.client.post<any>(`${this.endpoint}`, payload);

    return response.data;
  }

  async update(id: number, payload: any): Promise<T> {
    const response = await this.client.patch<any>(`${this.endpoint}/${id}`, payload);

    return response.data;
  }

  async find(id: number): Promise<T> {
    const response = await this.client.get<any>(`${this.endpoint}/${id}`);

    return response.data;
  }

  async delete(id: number): Promise<T> {
    const response = await this.client.delete<any>(`${this.endpoint}/${id}`);

    return response.data;
  }

  async list(params?: any): Promise<T[]> {
    const response = await this.client.get<any>(`${this.endpoint}`, params);

    return response.data;
  }
}
