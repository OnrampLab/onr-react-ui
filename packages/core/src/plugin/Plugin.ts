import { App } from '../components';

export interface Plugin {
  name: string;

  bootstrap(app: App): Promise<void>;
}
