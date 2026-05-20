import { OrbitControls } from '@react-three/drei';

export function CameraControls() {
  return <OrbitControls makeDefault enablePan={false} target={[0, 1.3, 0]} minDistance={2.8} maxDistance={6} enableDamping dampingFactor={0.08} />;
}
