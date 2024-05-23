import { signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { createContext, useEffect, useMemo } from 'react';
import { AxiosHelper } from '../helpers';
import { useApp, useSession } from '../hooks';
import { useRoute } from './RouteProvider';

// FIXME: should do null check for user and cachedUser
export type AuthContextType = {
  user: null | any;
  cachedUser: null | any;
  signIn: () => void;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  cachedUser: null,
  signIn: () => {},
  signOut: () => {},
});

export const AuthProvider = (props: any) => {
  const router = useRouter();
  const { currentRoute } = useRoute();
  const app = useApp();
  const authService = app?.getService('authService');
  const components = app?.getComponents();
  const [session, loading] = useSession({
    required: currentRoute.authRequired,
    redirect: () => signIn('credentials', { callbackUrl: router.asPath }),
    swrConfig: {
      // NOTE: should consider to make the refresh interval less than token expiry time
      refreshInterval: 60 * 60 * 1000, // 1 hour
    },
    getUser: authService?.getCurrentUser.bind(authService),
  });

  const user = session?.user;
  const cachedUser = session?.cachedUser;
  const isUser = !!session?.user;
  const value = useMemo(() => ({ user, cachedUser, signIn, signOut }), [user, cachedUser]);

  if (typeof window !== 'undefined' && session?.accessToken) {
    // NOTE: update client side token
    if (session?.accessToken && app) {
      AxiosHelper.setToken(app.apis.adminAxiosInstance, session?.accessToken);
    }
  }

  useEffect(() => {
    if (loading) return; // Do nothing while loading
  }, [loading]);

  if (isUser || !loading) {
    return <AuthContext.Provider value={value} {...props} />;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  if (components) {
    const { LoadingPage } = components;

    if (LoadingPage) {
      return <LoadingPage />;
    }
  }

  return <div>Loading...</div>;
};
