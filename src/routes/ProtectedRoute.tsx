import { Col, Row, Spin } from 'antd';
import { useAuthStore } from '../stores/authStore';
import { Navigate, Outlet, useLocation, useMatches } from 'react-router-dom';
import { useShallow } from 'zustand/shallow';
import AdminLayout from '../components/layout/admin/AdminLayout';
import MainLayout from '../components/layout/main/MainLayout';
import type { useRouteObject } from '../utils/lib/useRouteObject';

const ProtectedRoute = () => {
  const { token, user, isLoading } = useAuthStore(
    useShallow(({ token, user, isLoading }) => ({ token, user, isLoading }))
  );

  const location = useLocation();
  const matches = useMatches();

  if (isLoading) {
    return (
      <Row justify="center" align="middle" style={{ height: '100vh' }}>
        <Col>
          <Spin size="large" tip="Проверка авторизации..." />
        </Col>
      </Row>
    );
  }

  if (!token || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const route: useRouteObject = matches[matches.length - 1];
  const requiredRoles = route?.meta?.roles;

  if (requiredRoles && !requiredRoles.includes(user.role)) {
    return <Navigate to="/projects" replace />;
  }

  const Layout = user.role === 'admin' ? AdminLayout : MainLayout;

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default ProtectedRoute;
