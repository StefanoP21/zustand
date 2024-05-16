import { create } from 'zustand';

interface BearState {
  blackBears: number;
  pandaBears: number;
  polarBears: number;
  increaseBlackPopulationBy: (by: number) => void;
}

const useBearStore = create<BearState>()((set) => ({
  blackBears: 10,
  pandaBears: 5,
  polarBears: 0,
  increaseBlackPopulationBy: (by: number) =>
    set((state) => ({ blackBears: state.blackBears + by })),
}));
