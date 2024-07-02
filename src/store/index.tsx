import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface GlobalStore {
  name: string;
  gameName: string;
  level: number;
  setName: (name: string) => void;
  setGameName: (gameName: string) => void;
  setLevel: (level: number) => void;
  clear: () => void;
}

export const useGlobalStore = create<GlobalStore>()(
  persist(
    (set, get) => ({
      name: '',
      gameName: '',
      level: 0,
      setName: (name: string) => set({ name }),
      setGameName: (gameName: string) => set({ gameName }),
      setLevel: (level: number) => set({ level }),
      clear: () => set({ name: '', gameName: '', level: 0 }),
    }),
    {
      name: 'atternoodle-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
