import api from './api';
import type { Meeting } from '../types/meeting.type';

const MEETINGS_URL = import.meta.env.VITE_GET_RECORDS_URL;

export const getMeetings = async (): Promise<Meeting[]> => {
  // const response = await api.get<Meeting[]>(`${MEETINGS_URL}`, {});
  // return response.data;

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
