import { useRouter } from 'next/router';
import useSWR, { SWRConfiguration } from 'swr';

interface UseSessionOptions {
  required?: boolean;
  redirectTo?: string;
  swrConfig?: SWRConfiguration;
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
  redirectTo = '/api/auth/signin?error=SessionExpired',
  swrConfig = {},
}: UseSessionOptions = {}) {
  const router = useRouter();
  const { data } = useSWR(['session'], fetchSession, {
    ...swrConfig,
    onSuccess(data, key, config) {
      if (swrConfig.onSuccess) swrConfig.onSuccess(data, key, config);
      if (data || !required) return;
      router.push(redirectTo);
    },
    onError(error, key, config) {
      if (swrConfig.onError) swrConfig.onError(error, key, config);

      router.push(redirectTo);
    },
  });
  return [data, !data];
}
