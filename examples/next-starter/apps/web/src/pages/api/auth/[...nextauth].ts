import { createNextAuthApi } from '@onr/core/api';
import { AuthService } from '@onr/plugin-auth';
import { application } from '../../../application/application';

const authService = application.getService<AuthService>('authService');

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default createNextAuthApi({
  apis: {
    login: authService.login.bind(authService),
    getUser: authService.getCurrentUser.bind(authService),
    refreshJWT: authService.refreshJWT.bind(authService),
  },
});
