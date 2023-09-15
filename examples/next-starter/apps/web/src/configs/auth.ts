import { AuthConfig } from '@onr/core';
import { AppUser } from '@onr/plugin-custom-auth';
import { roles } from '../constants/roles';

export const authConfig: AuthConfig = {
  model: AppUser,

  roles,
};
