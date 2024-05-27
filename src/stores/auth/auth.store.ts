import { create, StateCreator } from 'zustand';
import type { AuthStatus, User } from '../../interfaces';
import { devtools } from 'zustand/middleware';

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;
}

const storeApi: StateCreator<AuthState> = (set) => ({
  status: 'authorized',
  token: undefined,
  user: undefined,
});

export const useAuthStore = create<AuthState>()(devtools(storeApi));
