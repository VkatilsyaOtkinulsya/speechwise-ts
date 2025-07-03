import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import api from '../api/api';
import type { User, UserRole } from '../types/user.types';
import type { LoginResponse } from '../types/auth.types';
import { handleApiError, ToastService } from '../utils/error-handler';
import { AxiosError } from 'axios';

const AUTH_URL = import.meta.env.VITE_AUTH_URL;

interface AuthState {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string | null) => Promise<LoginResponse>;
  logout: () => void;
  isAuthorized: (role?: UserRole | UserRole[]) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    devtools((set, get) => ({
      token: null,
      user: null,
      isLoading: false,
      error: null,
      login: async (email, password) => {
        set({ isLoading: true, error: null });

        try {
          const { data } = await api.post<LoginResponse>(AUTH_URL, {
            email,
            password
          });
          set({
            token: data.access_token,
            user: data.user,
            isLoading: false
          });
          ToastService.success('Вход выполнен успешно!');

          return data;
        } catch (error) {
          set({
            error: 'Неверный логин или пароль',
            isLoading: false
          });
          if (error instanceof AxiosError) handleApiError(error);
          throw error;
        }
      },
      logout: () => {
        set({ token: null, user: null });
        ToastService.info('Вы вышли из системы');
      },
      isAuthorized: (role) => {
        const user = get().user;
        if (!role) return true;
        if (!user) return false;

        return Array.isArray(role)
          ? role.includes(user.role)
          : role === user.role;
      }
    })),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        token: state.token,
        user: state.user
      })
    }
  )
);
