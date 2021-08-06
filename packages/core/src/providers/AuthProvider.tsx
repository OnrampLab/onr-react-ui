import { Http } from '@onr/common';
import { signIn, signOut } from 'next-auth/client';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useMemo } from 'react';
import { AppContext } from '../components/App';
import { useSession } from '../hooks';

export const AuthContext = createContext({});

export const AuthProvider = (props: any) => {
  const router = useRouter();
  const loginPage = '/auth/signin';
  const isLoginPage = router.asPath.includes(loginPage);

  const [session, loading] = useSession({
    required: !isLoginPage,
    redirect: () => signIn('Credential', { callbackUrl: router.asPath }),
    swrConfig: {
      // NOTE: should consider to make the refresh interval less than token expiry time
      refreshInterval: 60 * 60 * 1000, // 1 hour
    },
  });
  const components = useContext(AppContext)?.getComponents();

  const user = session?.user;
  const isUser = !!session?.user;
  const value = useMemo(() => ({ user, signIn, signOut }), [user]);

  if (typeof window !== 'undefined' && session?.accessToken) {
    // NOTE: update client side token
    if (session?.accessToken) {
      Http.setToken(session?.accessToken);
    }
  }

  useEffect(() => {
    if (loading) return; // Do nothing while loading
  }, [loading]);

  if (isUser || isLoginPage) {
    return <AuthContext.Provider value={value} {...props} />;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  if (components) {
    const { LoadingPage } = components;
    // @ts-ignore
    return <LoadingPage />;
  } else {
    return <div>Loading...</div>;
  }
};
