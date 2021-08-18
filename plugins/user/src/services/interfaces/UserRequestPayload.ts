/**
 *
 * @export
 * @interface UserRequestPayload
 */

import { AccountUser } from '../../entities/interfaces/AccountUser';

export interface UserRequestPayload {
  /**
   *
   * @type {array|undefined}
   * @memberof UserRequestPayload
   */
  data: AccountUser;
}
