import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { IGradeElement, InputType } from '../interface/type';

export const useGradeElement = create<IGradeElement>()(
  persist(
    devtools((set) => ({
      gradeElement: [
        ['X', 'X', 'X', 'X', 'X', 'X', 'X'],
        ['X', 'X', 'X', 'X', 'X', 'X', 'X'],
        ['X', 'X', 'X', 'X', 'X', 'X', 'X'],
        ['X', 'X', 'X', 'X', 'X', 'X', 'X'],
        ['', '', '', '', ''],
        ['', '', ''],
      ],
      setElementValue: (current: number, index: number, value: string) =>
        set((state) => {
          const copiedItems = [...state.gradeElement];
          copiedItems[current][index] = value;
          return { gradeElement: copiedItems };
        }),
      setAllGrade: (current: number, grade: string) =>
        set((state) => {
          const copiedItems = [...state.gradeElement];
          copiedItems[current] = copiedItems[current].map(() => {
            return grade;
          });
          return { gradeElement: [...copiedItems] };
        }),
      setWriteValue: (e: InputType, current: number, index: number) =>
        set((state) => {
          const copiedItems = [...state.gradeElement];
          const { value } = e.currentTarget;
          copiedItems[current][index] = value;
          return { gradeElement: [...copiedItems] };
        }),
    })),
    {
      name: 'user_grade',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
