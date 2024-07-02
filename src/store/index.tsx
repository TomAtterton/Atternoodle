import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface GlobalStore {
  name: string;
  gameName: string;
  setName: (name: string) => void;
  setGameName: (gameName: string) => void;
  clear: () => void;
}

export const useGlobalStore = create<GlobalStore>()(
  persist(
    (set, get) => ({
      name: '',
      gameName: '',
      setName: (name: string) => set({ name }),
      setGameName: (gameName: string) => set({ gameName }),
      clear: () => set({ name: '', gameName: '' }),
    }),
    {
      name: 'atternoodle-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
