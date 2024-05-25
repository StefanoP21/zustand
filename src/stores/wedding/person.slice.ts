import { StateCreator } from 'zustand';

export interface PersonSlice {
  firstName: string;
  lastName: string;

  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
}

export const CreatePersonSlice: StateCreator<
  PersonSlice,
  [['zustand/devtools', never]]
> = (set) => ({
  firstName: '',
  lastName: '',

  setFirstName: (firstName) => set({ firstName }, false, 'setFirstName'),
  setLastName: (lastName) => set({ lastName }, false, 'setLastName'),
});
