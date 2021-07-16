/**
 *
 * @export
 * @interface UsersResponse
 */

import { IUser } from '../../entities';

export interface UsersResponse {
  /**
   *
   * @type {array}
   * @memberof UsersResponse
   */
  data: IUser[];
}
