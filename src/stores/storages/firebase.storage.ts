import { createJSONStorage, type StateStorage } from 'zustand/middleware';

const firebaseUrl = import.meta.env.VITE_FIREBASE_URL;

const storageApi: StateStorage = {
  getItem: async function (name: string): Promise<string | null> {
    try {
      const data = await fetch(`${firebaseUrl}/${name}.json`).then((res) =>
        res.json()
      );

      return JSON.stringify(data);
    } catch (error) {
      throw error;
    }
  },
  setItem: async function (name: string, value: string): Promise<void> {
    try {
      await fetch(`${firebaseUrl}/${name}.json`, {
        method: 'PUT',
        body: value,
      }).then((res) => res.json());
    } catch (error) {
      throw error;
    }
  },
  removeItem: function (name: string): void {
    console.log('removeItem', name);
  },
};

export const firebaseStorage = createJSONStorage(() => storageApi);
