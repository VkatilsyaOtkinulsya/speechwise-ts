import { create } from 'zustand';
import type { Meeting } from '@/types/meeting.type';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

interface MeetingsFilerState {
  filter: string;
  dateRange: [Dayjs | null, Dayjs | null];
  setFilter: (filter: string) => void;
  setDateRange: (range: [Dayjs | null, Dayjs | null]) => void;
  getProjectTitle: (
    projectId: number | undefined,
    projects: { id: number; title: string }[]
  ) => string;
  filterAndSortMeetings: (
    meetings: Meeting[],
    projects: { id: number; title: string }[]
  ) => Meeting[];
  resetFilters: () => void;
}

export const useMeetingsFilterStore = create<MeetingsFilerState>()(
  (set, get) => ({
    filter: '',
    dateRange: [null, null],
    setFilter: (filter) => set({ filter }),
    setDateRange: (dateRange) => set({ dateRange }),

    getProjectTitle: (projectId: number | undefined, projects) => {
      if (projectId === null) return 'Нет проекта';
      const project = projects.find((p) => p.id === projectId);
      return project ? project.title : 'Неизвестный проект';
    },

    filterAndSortMeetings: (meetings, projects) => {
      const { filter, dateRange, getProjectTitle } = get();

      const filteredMeetings = meetings.filter((meeting) => {
        const projectTitle = getProjectTitle(
          meeting.projectId ?? undefined,
          projects
        ).toLowerCase();
        const matchProject = projectTitle.includes(filter.toLowerCase());

        const meetingDate = dayjs(meeting.create_at, 'DD.MM.YYYY');
        const [start, end] = dateRange;

        const matchDate =
          !start ||
          !end ||
          (meetingDate.isSameOrAfter(start, 'day') &&
            meetingDate.isSameOrBefore(end, 'day'));

        return matchProject && matchDate;
      });

      const sortedMeetings = [...filteredMeetings].sort((a, b) => {
        const dateA = dayjs(a.create_at, 'DD.MM.YYYY');
        const dateB = dayjs(b.create_at, 'DD.MM.YYYY');
        return dateB.valueOf() - dateA.valueOf();
      });

      return sortedMeetings;
    },
    resetFilters: () => set({ filter: '', dateRange: [null, null] })
  })
);
