import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import useSWR, { SWRConfiguration } from 'swr';

export interface UseSessionOptions {
  required?: boolean;
  redirect?: () => void;
  swrConfig?: SWRConfiguration;
  getUser?: (token: string) => Promise<any>;
}

export interface CustomSession extends Session {
  accessToken?: string;
}

export async function fetchSession() {
  const session: CustomSession | null = await getSession();
  if (!session) {
    return null;
  }
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
    try {
      const session = await fetchSession();
      if (!session) return null;

      const { user: cachedUser, accessToken } = session;
      const user =
        accessToken && getUser ? await getUser(accessToken).catch(() => cachedUser) : cachedUser;

      return { ...session, user, cachedUser };
    } catch {
      return null;
    }
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
