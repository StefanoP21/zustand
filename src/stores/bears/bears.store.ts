import { create } from 'zustand';

interface BearState {
  blackBears: number;
  polarBears: number;
  pandaBears: number;
  changeBlackPopulationBy: (by: number) => void;
  changePolarPopulationBy: (by: number) => void;
  changePandaPopulationBy: (by: number) => void;
}

export const useBearStore = create<BearState>()((set) => ({
  blackBears: 10,
  pandaBears: 5,
  polarBears: 0,

  changeBlackPopulationBy: (by: number) =>
    set((state) => ({ blackBears: state.blackBears + by })),
  changePolarPopulationBy: (by: number) =>
    set((state) => ({ polarBears: state.polarBears + by })),
  changePandaPopulationBy: (by: number) =>
    set((state) => ({ pandaBears: state.pandaBears + by })),
}));
