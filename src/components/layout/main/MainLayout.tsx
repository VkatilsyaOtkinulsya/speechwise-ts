import { Layout, Menu } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import type { MenuProps } from 'antd/lib';
import {
  AppstoreOutlined,
  DesktopOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useCurrentRoute } from '../../../hooks/useCurrentRoute';
import { useAuthStore } from '../../../stores/authStore';
import './MainLayout.css';
import UserProfile from '../../common/Profile/UserProfile';
import { lazy, Suspense } from 'react';

type MenuItem = Required<MenuProps>['items'][number];
interface MainLayoutProps {
  children?: React.ReactNode;
}

const MediaModal = lazy(
  () => import('@/components/features/MediaModal/MediaModal')
);

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const currentRouteName = useCurrentRoute('main');
  const logout = useAuthStore((state) => state.logout);

  const items: MenuItem[] = [
    {
      key: 'meetings',
      icon: <AppstoreOutlined />,
      label: <Link to="/meetings">Мои встречи</Link>
    },
    {
      key: 'projects',
      icon: <DesktopOutlined />,
      label: <Link to="/projects">Проекты</Link>
    }
  ];
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="light" collapsible={false} collapsed={false}>
        <div className={'sider-logo'}>
          <img src="/src/assets/logo.png" alt="logo" />
          <p className="sider-logo-text">Speech Wise</p>
        </div>

        <div className="sider-menu">
          <Menu
            theme={'light'}
            defaultSelectedKeys={['meetings']}
            mode="inline"
            items={items}
            style={{ flex: 1 }}
          />
          <div className="logout-button">
            <Link to="/login" className="logout-link" onClick={logout}>
              <LogoutOutlined />
              <p style={{ marginLeft: '8px', color: 'rgba(0, 0, 0, 0.88)' }}>
                Выйти
              </p>
            </Link>
          </div>
        </div>
      </Sider>
      <Layout>
        <Header
          style={{
            background: '#fff',
            color: '#000',
            padding: '0 24px',
            boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <h2>{currentRouteName}</h2>
          <UserProfile />
        </Header>
        <Content>{children}</Content>
        <Suspense fallback={null}>
          <MediaModal />
        </Suspense>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
