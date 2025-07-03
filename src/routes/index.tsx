import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import type { useRouteObject } from '../utils/lib/useRouteObject';
import { lazy } from 'react';
import App from '../App';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const Meetings = lazy(() => import('../components/features/Meetings/Meetings'));
const Projects = lazy(() => import('../components/features/Projects/Projects'));
const Users = lazy(() => import('../components/features/Users/Users'));
const ErrorPage = lazy(() => import('../pages/ErrorPage/ErrorPage'));

// const ProjectDetails = lazy(
//   () => import('../components/features/Projects/ProjectDetails')
// );
// const MeetingDetails = lazy(() => import('../components/features/Meetings/MeetingDetails'));

const routes: useRouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'login',
        element: (
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        )
      },
      {
        path: '',
        element: <ProtectedRoute />,
        children: [
          {
            path: '',
            element: <Navigate to="projects" replace />
          },
          {
            path: 'projects',
            element: <Outlet />,
            children: [
              { index: true, element: <Projects /> }
              // { path: ':id', element: <ProjectDetail /> }
            ]
          },
          {
            path: 'meetings',
            element: <Outlet />,
            children: [
              { index: true, element: <Meetings /> }
              // { path: ':id', element: <MeetingDetail /> }
            ]
          },
          {
            path: 'users',
            element: <Users />,
            meta: { roles: ['admin'] }
          }
        ]
      },

      { path: '*', element: <ErrorPage /> }
    ]
  }
];

export const router = createBrowserRouter(routes);
