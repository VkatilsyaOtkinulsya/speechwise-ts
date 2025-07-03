import { create } from 'zustand';
import type { Meeting } from '@/types/meeting.type';
import { devtools } from 'zustand/middleware';

interface MeetingsState {
  meetings: Meeting[];
  setMeetings: (meetings: Meeting[]) => void;
  updateMeeting: (updatedMeeting: Partial<Meeting> & { id: number }) => void;
  deleteMeeting: (id: number) => void;
}

export const useMeetingsStore = create<MeetingsState>()(
  devtools((set, get) => ({
    meetings: [],
    setMeetings: (meetings) => set({ meetings }),

    updateMeeting: (updatedMeeting) => {
      const current = get().meetings;
      const updated = current.map((m) =>
        m.id === updatedMeeting.id ? { ...m, ...updatedMeeting } : m
      );
      set({ meetings: updated });
    },

    deleteMeeting: (id) => {
      const current = get().meetings;
      const filtered = current.filter((m) => m.id !== id);
      set({ meetings: filtered });
    }
  }))
);
