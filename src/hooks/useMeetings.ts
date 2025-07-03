import { getMeetings } from '@/api/getMeetings';
import type { Meeting } from '@/types/meeting.type';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/authStore';

export function useMeetings() {
  const { data, isLoading, error, refetch } = useQuery<Meeting[]>({
    queryKey: ['meetings'],
    queryFn: getMeetings,
    enabled: useAuthStore.getState().isAuthorized('user'),
    staleTime: 60 * 5000
  });

  return {
    meetings: data || [],
    isLoading,
    error,
    refetch
  };
}
