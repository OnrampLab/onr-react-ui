import { Mocks } from '@onr/core';
import { mocks as accountMocks } from '@onr/account/__mocks__';
import { mocks as authMocks } from '@onr/auth/__mocks__';
import { mocks as userMocks } from '@onr/user/__mocks__';

const urlPrefix = `${process.env.NEXT_PUBLIC_API_URL?.replace(/(.[^\/])$/, '$1/')}`;
const namespace = 'api';

const mocks = Mocks.create({
  urlPrefix,
  namespace,
})
  .addMocks(accountMocks)
  .addMocks(authMocks)
  .addMocks(userMocks);

export { mocks };
