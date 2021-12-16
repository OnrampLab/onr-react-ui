import { roleModel } from '@onr/plugin-auth/lib/__mocks__';
import { Registry, Server } from 'miragejs';
import Schema from 'miragejs/orm/schema';
import { userModel } from './userModel';

// const debug = getDebugger('onr:user:userRouteCallback');

type AppRegistry = Registry<{ user: typeof userModel; role: typeof roleModel }, {}>;
type AppSchema = Schema<AppRegistry>;

export function userRouteCallback(server: Server): void {
  server.post('/users', function (schema: AppSchema, request) {
    const data = JSON.parse(request.requestBody);

    data.accountIds = data.accounts;
    data.roleIds = schema
      .where('role', role => data.roles.includes(role.name))
      .models.map(role => role.id);

    delete data.accounts;
    delete data.roles;

    const user = schema.create('user', data);

    return {
      // @ts-ignore
      data: user,
    };
  });

  server.patch(`/users/:id`, (schema: AppSchema, request) => {
    const { id } = request.params;
    const data = JSON.parse(request.requestBody);

    data.accountIds = data.accounts;
    data.roleIds = schema
      .where('role', (role: any) => data.roles.includes(role.name))
      .models.map((role: any) => role.id);

    delete data.accounts;
    delete data.roles;

    // @ts-ignore
    schema.users.find(id).update(data);

    return {
      message: 'success',
    };
  });
}
