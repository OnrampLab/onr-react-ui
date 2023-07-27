import { CloudStream } from '@onr/cloud-stream';
import { Channel } from '@onr/cloud-stream/types/Channel';

type ConnectorName = 'pusher';

export class StreamAdapter {
  private client?: CloudStream;

  constructor(private connectorName: ConnectorName, private options: any) {}

  connect() {
    this.client = CloudStream.connect(this.connectorName, this.options);
  }

  subscribe(channelName: string): Channel {
    if (!this.client) {
      throw new Error('Please connect first');
    }

    return this.client.subscribe(channelName);
  }

  unsubscribe(channelName: string) {
    this.client?.unsubscribe(channelName);
  }
}
