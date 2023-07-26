import { Channel } from './Channel';
import { Connector } from './Connector';
import { PusherConnector, PusherOption } from './pusher/PusherConnector';

type CloudStreamOption = {
  channel?: string;
  disconnectOnNoChannels?: boolean;
  config: PusherOption;
};

export class CloudStream {
  public defaultChannelName: string | null = null;
  public connecter: Connector | null = null;
  private channelMap: Map<string, Channel> = new Map();
  private channelSubscribersMap: Map<string, number> = new Map();
  private options: CloudStreamOption;

  constructor(connector: string | Connector, options: CloudStreamOption) {
    this.options = options;
    const channel = options?.channel;

    if (channel) {
      this.defaultChannelName = channel;
    }

    if (typeof connector === 'string') {
      if (connector === 'pusher') {
        this.connecter = new PusherConnector(options.config);
      } else {
        throw new Error(`The connector of ${connector} is not supported`);
      }
    } else {
      this.connecter = connector;
    }
  }

  static connect(connectorName: string | Connector, options: CloudStreamOption) {
    const cloudStream = new CloudStream(connectorName, options);

    if (cloudStream.connecter) {
      cloudStream.connecter.connect();
    }

    if (cloudStream.defaultChannelName) {
      cloudStream.subscribe(cloudStream.defaultChannelName);
    }

    return cloudStream;
  }

  isConnected(): boolean {
    return !!this.connecter?.isConnected();
  }

  subscribe(channelName: string, channel?: Channel): Channel {
    if (!this.connecter) {
      throw new Error(`The connector is null, please connect() first`);
    }

    if (!channel) {
      channel = this.getChannel(channelName);
    }

    if (!channel) {
      channel = this.connecter.subscribe(channelName);
    }

    this.channelMap.set(channelName, channel);
    this.addChannelSubscriber(channelName);

    return channel;
  }

  unsubscribe(channelName: string) {
    const subscribers = this.removeChannelSubscriber(channelName);

    if (subscribers === 0) {
      this.connecter?.unsubscribe(channelName);
    }

    if (this.options.disconnectOnNoChannels && this.getChannelCount() === 0) {
      this.connecter?.disconnect();
    }
  }

  getDefaultChannel(): Channel | undefined {
    if (this.defaultChannelName) {
      return this.getChannel(this.defaultChannelName);
    }
  }

  getChannel(channelName: string): Channel | undefined {
    const channel = this.channelMap.get(channelName);

    return channel;
  }

  getDefaultChannelSubscribers(): number {
    if (!this.defaultChannelName) {
      return 0;
    }
    return this.getChannelSubscribers(this.defaultChannelName);
  }

  getChannelSubscribers(channelName: string): number {
    return this.channelSubscribersMap.get(channelName) ?? 0;
  }

  private getChannelCount(): number {
    return this.channelMap.values.length;
  }

  private addChannelSubscriber(channelName: string): number {
    let count = this.getChannelSubscribers(channelName);

    this.channelSubscribersMap.set(channelName, ++count);

    return count;
  }

  private removeChannelSubscriber(channelName: string): number {
    let count = this.getChannelSubscribers(channelName);

    this.channelSubscribersMap.set(channelName, --count);

    return count;
  }
}
