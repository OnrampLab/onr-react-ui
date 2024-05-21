import { useRouter } from 'next/router';
import useSWR, { SWRConfiguration } from 'swr';

interface UseSessionOptions {
  required?: boolean;
  redirect?: () => void;
  swrConfig?: SWRConfiguration;
  getUser?: (token: string) => Promise<any>;
}

export async function fetchSession() {
  const res = await fetch('/api/auth/session');
  const session = await res.json();
  if (Object.keys(session).length) {
    return session;
  }
  return null;
}

export function useSession({
  required = false,
  redirect,
  swrConfig = {},
  getUser,
}: UseSessionOptions = {}) {
  const router = useRouter();
  const defaultRouter = () => router.push('/api/auth/signin?error=SessionExpired');
  const redirectPage = redirect || defaultRouter;

  const fetchSessionWithNewUser = async () => {
    const session = await fetchSession();
    let user = session?.user;

    if (getUser && session?.accessToken) {
      try {
        const newUser = await getUser(session.accessToken);
        user = newUser;
      } catch (e) {}
    }

    return session ? { ...session, user } : null;
  };

  const { data } = useSWR(['session'], fetchSessionWithNewUser, {
    ...swrConfig,
    onSuccess(data, key, config) {
      if (swrConfig.onSuccess) swrConfig.onSuccess(data, key, config);
      if (data || !required) return;

      redirectPage();
    },
    onError(error, key, config) {
      if (swrConfig.onError) swrConfig.onError(error, key, config);

      redirectPage();
    },
  });

  return [data, required && !data];
}
