export interface Identity {
  /**
   * The the user ID.
   */
  id: number;

  /**
   * A token that can be used to authenticate the user within backend.
   */
  token: string;
}

export interface AuthUser extends Identity {
  /**
   * Display name that can be presented to the user.
   */
  name?: string;

  /**
   * Email ID.
   */
  email?: string;

  password?: string;
}
