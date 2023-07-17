import { EventHandler } from './types';

export interface Channel {
  bind(eventName: string, handler: EventHandler): void;

  emit(eventName: string, data: any): void;
}
