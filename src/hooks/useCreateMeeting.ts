import { postMeeting, type CreateMeetingPayload } from '@/api/postMeeting';
import type { Meeting } from '@/types/meeting.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';

export const useCreateMeeting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postMeeting,
    onSuccess: (data, variables: CreateMeetingPayload) => {
      const newMeeting: Meeting = {
        id: data.id || Date.now(),
        date: new Date().toLocaleDateString('ru-RU'),
        title: variables.title,
        description: variables.description,
        status: 'Обработка',
        duration: '',
        projectId: variables.projectId ? Number(variables.projectId) : null
      };
      queryClient.setQueryData<Meeting[]>(['meetings'], (old = []) => [
        ...old,
        newMeeting
      ]);
      queryClient.invalidateQueries({ queryKey: ['meetings'] });

      message.success('Встреча успешно создана');
    },

    onError: (error) => {
      console.error('Ошибка при создании встречи:', error);
      message.error('Ошибка при добавлении встречи');
    }
  });
};
