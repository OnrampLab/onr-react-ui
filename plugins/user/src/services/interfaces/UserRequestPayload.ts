/**
 *
 * @export
 * @interface UserRequestPayload
 */

import { UserRoleName } from '../../entities/interfaces/IUser';

export interface UserRequestPayload {
  /**
   *
   * @type {array|undefined}
   * @memberof UserRequestPayload
   */
  data: {
    password?: string;
    name: string;
    email: string;
    roles: UserRoleName[];
    accounts: number[]; // only need to pass account ids
  };
}
