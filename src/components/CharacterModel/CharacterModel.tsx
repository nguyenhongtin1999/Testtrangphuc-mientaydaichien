import { Html, TransformControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Bone, Group, Object3D, Quaternion, SkeletonHelper, Vector3 } from 'three';
import { useModel } from '../../utils/modelLoader';

export type SocketName = 'Head' | 'Hair' | 'Chest' | 'Back' | 'LeftHand' | 'RightHand' | 'Feet' | 'PetSlot' | 'VehicleSlot';

const SOCKETS: SocketName[] = ['Head', 'Hair', 'Chest', 'Back', 'LeftHand', 'RightHand', 'Feet', 'PetSlot', 'VehicleSlot'];
const tmpPos = new Vector3();
const tmpQuat = new Quaternion();

const BONE_HINTS: Record<SocketName, RegExp[]> = {
  Head: [/head/i, /neck/i],
  Hair: [/head/i],
  Chest: [/spine2/i, /chest/i, /spine/i],
  Back: [/spine2/i, /chest/i, /spine/i],
  LeftHand: [/left.*hand/i, /hand.*l/i, /l_hand/i],
  RightHand: [/right.*hand/i, /hand.*r/i, /r_hand/i],
  Feet: [/foot/i, /calf/i],
  PetSlot: [/root/i, /hips/i],
  VehicleSlot: [/root/i, /hips/i]
};

const SOCKET_OFFSETS: Record<SocketName, [number, number, number]> = {
  Head: [0, 0.16, 0], Hair: [0, 0.24, 0], Chest: [0, 0.04, 0.1], Back: [0, 0.04, -0.14],
  LeftHand: [0, 0, 0.06], RightHand: [0, 0, 0.06], Feet: [0, -0.08, 0], PetSlot: [0.35, -0.15, 0.35], VehicleSlot: [0, -0.2, -0.6]
};

interface Props {
  modelPath: string; debugMode: boolean; selectedSocket: SocketName; transformMode: 'translate' | 'rotate' | 'scale';
  onHierarchyUpdate: (hierarchy: string[]) => void;
  onCalibrationUpdate: (data: Record<SocketName, { boneName: string; position: [number, number, number]; rotation: [number, number, number]; scale: [number, number, number] }>) => void;
}

export function CharacterModel({ modelPath, debugMode, selectedSocket, transformMode, onHierarchyUpdate, onCalibrationUpdate }: Props) {
  const gltf = useModel(modelPath);
  const modelRef = useRef<Group>(null);
  const rootRef = useRef<Group>(null);
  const socketRefs = useRef<Record<SocketName, Group>>({} as Record<SocketName, Group>);
  const [skeletonHelper, setSkeletonHelper] = useState<SkeletonHelper | null>(null);

  const data = useMemo(() => {
    const bones: Bone[] = [];
    gltf.scene.traverse((obj) => { if ((obj as Bone).isBone) bones.push(obj as Bone); });
    const pickBone = (socket: SocketName): Bone | null => BONE_HINTS[socket].map((hint) => bones.find((b) => hint.test(b.name))).find(Boolean) ?? bones[0] ?? null;
    return {
      sockets: SOCKETS.map((socket) => ({ socket, bone: pickBone(socket) })),
      hierarchy: bones.map((bone) => `${bone.parent?.name ?? 'ROOT'} -> ${bone.name}`)
    };
  }, [gltf.scene]);

  useEffect(() => { onHierarchyUpdate(data.hierarchy); }, [data.hierarchy, onHierarchyUpdate]);

  useEffect(() => {
    if (!modelRef.current) return;
    if (skeletonHelper) modelRef.current.remove(skeletonHelper);
    if (!debugMode) { setSkeletonHelper(null); return; }
    const helper = new SkeletonHelper(modelRef.current); modelRef.current.add(helper); setSkeletonHelper(helper);
    return () => modelRef.current?.remove(helper);
  }, [debugMode]);

  useFrame(() => {
    const payload = {} as Record<SocketName, { boneName: string; position: [number, number, number]; rotation: [number, number, number]; scale: [number, number, number] }>;
    data.sockets.forEach(({ socket, bone }) => {
      const socketObj = socketRefs.current[socket];
      if (!socketObj || !bone) return;
      if (selectedSocket !== socket) {
        bone.getWorldPosition(tmpPos); bone.getWorldQuaternion(tmpQuat);
        socketObj.position.copy(tmpPos); socketObj.quaternion.copy(tmpQuat);
        socketObj.translateX(SOCKET_OFFSETS[socket][0]); socketObj.translateY(SOCKET_OFFSETS[socket][1]); socketObj.translateZ(SOCKET_OFFSETS[socket][2]);
      }
      payload[socket] = { boneName: bone.name, position: [socketObj.position.x, socketObj.position.y, socketObj.position.z], rotation: [socketObj.rotation.x, socketObj.rotation.y, socketObj.rotation.z], scale: [socketObj.scale.x, socketObj.scale.y, socketObj.scale.z] };
    });
    onCalibrationUpdate(payload);
  });

  return (
    <group ref={rootRef}>
      <group ref={modelRef}><primitive object={gltf.scene} /></group>
      {data.sockets.map(({ socket, bone }) => bone && (
        <group key={socket} ref={(node) => { if (node) socketRefs.current[socket] = node; }}>
          {selectedSocket === socket ? <TransformControls object={socketRefs.current[socket] as Object3D | undefined} mode={transformMode} size={0.7} /> : null}
          <mesh><sphereGeometry args={[0.03, 12, 12]} /><meshBasicMaterial color={selectedSocket === socket ? '#f97316' : '#22d3ee'} /></mesh>
          {debugMode ? <Html distanceFactor={9} position={[0, 0.08, 0]}><div className="rounded bg-black/70 px-2 py-1 text-[10px] text-white">{socket}<br />{bone.name}</div></Html> : null}
        </group>
      ))}
    </group>
  );
}
