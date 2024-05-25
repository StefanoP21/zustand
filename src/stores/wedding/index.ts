import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { CreatePersonSlice, PersonSlice } from './person.slice';
import { CreateGuestSlice, GuestSlice } from './guest.slice';
import { CreateDateSlice, DateSlice } from './date.slice';

type SharedState = PersonSlice & GuestSlice & DateSlice;

export const useWeddingBoundStore = create<SharedState>()(
  devtools((...a) => ({
    ...CreatePersonSlice(...a),
    ...CreateGuestSlice(...a),
    ...CreateDateSlice(...a),
  }))
);
