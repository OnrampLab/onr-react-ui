import { Channel as PusherLibChannel } from 'pusher-js';
import { Channel } from '../Channel';
import { EventHandler } from '../types';

export class PusherChannel implements Channel {
  constructor(private channel: PusherLibChannel) {}

  bind(eventName: string, handler: EventHandler) {
    this.channel.bind(eventName, handler);
  }

  emit(eventName: string, data: any): void {
    this.channel.emit(eventName, data);
  }
}
