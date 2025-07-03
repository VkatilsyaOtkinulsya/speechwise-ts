import { create } from 'zustand';

interface MediaModalState {
  isOpen: boolean;
  file: File | null;
  url: string;
  title: string;
  description: string;
  open: () => void;
  close: () => void;
  setFile: (file: File | null) => void;
  setUrl: (url: string) => void;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  reset: () => void;
}

export const useMediaModalState = create<MediaModalState>((set) => ({
  isOpen: false,
  file: null,
  url: '',
  title: '',
  description: '',
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  setFile: (file: File | null) => set({ file }),
  setUrl: (url: string) => set({ url }),
  setTitle: (title) => set({ title }),
  setDescription: (description) => set({ description }),
  reset: () => set({ file: null, url: '', title: '', description: '' })
}));
