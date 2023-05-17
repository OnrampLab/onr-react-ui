import { SessionProvider } from 'next-auth/react';

export const NextAuthProvider = ({ children, session }: any) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
