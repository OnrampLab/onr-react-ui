//#region Global Imports
//#endregion Global Imports
//#region Interface Imports
import { UserListPage } from '@onr/plugin-user';
import * as React from 'react';
//#endregion Interface Imports

export class UserPage extends React.Component {
  public render(): JSX.Element {
    return (
      <>
        <UserListPage />
      </>
    );
  }
}

export default UserPage;
