import './App.css';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ConfigProvider locale={ruRU}>
        <Outlet />
      </ConfigProvider>
      <ToastContainer containerId="main-toast" />
    </>
  );
}

export default App;
