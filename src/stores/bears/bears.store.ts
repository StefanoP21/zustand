import { create } from 'zustand';

interface Bear {
  id: number;
  name: string;
}

interface BearState {
  blackBears: number;
  polarBears: number;
  pandaBears: number;

  bears: Bear[];

  changeBlackPopulationBy: (by: number) => void;
  changePolarPopulationBy: (by: number) => void;
  changePandaPopulationBy: (by: number) => void;

  doNothing: () => void;
}

export const useBearStore = create<BearState>()((set) => ({
  blackBears: 10,
  pandaBears: 5,
  polarBears: 0,

  bears: [{ id: 1, name: 'Oso #1' }],

  changeBlackPopulationBy: (by: number) =>
    set((state) => ({ blackBears: state.blackBears + by })),
  changePolarPopulationBy: (by: number) =>
    set((state) => ({ polarBears: state.polarBears + by })),
  changePandaPopulationBy: (by: number) =>
    set((state) => ({ pandaBears: state.pandaBears + by })),

  doNothing: () => set((state) => ({ bears: [...state.bears] })),
}));
