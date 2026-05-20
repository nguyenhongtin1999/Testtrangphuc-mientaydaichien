import { Canvas } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { Suspense, useMemo, useState } from 'react';
import characters from '../../data/characters.json';
import cosmetics from '../../data/cosmetics.json';
import { useCharacterStore } from '../../stores/characterStore';
import { CharacterModel, SocketName } from '../CharacterModel/CharacterModel';
import { CameraControls } from '../CameraControls/CameraControls';

function Loader(){return <Html center><div className="rounded bg-black/70 px-3 py-1 text-white">Đang tải...</div></Html>}

export function CharacterViewer() {
  const gender = useCharacterStore((s) => s.gender);
  const equipped = useCharacterStore((s) => s.equipped);
  const modelPath = characters.find((c) => c.id === gender)?.modelPath ?? characters[0].modelPath;
  const equippedItems = Object.values(equipped).map((id) => cosmetics.find((item) => item.id === id)).filter(Boolean);

  const [debugMode, setDebugMode] = useState(true);
  const [hierarchy, setHierarchy] = useState<string[]>([]);
  const [selectedSocket, setSelectedSocket] = useState<SocketName>('Head');
  const [transformMode, setTransformMode] = useState<'translate' | 'rotate' | 'scale'>('translate');
  const [calibration, setCalibration] = useState<Record<string, unknown>>({});

  const hierarchyPreview = useMemo(() => hierarchy.slice(0, 40), [hierarchy]);

  const exportCalibration = () => {
    const blob = new Blob([JSON.stringify(calibration, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `socket-calibration-${gender}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative h-full min-h-[78vh]">
      <Canvas shadows camera={{ position: [0, 1.8, 4.8], fov: 35 }}>
        <color attach="background" args={['#0f172a']} />
        <ambientLight intensity={0.7} />
        <directionalLight castShadow intensity={1.1} position={[3,5,3]} />
        <Suspense fallback={<Loader />}>
          <CharacterModel
            modelPath={modelPath}
            debugMode={debugMode}
            selectedSocket={selectedSocket}
            transformMode={transformMode}
            onHierarchyUpdate={setHierarchy}
            onCalibrationUpdate={setCalibration}
          />
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

      <div className="absolute left-2 top-2 z-10 max-h-[95%] w-[320px] overflow-auto rounded bg-slate-900/85 p-2 text-xs text-white">
        <div className="mb-2 flex items-center justify-between">
          <strong>Skeleton Debug</strong>
          <button className="rounded bg-cyan-700 px-2 py-1" onClick={() => setDebugMode((v) => !v)}>{debugMode ? 'Hide' : 'Show'}</button>
        </div>
        <div className="mb-2 grid grid-cols-3 gap-1">
          {(['translate','rotate','scale'] as const).map((mode) => (
            <button key={mode} className={`rounded px-2 py-1 ${transformMode === mode ? 'bg-emerald-700' : 'bg-slate-700'}`} onClick={() => setTransformMode(mode)}>{mode}</button>
          ))}
        </div>
        <div className="mb-2 grid grid-cols-3 gap-1">
          {(['Head','Hair','Chest','Back','LeftHand','RightHand','Feet','PetSlot','VehicleSlot'] as SocketName[]).map((socket) => (
            <button key={socket} className={`rounded px-2 py-1 ${selectedSocket === socket ? 'bg-orange-700' : 'bg-slate-700'}`} onClick={() => setSelectedSocket(socket)}>{socket}</button>
          ))}
        </div>
        <button className="mb-2 w-full rounded bg-indigo-700 px-2 py-1" onClick={exportCalibration}>Export calibration JSON</button>
        <div className="mb-1 font-semibold">Bone hierarchy ({hierarchy.length})</div>
        <pre className="max-h-56 overflow-auto rounded bg-black/40 p-2 text-[10px]">{hierarchyPreview.join('\n')}</pre>
      </div>
    </div>
  );
}
