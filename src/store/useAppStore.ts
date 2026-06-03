import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Guardian, ChildProfile, AIActivityRecommendation } from "../types";

interface AppState {
  guardian: Guardian | null;
  children: ChildProfile[];
  activeChildId: string | null;
  recommendationsCache: Record<string, AIActivityRecommendation[]>;
  favorites: Record<string, AIActivityRecommendation[]>;

  setGuardian: (g: Guardian) => void;
  addChild: (c: ChildProfile) => void;
  setActiveChild: (id: string) => void;
  logout: () => void;
  setRecommendationsCache: (childId: string, recs: AIActivityRecommendation[]) => void;
  clearRecommendationsCache: (childId: string) => void;
  toggleFavorite: (childId: string, rec: AIActivityRecommendation) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      guardian: null,
      children: [],
      activeChildId: null,
      recommendationsCache: {},
      favorites: {},

      setGuardian: (g) => set({ guardian: g }),

      addChild: (c) =>
        set((state) => ({
          children: [...state.children, c],
          activeChildId: c.id,
        })),

      setActiveChild: (id) => set({ activeChildId: id }),

      logout: () =>
        set({ guardian: null, children: [], activeChildId: null, recommendationsCache: {}, favorites: {} }),

      setRecommendationsCache: (childId, recs) =>
        set((state) => ({
          recommendationsCache: { ...state.recommendationsCache, [childId]: recs },
        })),

      clearRecommendationsCache: (childId) =>
        set((state) => {
          const next = { ...state.recommendationsCache };
          delete next[childId];
          return { recommendationsCache: next };
        }),

      toggleFavorite: (childId, rec) =>
        set((state) => {
          const current = state.favorites[childId] ?? [];
          const exists = current.some((f) => f.id === rec.id);
          return {
            favorites: {
              ...state.favorites,
              [childId]: exists
                ? current.filter((f) => f.id !== rec.id)
                : [...current, rec],
            },
          };
        }),
    }),
    {
      name: "neuro-play-store",
      partialize: (state) => ({
        guardian: state.guardian,
        children: state.children,
        activeChildId: state.activeChildId,
        favorites: state.favorites,
      }),
    }
  )
);
