import { Canvas } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { Suspense } from 'react';
import characters from '../../data/characters.json';
import cosmetics from '../../data/cosmetics.json';
import { useCharacterStore } from '../../stores/characterStore';
import { CharacterModel } from '../CharacterModel/CharacterModel';
import { CameraControls } from '../CameraControls/CameraControls';

function Loader(){return <Html center><div className="rounded bg-black/70 px-3 py-1 text-white">Đang tải...</div></Html>}

export function CharacterViewer() {
  const gender = useCharacterStore((s) => s.gender);
  const equipped = useCharacterStore((s) => s.equipped);
  const modelPath = characters.find((c) => c.id === gender)?.modelPath ?? characters[0].modelPath;
  const equippedItems = Object.values(equipped).map((id) => cosmetics.find((item) => item.id === id)).filter(Boolean);

  return (
    <Canvas shadows camera={{ position: [0, 1.8, 4.8], fov: 35 }}>
      <color attach="background" args={['#0f172a']} />
      <ambientLight intensity={0.7} />
      <directionalLight castShadow intensity={1.1} position={[3,5,3]} />
      <Suspense fallback={<Loader />}>
        <CharacterModel modelPath={modelPath} />
        {equippedItems.map((item, idx) => (
          <mesh key={item!.id} position={[0.8 - idx * 0.22, 0.3 + idx * 0.2, 0.3]}>
            <boxGeometry args={[0.16,0.16,0.16]} />
            <meshStandardMaterial color={item!.color} />
          </mesh>
        ))}
        <mesh rotation={[-Math.PI/2,0,0]} position={[0,0.01,0]} receiveShadow>
          <circleGeometry args={[2.2,64]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
      </Suspense>
      <CameraControls />
    </Canvas>
  );
}
