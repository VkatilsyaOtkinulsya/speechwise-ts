import api from './api';
import type { Meeting } from '../types/meeting.type';

const MEETINGS_URL = import.meta.env.VITE_GET_RECORDS_URL;

export const getMeetings = async (): Promise<Meeting[]> => {
  const response = await api.get<Meeting[]>(`${MEETINGS_URL}`, {});
  return response.data;
};
