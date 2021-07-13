import { getDebugger } from '@onr/common';
import { Server } from 'miragejs';

const debug = getDebugger('onr:user:userRouteCallback');

export function userRouteCallback(server: Server): void {
  server.post('/users', function (schema, request) {
    const data = JSON.parse(request.requestBody);

    data.accountIds = data.accounts;
    data.roleIds = schema.roles
      .where(role => data.roles.includes(role.name))
      .models.map(role => role.id);

    delete data.accounts;
    delete data.roles;

    const user = schema.users.create(data);

    return {
      // @ts-ignore
      data: user,
    };
  });

  server.patch(`/users/:id`, (schema, request) => {
    const { id } = request.params;
    const data = JSON.parse(request.requestBody);

    data.accountIds = data.accounts;
    data.roleIds = schema.roles
      .where(role => data.roles.includes(role.name))
      .models.map(role => role.id);

    delete data.accounts;
    delete data.roles;

    // @ts-ignore
    schema.users.find(id).update(data);

    return {
      message: 'success',
    };
  });
}
