import type { Meeting } from '@/types/meeting.type';
import api from './api';

const POST_MEETINGS_URL = import.meta.env.VITE_POST_RECORD_URL;

export type CreateMeetingPayload = {
  title: string;
  description: string;
  projectId?: string;
  file?: File;
  link?: string;
};

import type { AxiosResponse } from 'axios';

export const postMeeting = async (
  data: CreateMeetingPayload
): Promise<Meeting> => {
  if (data.file) {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    if (data.projectId) formData.append('project_id', data.projectId);
    formData.append('video', data.file);

    const response = await api.post<Meeting>(POST_MEETINGS_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  } else if (data.link) {
    const response = await api.post<Meeting>(`${POST_MEETINGS_URL}`, {
      title: data.title,
      description: data.description,
      project_id: data.projectId,
      link: data.link
    });
    return response.data;
  } else {
    throw new Error('Meeting must have a video or a link');
  }
};

export const createMeeting = async (data: CreateMeetingPayload) => {
  if (data.file) {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    if (data.projectId) formData.append('project_id', data.projectId);
    formData.append('video', data.file);

    return api.post<AxiosResponse<Meeting[]>>('/api/videos/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  } else if (data.link) {
    return api.post('/meetings', {
      title: data.title,
      description: data.description,
      project_id: data.projectId,
      link: data.link
    });
  } else {
    throw new Error('Meeting must have a video or a link');
  }
};

export const getMeetings = async (): Promise<Meeting[]> => {
  return [
    {
      id: 1,
      date: '28.06.2025',
      title: 'Совещание 1',
      description: 'Описание встречи',
      status: 'Обработка',
      duration: '1ч 30м',
      projectId: 1
    },
    {
      id: 2,
      date: '29.06.2025',
      title: 'Планирование',
      description: 'Описание встречи',
      status: 'Обработка',
      duration: '2ч',
      projectId: null
    },
    {
      id: 3,
      date: '27.06.2025',
      title: 'Обсуждение',
      description: 'Описание встречи',
      status: 'Обработка',
      duration: '1ч',
      projectId: 1
    },
    {
      id: 4,
      date: '30.06.2025',
      title: 'Ретроспектива',
      description: 'Описание встречи',
      status: 'Обработка',
      duration: '1ч 15м',
      projectId: null
    },
    {
      id: 5,
      date: '26.06.2025',
      title: 'Презентация',
      description: 'Описание встречи',
      status: 'Обработка',
      duration: '2ч 30м',
      projectId: 1
    }
  ];
};
