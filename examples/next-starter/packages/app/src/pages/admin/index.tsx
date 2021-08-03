import { Http } from '@onr/common';
import { DashboardPage } from '@onr/plugin-custom-admin-dashboard';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/client';

export default DashboardPage;

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  // NOTE: set server side token, so we can easily do server side render when calling API
  Http.setToken(session?.accessToken);

  return {
    props: {},
  };
}
