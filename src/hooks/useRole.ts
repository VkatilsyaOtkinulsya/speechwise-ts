import { useAuthStore } from '../stores/authStore';

export const useRole = () => {
  const user = useAuthStore((state) => state.user);

  const hasRole = (requiredRole: string | string[]) => {
    if (user && Array.isArray(requiredRole)) {
      return requiredRole.includes(user?.role);
    }
    return user?.role === requiredRole;
  };

  return {
    isAdmin: hasRole('admin'),
    isUser: hasRole('user'),
    hasRole,
    currentRole: user?.role
  };
};
