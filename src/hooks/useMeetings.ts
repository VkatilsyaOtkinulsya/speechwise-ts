import { createMeeting, deleteMeeting, getMeetings } from '@/api/meetings';
import type { CreateMeetingPayload, Meeting } from '@/types/meeting.type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/authStore';
import { message } from 'antd';

export function useMeetings() {
  const isAuthorized = useAuthStore((state) => state.isAuthorized('user'));
  const { data, isLoading, error, refetch } = useQuery<Meeting[]>({
    queryKey: ['meetings'],
    queryFn: getMeetings,
    enabled: isAuthorized,
    staleTime: 60 * 5000
  });

  return {
    meetings: data || [],
    isLoading,
    error,
    refetch
  };
}

export const useCreateMeeting = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createMeeting,
    onSuccess: (data, variables: CreateMeetingPayload) => {
      const newMeeting: Meeting = {
        id: data.id,
        title: variables.title,
        description: variables.description,
        status: 'Обработка',
        duration: data.duration,
        projectId: variables.projectId ?? undefined,
        create_at: data.create_at
      };
      queryClient.setQueryData<Meeting[]>(['meetings'], (old = []) => [
        ...old,
        newMeeting
      ]);

      message.success('Встреча успешно создана');
    },

    onError: (error) => {
      console.error('Ошибка при создании встречи:', error);
    }
  });
};

export const useDeleteMeeting = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMeeting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meetings'] });
      message.success('Встреча успешно удалена');
    },
    onError: (error) => {
      console.error('Ошибка при удалении встречи:', error);
    }
  });
};
