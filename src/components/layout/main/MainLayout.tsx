import { Layout, Menu } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import type { MenuProps } from 'antd/lib';
import {
  AppstoreOutlined,
  DesktopOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { Link, Route, Routes } from 'react-router-dom';
import Meetings from '../../features/Meetigns/Meetings';
import Projects from '../../features/Projects/Projects';
import { useCurrentRoute } from '../../../hooks/useCurrentRoute';

type MenuItem = Required<MenuProps>['items'][number];

const MainLayout = () => {
  const currentRouteName = useCurrentRoute();

  const handleAddMeetClick = () => {
    console.log('Кнопка добавления встречи нажата');
  };

  const items: MenuItem[] = [
    {
      key: '1',
      icon: <PlusOutlined />,
      label: <div onClick={() => handleAddMeetClick}>Добавить встречу</div>,
      style: {
        backgroundColor: '#1890ff',
        color: '#fff'
      }
    },
    {
      key: '2',
      icon: <AppstoreOutlined />,
      label: <Link to="/main/meetings">Мои встречи</Link>
    },
    {
      key: '3',
      icon: <DesktopOutlined />,
      label: <Link to="/main/projects">Проекты</Link>
    }
  ];
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="light" collapsible={false} collapsed={false}>
        <div className="sider-logo" style={{ height: '32px', margin: '16px' }}>
          <p style={{ fontSize: 28 }}>Speech Wise</p>
        </div>
        <Menu
          theme={'light'}
          defaultSelectedKeys={['2']}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            background: '#fff',
            color: '#000',
            padding: '0 24px',
            boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)'
          }}
        >
          <h2>{currentRouteName}</h2>
        </Header>
        <Content>
          <Routes>
            <Route index element={<Meetings />} />
            <Route path="meetings" element={<Meetings />} />
            <Route path="projects" element={<Projects />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
