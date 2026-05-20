import type { CharacterAttachPoint } from '../types/character';

export const ATTACH_POINTS_FALLBACK: Record<CharacterAttachPoint, [number, number, number]> = {
  Head: [0, 2.85, 0],
  Hair: [0, 2.75, 0.05],
  Chest: [0, 1.65, 0.2],
  Back: [0, 1.7, -0.25],
  LeftHand: [-0.65, 1.5, 0],
  RightHand: [0.65, 1.5, 0],
  Feet: [0, 0.72, 0],
  PetSlot: [0.95, 0.35, 0.2],
  VehicleSlot: [0, -0.05, -0.2],
};
