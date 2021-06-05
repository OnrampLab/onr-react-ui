import { SESSION_KEY } from '@onr/auth';
import { Server, Response } from 'miragejs';
import { getDebugger } from '@onr/common';

const debug = getDebugger('onr:core:mock');

const JWT_TOKEN = {
  data: {
    access_token: 'token',
    expires_in: 86400000,
    token_type: 'bearer',
  },
  message: 'success',
};

export function authRouteCallback(server: Server): void {
  server.post('/auth/refresh', function() {
    return JWT_TOKEN;
  });

  debug(`register static route => post[/auth/login]`);
  server.post('/auth/login', function(schema, request) {
    const data = JSON.parse(request.requestBody);
    const user = schema.users.findBy({
      email: data.email,
    });

    if (user) {
      return JWT_TOKEN;
    }

    return new Response(401, {}, { message: 'Unauthenticated.' });
  });

  debug(`register static route => post[/auth/me]`);
  server.post('/auth/me', function(schema, request) {
    const data = JSON.parse(localStorage.getItem(SESSION_KEY) || '{}');

    const user = schema.users.findBy({
      email: data.email,
    });

    return {
      // can not change `this` to `server`
      data: this.serialize(user).user,
    };
  });
}
