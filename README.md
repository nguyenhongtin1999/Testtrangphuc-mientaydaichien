# Miền Tây Đại Chiến – Character Viewer & Modular Cosmetic Testing

## What is included
- Vite + React + TypeScript + R3F + Drei + Zustand setup.
- Male/Female character switching with responsive viewer layout.
- Orbit full-body preview camera and loading fallback.
- JSON-driven cosmetic inventory with equip/unequip.
- Local save/load preset, reset outfit, export outfit JSON.
- Placeholder modular attachments for missing cosmetic GLB files.

## How to add new character models
1. Put GLB files in `public/models/characters/`.
2. Update paths in `src/game/entities/character/CharacterRig.tsx` (`characterModelByGender`).
3. Ensure model scale/origin is compatible with framing in `CharacterViewerScene.tsx`.

## How to add new cosmetic items
1. Add item records in `src/game/data/cosmetics.json`.
2. Fill fields: `id`, `name`, `category`, `genderSupport`, `rarity`, `thumbnail`, `modelPath`, `attachPoint`, `isOwned`.
3. For items without model files, set `fallbackTransform` so primitives appear at correct attach location.

## How modular attach points work
- Core attach points: `Head`, `Hair`, `Chest`, `Back`, `LeftHand`, `RightHand`, `Feet`, `PetSlot`, `VehicleSlot`.
- Current system uses safe fallback transforms from item data (root-relative placement).
- Future GLB cosmetic loading can attach to real bones once skeleton names are finalized.

## Current limitations
- Cosmetic GLB assets are represented by primitives for now.
- Bone-level attachment is not yet enabled (skeleton mapping pending).
- Export JSON currently displays via alert and clipboard copy.

## Next steps
- Add bone-name mapping and socket attachment for real cosmetic GLB.
- Add thumbnail image assets and rarity filters/sorting.
- Add multiplayer sync transport layer (WebSocket) for equipped state broadcast.
- Add screenshot/photo mode as separate share workflow.
