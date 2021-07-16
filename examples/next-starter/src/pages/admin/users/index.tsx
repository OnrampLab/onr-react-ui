//#region Global Imports
//#endregion Global Imports
//#region Interface Imports
import { UserListPage } from '@onr/plugin-user';
import Head from 'next/head';
import * as React from 'react';
//#endregion Interface Imports

export class UserPage extends React.Component {
  public render(): JSX.Element {
    return (
      <>
        <Head>
          <link rel="stylesheet" href="/static/react-vis.css" />
        </Head>
        <UserListPage />
      </>
    );
  }
}

export default UserPage;
