import { mocks as authMocks } from '@onr/auth/__mocks__';
import { Mocks } from '@onr/mock';
import { mocks as accountMocks } from '@onr/plugin-account';
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
