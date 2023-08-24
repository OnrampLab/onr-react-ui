import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Resourceable } from '../definitions';
import handleApiError from './handleApiError';

export class ResourceClient implements Resourceable {
  protected resourceName: string;
  protected axiosInstance: AxiosInstance;

  constructor(resourceName: string, options?: AxiosRequestConfig) {
    this.axiosInstance = axios.create(options);

    this.resourceName = resourceName;
  }

  static fromAxiosInstanceAndName(axiosInstance: AxiosInstance, resourceName: string) {
    const resourceClient = new this(resourceName);
    resourceClient.axiosInstance = axiosInstance;

    return resourceClient;
  }

  @handleApiError
  async create(requestData: any) {
    const response = await this.axiosInstance.request({
      url: `/${this.resourceName}`,
      method: 'POST',
      data: requestData,
    });

    return response;
  }

  @handleApiError
  async update(id: number, requestData: any) {
    const response = await this.axiosInstance.request({
      url: `/${this.resourceName}/${id}`,
      method: 'PATCH',
      data: requestData,
    });

    return response;
  }

  @handleApiError
  async list(params?: any) {
    const response = await this.axiosInstance.request({
      url: `/${this.resourceName}`,
      params,
    });

    return response;
  }

  @handleApiError
  async find(id: number) {
    const response = await this.axiosInstance.request({
      url: `/${this.resourceName}/${id}`,
    });

    return response;
  }

  @handleApiError
  async delete(id: number) {
    return await this.axiosInstance.request<void>({
      method: 'DELETE',
      url: `/${this.resourceName}/${id}`,
    });
  }
}
