import { Html, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { CharacterRig } from '../entities/character/CharacterRig';

function Loader() {
  return (
    <Html center>
      <div className="rounded-lg bg-black/70 px-4 py-2 text-sm text-white">Đang tải nhân vật...</div>
    </Html>
  );
}

export function CharacterViewerScene() {
  return (
    <Canvas shadows dpr={[1, 1.7]} camera={{ position: [0, 1.8, 4.8], fov: 35 }}>
      <color attach="background" args={['#0f172a']} />
      <hemisphereLight intensity={0.8} groundColor="#164e63" />
      <directionalLight castShadow intensity={1.4} position={[3, 6, 3]} shadow-mapSize-height={2048} shadow-mapSize-width={2048} />
      <spotLight position={[-3, 4, 2]} intensity={0.5} color="#99f6e4" />

      <Suspense fallback={<Loader />}>
        <CharacterRig />
      </Suspense>

      <OrbitControls makeDefault enablePan={false} target={[0, 1.4, 0]} minDistance={2.8} maxDistance={6.2} enableDamping dampingFactor={0.08} />
    </Canvas>
  );
}
