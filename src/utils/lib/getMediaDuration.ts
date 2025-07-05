export const getMediaDuration = (file: File): Promise<number> => {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const media = document.createElement('video');

    media.preload = 'metadata';
    media.src = url;

    media.onloadedmetadata = () => {
      URL.revokeObjectURL(url);
      const duration = media.duration;
      resolve(duration);
    };

    media.onerror = (e) => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load media metadata'));
    };
  });
};
