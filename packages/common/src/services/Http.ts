import Axios, { AxiosError, AxiosResponse } from 'axios';
import getConfig from 'next/config';
import { stringify } from 'qs';

declare type RequestMethods =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH';

type Data = any;
type EmptyObject = Record<string, never>;

type PayloadParams = {
  params?: Data;
};
interface PayloadData extends PayloadParams {
  data?: Data;
}

interface RequestPayload extends PayloadData {
  method: RequestMethods;
  url: string;
}

interface ResponsePayload<T> {
  data: T;
  message?: string;
}

interface Http {
  baseUrl: string | null;
  apiToken: string | null;
  setBaseUrl: (ur: string) => void;
  setToken: (token: string) => void;
  request: <T, K = EmptyObject>(payload: RequestPayload) => Promise<ResponsePayload<T> & K>;
  //TODO: should use axios's instance methods' params list instead
  get: <T, K = EmptyObject>(
    url: string,
    payload?: PayloadParams,
  ) => Promise<ResponsePayload<T> & K>;
  post: <T, K = EmptyObject>(url: string, payload?: PayloadData) => Promise<ResponsePayload<T> & K>;
  patch: <T, K = EmptyObject>(url: string, payload: PayloadData) => Promise<ResponsePayload<T> & K>;
  put: <T, K = EmptyObject>(url: string, payload: PayloadData) => Promise<ResponsePayload<T> & K>;
  delete: <T, K = EmptyObject>(
    url: string,
    payload?: PayloadParams,
  ) => Promise<ResponsePayload<T> & K>;
}

const HTTP_STATUS_CODE_SUCCESS = 200;
const HTTP_STATUS_CODE_MOVED_PERMANENTLY = 301;

interface ProcessEnv {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  API_URL: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  API_KEY?: string;
}

const hasProcessEnv = (entry: Data): entry is Record<'processEnv', ProcessEnv> =>
  !!entry.processEnv;

const { publicRuntimeConfig } = getConfig() as {
  publicRuntimeConfig: Record<'processEnv' | string, unknown>;
};

if (!('processEnv' in publicRuntimeConfig) || !hasProcessEnv(publicRuntimeConfig)) {
  throw new Error('cannot find processEnv in next.config.js');
}

const HTTP: Http = {
  baseUrl: null,
  apiToken: null,

  setBaseUrl: (url: string): void => {
    HTTP.baseUrl = url;
  },

  setToken(token: string): void {
    HTTP.apiToken = token;
  },

  request: async <T, K = Record<string, never>>({
    method,
    url,
    params = {},
    data = {},
  }: RequestPayload): Promise<ResponsePayload<T> & K> => {
    try {
      const query =
        Object.keys(params).length > 0 ? `?${stringify(params, { encode: false })}` : '';
      const apiUrl = `${HTTP.baseUrl}${url}${query}`;

      //TODO: should use axios' instance methods
      const res = (await (Axios(apiUrl, {
        method: method,
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${HTTP.apiToken}`,
        },
        data: JSON.stringify(data),
      }) as unknown)) as AxiosResponse<ResponsePayload<T> & K>;

      //TODO: should use axios's validateStatus instead
      if (
        res.status >= HTTP_STATUS_CODE_SUCCESS &&
        res.status <= HTTP_STATUS_CODE_MOVED_PERMANENTLY
      ) {
        return res.data;
      } else {
        throw new Error(res.data?.message);
      }
    } catch (_e) {
      const error = _e as unknown as AxiosError<ResponsePayload<T> & K>;
      throw new Error(error.response?.data?.message || error.message);
    }
  },

  //TODO: should rewrite and use axios's instance method instead
  get: async (url: string, payload?) => {
    const { params = {} } = payload ?? {};
    return HTTP.request({ method: 'GET', url, params });
  },

  //TODO: should rewrite and use axios's instance method instead
  post: async (url: string, payload?) => {
    const { params = {}, data = {} } = payload ?? {};
    return HTTP.request({ method: 'POST', url, params, data });
  },

  //TODO: should rewrite and use axios's instance method instead
  patch: async (url: string, { params, data }) => {
    return HTTP.request({ method: 'PATCH', url, params, data });
  },

  //TODO: should rewrite and use axios's instance method instead
  put: async (url: string, { params, data }) => {
    return HTTP.request({ method: 'PUT', url, params, data });
  },

  //TODO: should rewrite and use axios's instance method instead
  delete: async (url: string, payload?) => {
    const { params = {} } = payload ?? {};
    return HTTP.request({ method: 'DELETE', url, params });
  },
};

export { HTTP as Http };
