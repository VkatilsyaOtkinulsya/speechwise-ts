import { useLocation } from 'react-router-dom';

type RouteNames = {
  [key: string]: {
    [key: string]: string;
  };
};

export const useCurrentRoute = (key: 'main' | 'admin') => {
  const location = useLocation();

  const routeNames: RouteNames = {
    main: {
      '/meetings': 'Мои встречи',
      '/projects': 'Проекты',
      '/': 'Мои встречи'
    },

    admin: {
      '/meetings': 'Мои встречи',
      '/projects': 'Проекты',
      '/users': 'Пользователи',
      '/': 'Мои встречи'
    }
  };

  return routeNames[key][location.pathname] || '';
};
