/**
 *
 * @export
 * @interface IAccount
 */

export interface IAccount {
  /**
   *
   * @type {number}
   * @memberof IAccount
   */
  id: number;

  /**
   *
   * @type {string}
   * @memberof IAccount
   */
  name: string;

  /**
   *
   * @type {string}
   * @memberof IAccount
   */
  created_at: string; // eslint-disable-line

  /**
   *
   * @type {string}
   * @memberof IAccount
   */
  updated_at: string; // eslint-disable-line
}
