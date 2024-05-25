import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { CreatePersonSlice, PersonSlice } from './person.slice';

type SharedState = PersonSlice;

export const useWeddingBoundStore = create<SharedState>()(
  devtools((...a) => ({
    ...CreatePersonSlice(...a),
  }))
);
