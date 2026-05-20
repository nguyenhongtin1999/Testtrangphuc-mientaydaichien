import type { EquipmentState, SyncEquipmentPayload } from '../types/character';

export interface MultiplayerEquipmentSnapshot {
  playerId: string;
  equipment: EquipmentState;
  revision: number;
}

export function toSyncPayload(snapshot: MultiplayerEquipmentSnapshot): SyncEquipmentPayload {
  return {
    ...snapshot,
    timestamp: new Date().toISOString(),
  };
}
