import { StateCreator } from 'zustand';

export interface ConfirmationSLice {
  isConfirmed: boolean;

  setIsConfirmed: (value: boolean) => void;
}

export const CreateConfirmationSlice: StateCreator<
  ConfirmationSLice,
  [['zustand/devtools', never]]
> = (set) => ({
  isConfirmed: true,

  setIsConfirmed: (value) =>
    set({ isConfirmed: value }, false, 'setIsConfirmed'),
});
