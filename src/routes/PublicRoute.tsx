import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { token, user } = useAuthStore();
  if (token && user) {
    return <Navigate to="/projects" replace />;
  }
  return <>{children}</>;
};

export default PublicRoute;
