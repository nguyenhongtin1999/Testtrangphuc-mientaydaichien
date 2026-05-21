import { create } from 'zustand';

type Gender = 'male' | 'female';
type Category = 'hair' | 'shirts' | 'pants' | 'hats' | 'accessories' | 'pets' | 'vehicles';
type Equipped = Partial<Record<Category, string>>;

interface State {
  gender: Gender;
  equipped: Equipped;
  activeCategory: Category;
  setGender: (g: Gender) => void;
  setActiveCategory: (c: Category) => void;
  equip: (category: Category, itemId: string) => void;
}

export const useCharacterStore = create<State>((set) => ({
  gender: 'male',
  equipped: {},
  activeCategory: 'hair',
  setGender: (gender) => set({ gender }),
  setActiveCategory: (activeCategory) => set({ activeCategory }),
  equip: (category, itemId) => set((state) => ({ equipped: { ...state.equipped, [category]: itemId } })),
}));
