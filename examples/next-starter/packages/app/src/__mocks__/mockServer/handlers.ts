import { rest } from 'msw';

export const handlers = [
  rest.post('http://localhost:3000/api/auth/refresh', (req, res, ctx) => {
    const JWT_TOKEN = {
      data: {
        access_token: 'token_' + new Date().getTime(),
        expires_in: 86400000,
        token_type: 'bearer',
        email: 'user1@test.com',
      },
      message: 'success',
    };

    return res(ctx.json(JWT_TOKEN));
  }),

  rest.post('http://localhost:3000/api/auth/me', (req, res, ctx) => {
    const JWT_TOKEN = {
      data: {
        accountIds: ['1', '2'],
        roleIds: ['1'],
        id: '1',
        name: 'User 1',
        email: 'user1@test.com',
        created_at: '2020-03-04T06:16:24.000000Z',
        updated_at: '2020-03-04T06:16:24.000000Z',
      },
    };

    return res(ctx.json(JWT_TOKEN));
  }),
];
