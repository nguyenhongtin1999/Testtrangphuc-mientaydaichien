import { useMemo } from 'react';
import { useGameStore } from '../../stores/useGameStore';
import { getItemById } from '../../utils/cosmetics';
import { CosmeticAttachment } from '../../components/CosmeticAttachment';
import { CharacterModel } from './CharacterModel';

const characterModelByGender = {
  male: '/models/characters/MaleCharacter.glb',
  female: '/models/characters/FemaleCharacter.glb',
};

export function CharacterRig() {
  const gender = useGameStore((s) => s.gender);
  const equipped = useGameStore((s) => s.equipped);

  const equippedItems = useMemo(() => Object.values(equipped).map((id) => getItemById(id)).filter(Boolean), [equipped]);

  return (
    <group>
      <CharacterModel modelPath={characterModelByGender[gender]} />

      {equippedItems.map((item) => (
        <CosmeticAttachment key={item!.id} item={item!} />
      ))}

      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <circleGeometry args={[2.3, 64]} />
        <meshStandardMaterial color="#1f2937" roughness={0.95} />
      </mesh>
    </group>
  );
}
