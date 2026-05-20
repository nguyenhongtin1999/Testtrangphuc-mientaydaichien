import { useGLTF } from '@react-three/drei';

export function useModel(path: string) {
  return useGLTF(path);
}
