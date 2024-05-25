import { StateCreator } from 'zustand';

export interface GuestSlice {
  guestCount: number;

  setGuestCount: (guestCount: number) => void;
}

export const CreateGuestSlice: StateCreator<
  GuestSlice,
  [['zustand/devtools', never]]
> = (set) => ({
  guestCount: 0,

  setGuestCount: (guestCount) => set({ guestCount }, false, 'setGuestCount'),
});
