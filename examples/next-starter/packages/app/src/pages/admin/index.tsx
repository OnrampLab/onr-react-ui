import { App, AxiosHelper } from '@onr/core';
import { DashboardPage } from '@onr/plugin-custom-admin-dashboard';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/client';

export default DashboardPage;

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  // NOTE: set server side token, so we can easily do server side render when calling API
  AxiosHelper.setToken(App.getInstance().apis.adminAxiosInstance, session?.accessToken as string);

  return {
    props: {},
  };
}
