import type { Meeting } from '@/types/meeting.type';
import api from './api';

const MEETINGS_URL = import.meta.env.VITE_GET_RECORDS_URL;
export const getMeeting = async (id: number): Promise<Meeting> => {
  const response = await api.get<Meeting>(`${MEETINGS_URL}/${id}`, {});
  return response.data;
};
