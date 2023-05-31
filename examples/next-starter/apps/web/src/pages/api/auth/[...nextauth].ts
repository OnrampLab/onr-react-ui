import { createNextAuthApi } from '@onr/core/api';
import { AuthService } from '@onr/plugin-auth';
import { app } from '../../../components/app';

const authService = app.getService('authService') as AuthService;

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default createNextAuthApi({
  apis: {
    login: authService.login.bind(authService),
    getUser: authService.getCurrentUser.bind(authService),
    refreshJWT: authService.refreshJWT.bind(authService),
  },
});
