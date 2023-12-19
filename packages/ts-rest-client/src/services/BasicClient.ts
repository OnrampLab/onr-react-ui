import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Client } from '../definitions';
import handleApiError from './handleApiError';

export class BasicClient implements Client {
  protected axiosInstance: AxiosInstance;
  protected requestInterceptors: any[] = [];

  constructor(options?: AxiosRequestConfig) {
    this.axiosInstance = axios.create(options);
  }

  static fromAxiosInstance<T extends BasicClient>(axiosInstance: AxiosInstance) {
    const basicClient = new this();
    basicClient.axiosInstance = axiosInstance;

    basicClient.initialize();

    return basicClient as T;
  }

  setToken(token: string) {
    this.ejectInterceptors();

    this.requestInterceptors.push(
      this.axiosInstance.interceptors.request.use(function (config) {
        config.headers.Authorization = `Bearer ${token}`;

        return config;
      }),
    );
  }

  ejectInterceptors() {
    if (!this.requestInterceptors.length) {
      return;
    }

    console.log('Ejecting axios interceptors');

    this.requestInterceptors.forEach((requestInterceptor: any) => {
      this.axiosInstance.interceptors.request.eject(requestInterceptor);
    });

    this.requestInterceptors = [];
  }

  initialize() {}

  getBaseUrl() {
    return this.axiosInstance.defaults.baseURL;
  }

  addResponseTramsform<T>(transformer: (response: AxiosResponse<T>) => any) {
    this.axiosInstance.interceptors.response.use(transformer);
  }

  @handleApiError
  post<T>(url: string, data?: any, config?: any) {
    return this.axiosInstance.post<T>(url, data, config);
  }

  @handleApiError
  patch<T>(url: string, data?: any, config?: any) {
    return this.axiosInstance.patch<T>(url, data, config);
  }

  @handleApiError
  put<T>(url: string, data?: any, config?: any) {
    return this.axiosInstance.put<T>(url, data, config);
  }

  @handleApiError
  get<T>(url: string, config?: any) {
    return this.axiosInstance.get<T>(url, config);
  }

  @handleApiError
  delete<T>(url: string, config?: any) {
    return this.axiosInstance.delete<T>(url, config);
  }
}
