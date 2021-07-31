import { AuthService } from '@onr/auth';
import { createNextAuthApi } from '@onr/core/api';

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default createNextAuthApi({
  apis: {
    login: AuthService.newLogin,
    getUser: AuthService.getCurrentUser,
    refreshJWT: AuthService.loginWithJWT,
  },
});
