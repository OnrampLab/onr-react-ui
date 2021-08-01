import { createNextAuthApi } from '@onr/core/api';
import { AuthService } from '@onr/plugin-auth';

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default createNextAuthApi({
  apis: {
    login: AuthService.login,
    getUser: AuthService.getCurrentUser,
    refreshJWT: AuthService.refreshJWT,
  },
});