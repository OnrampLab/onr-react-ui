import Pusher from 'pusher-js';
import { Channel } from '../Channel';
import { Connector } from '../Connector';
import { PusherChannel } from './PusherChannel';

export type PusherOption = {
  appKey: string;
  cluster: string;
};

export class PusherConnector implements Connector {
  private client: Pusher | null = null;

  constructor(private options: PusherOption) {}

  connect() {
    this.client = new Pusher(this.options.appKey, {
      cluster: this.options.cluster,
    });
  }

  subscribe(channelName: string): Channel {
    if (!this.client) {
      throw new Error('Client should not be null. Please call connect() first');
    }

    const pusherChannel = this.client.subscribe(channelName);

    return new PusherChannel(pusherChannel);
  }

  unsubscribe(channelName: string) {
    this.client?.unsubscribe(channelName);
  }
}
