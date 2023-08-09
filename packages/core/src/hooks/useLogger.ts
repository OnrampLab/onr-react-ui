import { App } from '../components';

export function useLogger() {
  const logger = App.getInstance().logger;

  return logger;
}
