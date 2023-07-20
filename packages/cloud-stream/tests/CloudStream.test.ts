import { Channel } from '../src/Channel';
import { CloudStream } from '../src/CloudStream';
import { Connector } from '../src/Connector';
import { EventHandler } from '../src/types';

class MockChannel implements Channel {
  eventHandlerMap: Map<string, EventHandler> = new Map();

  bind(eventName: string, handler: EventHandler) {
    this.eventHandlerMap.set(eventName, handler);
  }

  emit(eventName: string, data: any) {
    const handler = this.eventHandlerMap.get(eventName);

    if (!handler) {
      throw new Error(`Event handler is not found for event: ${eventName}`);
    }

    handler(data);
  }
}

class MockConnector implements Connector {
  private channel: Channel;

  connect() {}

  subscribe(channelName: string): Channel {
    this.channel = new MockChannel();

    return this.channel;
  }

  getDefaultChannel() {
    return this.channel;
  }
}

describe('CloudStream', () => {
  describe('Use default channel', () => {
    it('works', () => {
      const mockConnector = new MockConnector();

      let eventName: string = '';

      const cloudStream = CloudStream.connect(mockConnector, {
        channel: 'myChannel',
        config: {
          appKey: 'test',
          cluster: 'test',
        },
      });

      cloudStream.getDefaultChannel().bind('event1', event => {
        eventName = event.name;
      });

      mockConnector.getDefaultChannel().emit('event1', { name: 'event1' });

      expect(eventName).toEqual('event1');
    });
  });

  describe('Subscribe extra channel', () => {
    it('connect the server', () => {
      const mockConnector = new MockConnector();
      const cloudStream = CloudStream.connect(mockConnector, {
        channel: 'channel1',
        config: {
          appKey: 'test',
          cluster: 'test',
        },
      });
      const mockChannel = new MockChannel();
      let eventName: string = '';

      cloudStream.subscribe('channel2', mockChannel).bind('event1', event => {
        eventName = event.name;
      });

      mockChannel.emit('event1', { name: 'event1' });

      expect(eventName).toEqual('event1');
    });
  });
});
