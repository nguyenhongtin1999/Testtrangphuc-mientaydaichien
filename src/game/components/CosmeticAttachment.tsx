import { Html } from '@react-three/drei';
import type { CosmeticItem } from '../types/character';

interface Props { item: CosmeticItem }

export function CosmeticAttachment({ item }: Props) {
  const fallback = item.fallbackTransform;
  if (!fallback) return null;

  return (
    <group position={fallback.position} rotation={fallback.rotation} scale={fallback.scale}>
      {item.category === 'hat' && (
        <mesh>
          <coneGeometry args={[1, 0.3, 20]} />
          <meshStandardMaterial color="#ca8a04" />
        </mesh>
      )}
      {item.category === 'accessory' && (
        <mesh>
          <torusGeometry args={[0.55, 0.18, 12, 32]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.5} roughness={0.3} />
        </mesh>
      )}
      {item.category === 'pet' && (
        <mesh>
          <sphereGeometry args={[1, 20, 20]} />
          <meshStandardMaterial color="#fde68a" />
        </mesh>
      )}
      {item.category === 'vehicle' && (
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#7c3aed" />
        </mesh>
      )}
      {(item.category === 'hair' || item.category === 'shirt' || item.category === 'pants') && (
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#fb7185" roughness={0.7} />
        </mesh>
      )}
      <Html center distanceFactor={8}>
        <div className="rounded bg-black/70 px-2 py-0.5 text-[10px] text-white">{item.name}</div>
      </Html>
    </group>
  );
}
