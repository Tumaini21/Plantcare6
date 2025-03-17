import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../../types';

interface AuthState {
  user: User | null;
  isAdmin: boolean;
  setAuth: (user: User, isAdmin?: boolean) => void;
  clearAuth: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAdmin: false,
      setAuth: (user, isAdmin = false) => set({ user, isAdmin }),
      clearAuth: () => set({ user: null, isAdmin: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);