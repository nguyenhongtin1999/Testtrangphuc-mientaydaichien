import { Environment } from '@react-three/drei';

export function LightingSystem() {
  return (
    <>
      <ambientLight intensity={0.65} />
      <directionalLight
        castShadow
        intensity={1.4}
        position={[4, 6, 2]}
        shadow-mapSize-height={2048}
        shadow-mapSize-width={2048}
      />
      <directionalLight intensity={0.35} position={[-4, 3, -2]} color="#cbd5e1" />
      <Environment preset="sunset" background={false} />
    </>
  );
}
