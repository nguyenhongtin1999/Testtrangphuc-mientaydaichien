import { create } from 'zustand';
import type { CosmeticCategory, EquippedCosmetics, Gender, ViewerPreset } from '../types/character';
import { CATEGORIES } from '../utils/cosmetics';

const STORAGE_KEY = 'mtdc.viewer.preset.v1';

interface GameState {
  gender: Gender;
  activeCategory: CosmeticCategory;
  equipped: EquippedCosmetics;
  setGender: (gender: Gender) => void;
  setActiveCategory: (category: CosmeticCategory) => void;
  equipItem: (category: CosmeticCategory, itemId: string) => void;
  unequipItem: (category: CosmeticCategory) => void;
  resetOutfit: () => void;
  savePreset: () => void;
  loadPreset: () => void;
  exportPreset: () => string;
}

const defaultPreset: ViewerPreset = { gender: 'male', equipped: {} };

function readStoredPreset(): ViewerPreset {
  if (typeof window === 'undefined') return defaultPreset;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultPreset;
    return { ...defaultPreset, ...(JSON.parse(raw) as ViewerPreset) };
  } catch {
    return defaultPreset;
  }
}

function writePreset(preset: ViewerPreset) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preset));
}

const initial = readStoredPreset();

export const useGameStore = create<GameState>((set, get) => ({
  gender: initial.gender,
  activeCategory: CATEGORIES[0],
  equipped: initial.equipped,
  setGender: (gender) => set({ gender }),
  setActiveCategory: (activeCategory) => set({ activeCategory }),
  equipItem: (category, itemId) => set((state) => ({ equipped: { ...state.equipped, [category]: itemId } })),
  unequipItem: (category) =>
    set((state) => {
      const next = { ...state.equipped };
      delete next[category];
      return { equipped: next };
    }),
  resetOutfit: () => set({ equipped: {}, activeCategory: CATEGORIES[0] }),
  savePreset: () => {
    const state = get();
    writePreset({ gender: state.gender, equipped: state.equipped });
  },
  loadPreset: () => {
    const preset = readStoredPreset();
    set({ gender: preset.gender, equipped: preset.equipped });
  },
  exportPreset: () => {
    const state = get();
    return JSON.stringify({ gender: state.gender, equipped: state.equipped }, null, 2);
  },
}));
