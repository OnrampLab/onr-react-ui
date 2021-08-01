import { Mocks } from '@onr/mock';
import { mocks as accountMocks } from '@onr/plugin-account';
import { mocks as authMocks } from '@onr/plugin-auth';
import { mocks as userMocks } from '@onr/plugin-user';
import './mockServer';

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
