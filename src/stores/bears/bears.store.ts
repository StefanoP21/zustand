import { create, type StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface Bear {
  id: number;
  name: string;
}

interface BearState {
  blackBears: number;
  polarBears: number;
  pandaBears: number;

  bears: Bear[];

  totalBears: () => number;

  changeBlackPopulationBy: (by: number) => void;
  changePolarPopulationBy: (by: number) => void;
  changePandaPopulationBy: (by: number) => void;

  doNothing: () => void;

  addBear: () => void;
  clearBears: () => void;
}

const storeApi: StateCreator<BearState, [['zustand/devtools', never]]> = (
  set,
  get
) => ({
  blackBears: 10,
  pandaBears: 5,
  polarBears: 0,

  bears: [{ id: 1, name: 'Oso #1' }],

  totalBears: () => {
    return (
      get().blackBears +
      get().pandaBears +
      get().polarBears +
      get().bears.length
    );
  },

  changeBlackPopulationBy: (by: number) =>
    set(
      (state) => ({ blackBears: state.blackBears + by }),
      false,
      'changeBlackPopulationBy'
    ),
  changePolarPopulationBy: (by: number) =>
    set(
      (state) => ({ polarBears: state.polarBears + by }),
      false,
      'changePolarPopulationBy'
    ),
  changePandaPopulationBy: (by: number) =>
    set(
      (state) => ({ pandaBears: state.pandaBears + by }),
      false,
      'changePandaPopulationBy'
    ),

  doNothing: () =>
    set((state) => ({ bears: [...state.bears] }), false, 'doNothing'),
  addBear: () =>
    set(
      (state) => ({
        bears: [
          ...state.bears,
          {
            id: state.bears.length + 1,
            name: `Oso ${state.bears.length + 1}`,
          },
        ],
      }),
      false,
      'addBear'
    ),
  clearBears: () => set({ bears: [] }, false, 'clearBears'),
});

export const useBearStore = create<BearState>()(
  devtools(persist(storeApi, { name: 'bears-store' }))
);
