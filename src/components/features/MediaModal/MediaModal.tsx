import { useMediaModalState } from '@/stores/mediaModalStore';
import { Button, Input, message, Modal } from 'antd';
import { useEffect, useRef, useState } from 'react';
import DropZone from './DropZone/DropZone';
import LinkInput from './LinkInput';
import FilePreview from './FilePreview';
import { useCreateMeeting } from '@/hooks/useCreateMeeting';

const MediaModal: React.FC = () => {
  const {
    isOpen,
    close,
    file,
    url,
    reset,
    title,
    description,
    setTitle,
    setDescription
  } = useMediaModalState();
  const { mutate: createMeeting, isPending } = useCreateMeeting();

  const [duration, setDuration] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      const media = document.createElement(
        file.type.startsWith('audio') ? 'audio' : 'video'
      );
      media.preload = 'metadata';
      media.src = objectUrl;

      media.onloadedmetadata = () => {
        setDuration(media.duration);
        URL.revokeObjectURL(objectUrl);
      };
    } else {
      setDuration(null);
    }
  }, [file]);

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) {
      message.warning('Пожалуйста, заполните название и описание');
      return;
    }

    if (!file && !url) {
      message.warning('Добавьте файл или ссылку');
      return;
    }

    const payload = {
      title,
      description,
      projectId: '',
      file: file || undefined,
      url: url || undefined
    };

    createMeeting(payload);

    close();
    reset();
    setDuration(null);
  };

  return (
    <Modal
      open={isOpen}
      onCancel={() => {
        close();
        reset();
        setDuration(null);
      }}
      onOk={handleSubmit}
      title="Добавить встречу"
      okText="Добавить"
      cancelText="Отмена"
      confirmLoading={isPending}
      destroyOnHidden
      footer={[
        <Button key="cancel" onClick={close}>
          Отмена
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleSubmit}
          disabled={!file && !url}
        >
          Добавить
        </Button>
      ]}
    >
      <div ref={modalRef} className="space-y-4">
        <Input
          placeholder="Название"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input.TextArea
          rows={3}
          placeholder="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <DropZone />
        <div style={{ marginTop: 16 }}>
          <LinkInput />
        </div>
        <FilePreview duration={duration} />
      </div>
    </Modal>
  );
};

export default MediaModal;
