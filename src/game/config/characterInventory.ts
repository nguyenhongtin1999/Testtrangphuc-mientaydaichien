import itemsRaw from '../data/items.json';
import type { CosmeticItem, ItemCategory, ItemRarity } from '../types/character';

export const CATEGORY_TABS: ItemCategory[] = ['hair', 'clothing', 'hats', 'pets', 'vehicles'];

export const RARITY_ORDER: Record<ItemRarity, number> = {
  common: 1,
  uncommon: 2,
  rare: 3,
  epic: 4,
  legendary: 5,
};

export const RARITY_COLORS: Record<ItemRarity, string> = {
  common: '#cbd5e1',
  uncommon: '#22c55e',
  rare: '#3b82f6',
  epic: '#a855f7',
  legendary: '#f59e0b',
};

export const ITEM_DATABASE: CosmeticItem[] = [...(itemsRaw as CosmeticItem[])].sort(
  (a, b) => RARITY_ORDER[b.rarity] - RARITY_ORDER[a.rarity],
);

export const ITEMS_BY_CATEGORY: Record<ItemCategory, CosmeticItem[]> = {
  hair: ITEM_DATABASE.filter((item) => item.category === 'hair'),
  clothing: ITEM_DATABASE.filter((item) => item.category === 'clothing'),
  hats: ITEM_DATABASE.filter((item) => item.category === 'hats'),
  pets: ITEM_DATABASE.filter((item) => item.category === 'pets'),
  vehicles: ITEM_DATABASE.filter((item) => item.category === 'vehicles'),
};
