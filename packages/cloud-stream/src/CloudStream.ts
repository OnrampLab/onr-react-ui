import { Channel } from './Channel';
import { Connector } from './Connector';
import { PusherConnector, PusherOption } from './pusher/PusherConnector';

type CloudStreamOption = {
  channel: string;
  config: PusherOption;
};

export class CloudStream {
  public defaultChannelName: string = 'default';
  public connecter: Connector | null = null;
  private channelMap: Map<string, Channel> = new Map();

  constructor(connector: string | Connector, options: CloudStreamOption) {
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

    cloudStream.channelMap.set(
      cloudStream.defaultChannelName,
      cloudStream.subscribe(cloudStream.defaultChannelName),
    );

    return cloudStream;
  }

  subscribe(channelName: string, channel?: Channel): Channel {
    if (!this.connecter) {
      throw new Error(`The connector is null, please connect() first`);
    }

    if (!channel) {
      channel = this.connecter.subscribe(channelName);
    }

    this.channelMap.set(channelName, channel);

    return channel;
  }

  getDefaultChannel(): Channel {
    const channel = this.channelMap.get(this.defaultChannelName);

    if (!channel) {
      throw new Error('Default channel should not be empty');
    }

    return channel;
  }
}
