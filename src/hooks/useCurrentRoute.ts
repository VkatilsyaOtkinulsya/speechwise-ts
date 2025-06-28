import { useLocation } from 'react-router-dom';

export const useCurrentRoute = () => {
  const location = useLocation();

  const routeNames: Record<string, string> = {
    '/main/meetings': 'Мои встречи',
    '/main/projects': 'Проекты',
    '/main': 'Мои встречи'
  };

  return routeNames[location.pathname] || '';
};
