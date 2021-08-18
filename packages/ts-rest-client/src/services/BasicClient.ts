import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Client } from '../definitions';

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

      return config;
    });
  }

  initialize() {}

  addResponseTramsform<T>(transformer: (response: AxiosResponse<T>) => any) {
    this.client.interceptors.response.use(transformer);
  }

  post<T>(url: string, data?: any, config?: any) {
    return this.client.post<T>(url, data, config);
  }

  patch<T>(url: string, data?: any, config?: any) {
    return this.client.patch<T>(url, data, config);
  }

  put<T>(url: string, data?: any, config?: any) {
    return this.client.put<T>(url, data, config);
  }

  get<T>(url: string, config?: any) {
    return this.client.get<T>(url, config);
  }
}
