import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { BasicClient } from '.';
import { Resource } from '../definitions';

export class ResourceClient<T> extends BasicClient implements Resource<T> {
  protected resourceName: string;

  constructor(resourceName: string, options?: AxiosRequestConfig) {
    super(options);

    this.resourceName = resourceName;
  }

  static fromAxiosInstanceAndName(axiosInstance: AxiosInstance, resourceName: string) {
    const resourceClient = new this(resourceName);
    resourceClient.client = axiosInstance;

    resourceClient.initialize();

    return resourceClient;
  }

  setToken(token: string) {
    this.client.interceptors.request.use(function (config) {
      config.headers.Authorization = `Bearer ${token}`;

      return config;
    });
  }

  async create(requestData: T) {
    const response = await this.client.request<T>({
      url: `/${this.resourceName}`,
      method: 'POST',
      data: requestData,
    });

    return response.data;
  }

  async update(id: number, requestData: T) {
    const response = await this.client.request<T>({
      url: `/${this.resourceName}/${id}`,
      method: 'PATCH',
      data: requestData,
    });

    return response.data;
  }

  async list(params?: any) {
    const response = await this.client.request<T[]>({
      url: `/${this.resourceName}`,
      params,
    });

    return response.data;
  }

  async find(id: number) {
    const response = await this.client.request<T>({
      url: `/${this.resourceName}/${id}`,
    });

    return response.data;
  }

  async delete(id: number) {
    await this.client.request<void>({
      method: 'DELETE',
      url: `/${this.resourceName}/${id}`,
    });
  }
}
