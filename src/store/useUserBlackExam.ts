import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IUserBlackExam } from '../interface/type';

export const useUserBlackExam = create<IUserBlackExam>()(
  devtools((set) => ({
    ged_average_score: '',
    setUserGedAverageScore: (ged_average_score) => set(() => ({ ged_average_score })),
  })),
);
