import { Http } from '@onr/common';
import { HomeMainPage } from '@onr/plugin-custom-home';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/client';

export default HomeMainPage;

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  // NOTE: set server side token, so we can easily do server side render when calling API
  Http.setToken(session?.accessToken);

  return {
    props: {},
  };
}
