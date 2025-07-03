import { useAuthStore } from '../../../stores/authStore.ts';
import { Avatar } from 'antd';
import './index.css';

const UserProfile = () => {
  const user = useAuthStore((state) => state.user);
  if (!user) return null;

  const { email } = user;
  const avatar = 'https://i.pravatar.cc/40';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        userSelect: 'none'
      }}
    >
      <Avatar src={avatar} alt="avatar" />
      <span style={{ fontWeight: 500 }}>{email}</span>
    </div>
  );
};

export default UserProfile;
