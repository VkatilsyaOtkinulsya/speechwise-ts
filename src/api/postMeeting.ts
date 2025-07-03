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
