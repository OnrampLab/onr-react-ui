import axios, { AxiosError } from 'axios';
import { RecordNotFoundError } from '../errors/RecordNotFoundError';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { UnprocessableError } from '../errors/UnprocessableError';

export default function handleApiError(_target: any, _key: string, descriptor: PropertyDescriptor) {
  const fn = descriptor.value;

  const newFn = async function newFn(...args: any[]) {
    try {
      // @ts-ignore
      return await fn.apply(this, args);
    } catch (err) {
      const error = err as Error | AxiosError<any>;

      if (axios.isAxiosError(error)) {
        if (!error.response) {
          throw error;
        }

        const { response } = error;
        const { status, data } = response;
        const message = error.message || 'Unknown error';
        const errors = data.errors ?? [];

        if (status === 404) {
          throw new RecordNotFoundError(message, errors);
        } else if (status === 422) {
          throw new UnprocessableError(message, errors);
        } else if (status === 401) {
          throw new UnauthorizedError(message, errors);
        }

        throw new Error(message);
      }

      throw error;
    }
  };

  descriptor.value = newFn;
  return descriptor;
}
