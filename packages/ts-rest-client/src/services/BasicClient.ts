import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Client } from '../definitions';
import handleApiError from './handleApiError';

export class BasicClient implements Client {
  protected client: AxiosInstance;

  constructor(options?: AxiosRequestConfig) {
    this.client = axios.create(options);
  }

  static fromAxiosInstance(axiosInstance: AxiosInstance) {
    const basicClient = new this();
    basicClient.client = axiosInstance;

    basicClient.initialize();

    return basicClient;
  }

  setToken(token: string) {
    this.client.interceptors.request.use(function (config) {
      config.headers.Authorization = `Bearer ${token}`;

      console.log('Sending header: Authorization', config.headers.Authorization);

      return config;
    });
  }

  initialize() {}

  getBaseUrl() {
    return this.client.defaults.baseURL;
  }

  addResponseTramsform<T>(transformer: (response: AxiosResponse<T>) => any) {
    this.client.interceptors.response.use(transformer);
  }

  @handleApiError
  post<T>(url: string, data?: any, config?: any) {
    return this.client.post<T>(url, data, config);
  }

  @handleApiError
  patch<T>(url: string, data?: any, config?: any) {
    return this.client.patch<T>(url, data, config);
  }

  @handleApiError
  put<T>(url: string, data?: any, config?: any) {
    return this.client.put<T>(url, data, config);
  }

  @handleApiError
  get<T>(url: string, config?: any) {
    return this.client.get<T>(url, config);
  }
}
