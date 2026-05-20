# Miền Tây Đại Chiến – Character Viewer

Cấu trúc đã được tổ chức lại theo hướng module:

```text
public/
  models/
    characters/
      MaleCharacter.glb
      FemaleCharacter.glb
    cosmetics/
      hair/
      shirts/
      pants/
      hats/
      accessories/
      pets/
      vehicles/

src/
  components/
    CharacterViewer/
    CharacterModel/
    CosmeticPanel/
    GenderSwitcher/
    CameraControls/
  data/
    cosmetics.json
    characters.json
  stores/
    characterStore.ts
  utils/
    modelLoader.ts
  App.tsx
```

## Ghi chú
- Viewer hỗ trợ chuyển giới tính Nam/Nữ.
- Cosmetic panel đọc dữ liệu từ JSON và equip runtime bằng Zustand.
- Nếu cosmetic model chưa có file GLB, hệ thống dùng placeholder primitive để test flow.
