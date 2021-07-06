import { STORE_KEY } from './consts';

export const selectAuthState = (state: any) => state[STORE_KEY].state;
export const selectAuthData = (state: any) => state[STORE_KEY].data;
export const selectCurrentUser = (state: any) => state[STORE_KEY].currentUser;
