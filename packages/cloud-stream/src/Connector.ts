import { Channel } from './Channel';

export interface Connector {
  connect(): void;

  subscribe(channelName: string): Channel;

  unsubscribe(channelName: string): void;
}
