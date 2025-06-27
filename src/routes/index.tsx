import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import App from '../App';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';

import MainLayout from '../components/layout/MainLayout';
import AdminLayout from '../components/layout/AdminLayout';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      // Public routes
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'register',
        element: <RegisterPage />
      },

      // Main layout routes
      {
        path: '',
        element: <MainLayout />,
        children: []
      },

      // Admin layout routes
      {
        path: 'admin',
        element: <AdminLayout />,
        children: []
      }
    ]
  }
];

export const router = createBrowserRouter(routes);
