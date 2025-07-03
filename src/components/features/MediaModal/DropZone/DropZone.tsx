import { useDropZone } from '@/shared/hooks';
import { useMediaModalState } from '@/stores/mediaModalStore';
import { message } from 'antd';
import { useRef } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { useShallow } from 'zustand/shallow';
import './DropZone.css';

const DropZone: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setFile, setUrl } = useMediaModalState(
    useShallow(({ setFile, setUrl }) => ({ setFile, setUrl }))
  );

  const { overed } = useDropZone(containerRef, {
    multiple: false,
    onDrop(files) {
      if (!files || files.length === 0) return;

      const file = files[0];
      if (!file.type.startsWith('audio') && !file.type.startsWith('video')) {
        message.error('Только аудио или видео файлы');
        return;
      }

      setUrl('');
      setFile(file);
    }
  });

  return (
    <div ref={containerRef} className={`dropzone ${overed ? 'overed' : ''}`}>
      <UploadOutlined />
      <p>Перетащите сюда видео или аудио файл</p>
    </div>
  );
};

export default DropZone;
