import { getMediaDuration } from '@/utils/lib/getMediaDuration';
import api from './api';
import type {
  CreateMeetingPayload,
  CreateMeetingResponse,
  Meeting
} from '@/types/meeting.type';

const MEETINGS_URL = import.meta.env.VITE_GET_RECORDS_URL;
const POST_MEETINGS_URL = import.meta.env.VITE_POST_RECORD_URL;
const DELETE_MEETINGS_URL = import.meta.env.VITE_DELETE_RECORD_URL;

export const getMeetings = async (): Promise<Meeting[]> => {
  const response = await api.get<Meeting[]>(`${MEETINGS_URL}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};

export const createMeeting = async (
  data: CreateMeetingPayload
): Promise<CreateMeetingResponse> => {
  if (data.file) {
    const duration = await getMediaDuration(data.file);

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    if (data.projectId) formData.append('project_id', `${data.projectId}`);
    formData.append('video', data.file);
    formData.append('duration', Math.round(duration).toString());

    const response = await api.post<Meeting>(POST_MEETINGS_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  } else if (data.link) {
    const response = await api.post<Meeting>(POST_MEETINGS_URL, {
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

export const deleteMeeting = async (id: number): Promise<void> => {
  await api.post(`${DELETE_MEETINGS_URL}`, { data: id });
};
