import { Button, Form, Input, Card, Typography, Spin } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { useAuthStore } from '../../stores/authStore';
import { useShallow } from 'zustand/shallow';
import { ToastContainer } from 'react-toastify';
const { Title } = Typography;

const LoginPage = () => {
  const { isLoading, login } = useAuthStore(
    useShallow(({ isLoading, login }) => ({
      isLoading,
      login
    }))
  );
  const [form] = useForm();
  const navigate = useNavigate();
  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      const response = await login(values.email, values.password);
      form.resetFields();

      const role = response.user?.role;
      if (role === 'admin') {
        navigate('/users');
      } else {
        navigate('/meetings');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <Title level={2} style={{ textAlign: 'center' }}>
          Вход в SpeechWise
        </Title>
        <Form
          form={form}
          name="login-form"
          layout="vertical"
          autoComplete="off"
          onFinish={({ username, password }) =>
            handleLogin({
              email: username,
              password: password
            })
          }
        >
          <Form.Item
            label="Email"
            name="username"
            rules={[
              { required: true, message: 'Введите логин!' },
              { type: 'email', message: 'Некорректный email' }
            ]}
          >
            <Input placeholder="Введите ваш email" autoComplete="off" />
          </Form.Item>
          <Form.Item
            label="Пароль"
            name="password"
            rules={[{ required: true, message: 'Введите пароль!' }]}
          >
            <Input.Password
              placeholder="Введите ваш пароль"
              autoComplete="new-password"
            />
          </Form.Item>
          <Form.Item>
            {isLoading ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <Spin size="default" />
              </div>
            ) : (
              <Button
                type="primary"
                htmlType="submit"
                block
                disabled={isLoading}
              >
                Войти
              </Button>
            )}
          </Form.Item>
        </Form>
      </Card>

      <ToastContainer />
    </div>
  );
};

export default LoginPage;
