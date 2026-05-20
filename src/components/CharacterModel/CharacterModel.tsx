import { useModel } from '../../utils/modelLoader';

interface Props { modelPath: string }

export function CharacterModel({ modelPath }: Props) {
  const gltf = useModel(modelPath);
  return <primitive object={gltf.scene} />;
}
