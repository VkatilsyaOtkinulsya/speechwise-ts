import { useMediaModalState } from '@/stores/mediaModalStore';
import { FileOutlined, LinkOutlined, DeleteOutlined } from '@ant-design/icons';
import { Tooltip, Button, Typography } from 'antd';

const { Text } = Typography;

interface Props {
  duration: number | null;
}

const FilePreview: React.FC<Props> = ({ duration }) => {
  const { file, url, setFile, setUrl } = useMediaModalState();

  if (!file && !url) return null;

  const handleRemove = () => {
    setFile(null);
    setUrl('');
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginTop: 16,
        padding: '12px 16px',
        border: '1px solid #f0f0f0',
        borderRadius: 8
      }}
    >
      {file ? <FileOutlined /> : <LinkOutlined />}
      <div style={{ flexGrow: 1 }}>
        <Tooltip title={file?.name || url}>
          <Text ellipsis style={{ maxWidth: 300, display: 'block' }}>
            {file?.name || url}
          </Text>
        </Tooltip>
        {duration !== null && (
          <Text type="secondary" style={{ fontSize: 12 }}>
            Длительность: {duration}
          </Text>
        )}
      </div>
      <Button
        type="text"
        icon={<DeleteOutlined />}
        onClick={handleRemove}
        danger
      />
    </div>
  );
};

export default FilePreview;
