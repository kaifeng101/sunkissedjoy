import { create } from "zustand";
import { persist } from "zustand/middleware";
export const usePersistedStore = create(
  persist(
    (set, get) => ({
      currency: "SGD",
      setCurrency: (value) => set({ currency: value }),
    }),
    {
      name: "sunshine-joy-app",
    }
  )
);
