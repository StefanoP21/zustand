import { create, StateCreator } from 'zustand';
import type { AuthStatus, User } from '../../interfaces';
import { devtools, persist } from 'zustand/middleware';
import { AuthService } from '../../services/auth.service';

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  loginUser: (email: string, password: string) => Promise<void>;
}

const storeApi: StateCreator<AuthState, [['zustand/devtools', never]]> = (
  set
) => ({
  status: 'authorized',
  token: undefined,
  user: undefined,

  loginUser: async (email, password) => {
    try {
      const { token, ...user } = await AuthService.login(email, password);

      set({ status: 'authorized', token, user }, false, 'loginUser');
    } catch (error) {
      set(
        { status: 'unauthorized', token: undefined, user: undefined },
        false,
        'loginUser'
      );
    }
  },
});

export const useAuthStore = create<AuthState>()(
  persist(devtools(storeApi), { name: 'auth-store' })
);
