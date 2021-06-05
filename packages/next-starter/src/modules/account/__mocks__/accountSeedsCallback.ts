import { Server } from 'miragejs';

export function accountSeedsCallback(server: Server): void {
  server.createList('account', 3);
}
