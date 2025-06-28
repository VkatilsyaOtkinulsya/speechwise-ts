import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import App from '../App';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';

import MainLayout from '../components/layout/main/MainLayout';
import AdminLayout from '../components/layout/admin/AdminLayout';
import Meetings from '../components/features/Meetigns/Meetings';
import Projects from '../components/features/Projects/Projects';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      // Public routes
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/register',
        element: <RegisterPage />
      },

      // Main layout routes
      {
        path: '/main/*',
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <Meetings />
          },
          {
            path: 'meetings',
            element: <Meetings />
          },
          {
            path: 'projects',
            element: <Projects />
          }
        ]
      },

      // Admin layout routes
      {
        path: '/admin',
        element: <AdminLayout />,
        children: []
      }
    ]
  }
];

export const router = createBrowserRouter(routes);
