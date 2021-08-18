export function createApiClient(axiosInstance: any, Service: any) {
  const service = Service.fromAxiosInstance(axiosInstance);

  return service;
}
