import { useMediaModalState } from '@/stores/mediaModalStore';
import { Input, message } from 'antd';
import { useEffect, useState } from 'react';

const isValidCloudLink = (link: string) => {
  const patterns = [
    /drive\.google\.com/,
    /docs\.google\.com/,
    /disk\.yandex\.ru/,
    /yandex\.disk/,
    /cloud\.mail\.ru/,
    /nextcloud/i
  ];

  return patterns.some((regex) => regex.test(link));
};

const LinkInput: React.FC = () => {
  const url = useMediaModalState((state) => state.url);
  const setUrl = useMediaModalState((state) => state.setUrl);

  const [inputValue, setInputValue] = useState(url);

  useEffect(() => {
    setInputValue(url);
  }, [url]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);

    if (value && isValidCloudLink(value)) {
      setUrl(value);
    } else {
      setUrl('');
    }
  };

  const handleBlur = () => {
    if (inputValue && !isValidCloudLink(inputValue)) {
      message.error('Неверная ссылка на облачное хранилище');
    }
  };
  return (
    <Input
      placeholder="Вставьте ссылку на файл из облака"
      value={inputValue}
      onChange={handleChange}
      onBlur={handleBlur}
      allowClear
    />
  );
};

export default LinkInput;
