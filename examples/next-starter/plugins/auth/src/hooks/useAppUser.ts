import { useAuth } from '@onr/core';
import { AppUser } from '../entities';

export function useAppUser() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const appUser = new AppUser(user);

  return appUser;
}
