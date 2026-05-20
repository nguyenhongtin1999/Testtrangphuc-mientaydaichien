import cosmetics from '../data/cosmetics.json';
import type { CosmeticCategory, CosmeticItem, Gender } from '../types/character';

export const CATEGORIES: CosmeticCategory[] = ['hair', 'shirt', 'pants', 'hat', 'accessory', 'pet', 'vehicle'];

export const COSMETIC_DATABASE = cosmetics as CosmeticItem[];

export function getItemsByCategoryAndGender(category: CosmeticCategory, gender: Gender) {
  return COSMETIC_DATABASE.filter(
    (item) => item.category === category && item.isOwned && (item.genderSupport.includes('unisex') || item.genderSupport.includes(gender)),
  );
}

export function getItemById(id?: string) {
  if (!id) return undefined;
  return COSMETIC_DATABASE.find((item) => item.id === id);
}
