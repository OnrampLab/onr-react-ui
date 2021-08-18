import { AxiosInstance } from 'axios';

export class AxiosHelper {
  static setToken(axiosInstance: AxiosInstance, token: string) {
    axiosInstance.interceptors.request.use(function (config) {
      config.headers.Authorization = `Bearer ${token}`;

      return config;
    });
  }
}
