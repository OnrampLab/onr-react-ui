import { Channel } from './Channel';

export interface Connector {
  connect(): void;

  disconnect(): void;

  isConnected(): boolean;

  subscribe(channelName: string): Channel;

  unsubscribe(channelName: string): void;
}
