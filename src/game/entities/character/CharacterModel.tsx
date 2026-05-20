import { useGLTF } from '@react-three/drei';

interface Props {
  modelPath: string;
}

/**
 * Drop new character GLB files into /public/models/characters
 * and update model path mapping in CharacterViewerScene/UI store.
 */
export function CharacterModel({ modelPath }: Props) {
  const gltf = useGLTF(modelPath);
  return <primitive object={gltf.scene} position={[0, 0, 0]} />;
}

useGLTF.preload('/models/characters/MaleCharacter.glb');
useGLTF.preload('/models/characters/FemaleCharacter.glb');
