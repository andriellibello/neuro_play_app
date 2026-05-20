import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Guardian, ChildProfile } from "../types";

interface AppState {
  guardian: Guardian | null;
  children: ChildProfile[];
  activeChildId: string | null;

  setGuardian: (g: Guardian) => void;
  addChild: (c: ChildProfile) => void;
  setActiveChild: (id: string) => void;
  logout: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      guardian: null,
      children: [],
      activeChildId: null,

      setGuardian: (g) => set({ guardian: g }),

      addChild: (c) =>
        set((state) => ({
          children: [...state.children, c],
          activeChildId: c.id,
        })),

      setActiveChild: (id) => set({ activeChildId: id }),

      logout: () =>
        set({ guardian: null, children: [], activeChildId: null }),
    }),
    { name: "neuro-play-store" }
  )
);
