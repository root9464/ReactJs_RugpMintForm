import { create } from 'zustand';

interface TimeState {
  time: {
    timeNow: string;
    timeStatus: string;
  };
  setTimeStatus: (time: string) => void;
}

export const useTimeStore = create<TimeState>((set) => ({
  time: {
    timeNow: '00:00:00',
    timeStatus: '',
  },
  setTimeStatus: (time: string) =>
    set((state) => ({
      time: {
        ...state.time,
        timeStatus: time,
      },
    })),
}));
