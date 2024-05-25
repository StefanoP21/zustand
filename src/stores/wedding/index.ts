import { create } from 'zustand';

import { CreatePersonSlice, PersonSlice } from './person.slice';

type SharedState = PersonSlice;

export const useWeddingBoundStore = create<SharedState>()((...a) => ({
  ...CreatePersonSlice(...a),
}));
