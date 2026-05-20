export type Gender = 'male' | 'female';

export type CosmeticCategory = 'hair' | 'shirt' | 'pants' | 'hat' | 'accessory' | 'pet' | 'vehicle';

export type CharacterAttachPoint =
  | 'Head'
  | 'Hair'
  | 'Chest'
  | 'Back'
  | 'LeftHand'
  | 'RightHand'
  | 'Feet'
  | 'PetSlot'
  | 'VehicleSlot';

export type ItemRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface CosmeticItem {
  id: string;
  name: string;
  category: CosmeticCategory;
  genderSupport: Array<Gender | 'unisex'>;
  rarity: ItemRarity;
  thumbnail: string;
  modelPath: string;
  attachPoint: CharacterAttachPoint;
  isOwned: boolean;
  fallbackTransform?: {
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number, number];
  };
}

export type EquippedCosmetics = Partial<Record<CosmeticCategory, string>>;

export interface ViewerPreset {
  gender: Gender;
  equipped: EquippedCosmetics;
}
