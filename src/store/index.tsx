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
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}

export const useGlobalStore = create<GlobalStore>()(
  persist(
    (set, get) => ({
      name: '',
      gameName: '',
      level: 0,
      isAdmin: false,
      setName: (name: string) => set({ name }),
      setGameName: (gameName: string) => set({ gameName }),
      setLevel: (level: number) => set({ level }),
      clear: () => set({ name: '', gameName: '', level: 0 }),
      setIsAdmin: (isAdmin: boolean) => set({ isAdmin }),
    }),
    {
      name: 'atternoodle-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
