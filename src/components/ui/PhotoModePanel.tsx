import { useState } from 'react';
import { useGameStore } from '../../game/stores/useGameStore';

const poses = ['idle', 'hero', 'peace', 'dance'] as const;
const emotes = ['none', 'wave', 'laugh', 'heart'] as const;
const cams = ['default', 'cinematic-close', 'cinematic-wide'] as const;

export function PhotoModePanel() {
  const pose = useGameStore((s) => s.pose);
  const setPose = useGameStore((s) => s.setPose);
  const emote = useGameStore((s) => s.emote);
  const setEmote = useGameStore((s) => s.setEmote);
  const cameraMode = useGameStore((s) => s.cameraMode);
  const setCameraMode = useGameStore((s) => s.setCameraMode);
  const [status, setStatus] = useState('');

  const capture = async () => {
    const canvas = document.querySelector('canvas');
    if (!(canvas instanceof HTMLCanvasElement)) return;
    const data = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `mtdc-photo-${Date.now()}.png`;
    link.href = data;
    link.click();
    try { await navigator.clipboard.writeText(link.download); } catch {}
    setStatus('Captured! Ready to share.');
  };

  return (
    <section className="absolute right-0 top-0 z-20 w-full bg-slate-950/80 p-3 backdrop-blur md:w-80 md:rounded-bl-xl">
      <h3 className="text-xs uppercase tracking-[0.2em] text-brand">Photo Mode · Mekong Vibes</h3>
      <div className="mt-2 grid grid-cols-3 gap-1 text-xs">
        {poses.map((p) => <button key={p} onClick={() => setPose(p)} className={`rounded px-2 py-1 ${pose===p?'bg-brand text-black':'bg-slate-800'}`}>{p}</button>)}
      </div>
      <div className="mt-2 grid grid-cols-4 gap-1 text-xs">
        {emotes.map((e) => <button key={e} onClick={() => setEmote(e)} className={`rounded px-2 py-1 ${emote===e?'bg-pink-400 text-black':'bg-slate-800'}`}>{e}</button>)}
      </div>
      <div className="mt-2 flex gap-1 text-xs">
        {cams.map((c) => <button key={c} onClick={() => setCameraMode(c)} className={`rounded px-2 py-1 ${cameraMode===c?'bg-cyan-400 text-black':'bg-slate-800'}`}>{c}</button>)}
      </div>
      <button onClick={capture} className="mt-3 w-full rounded bg-brand px-3 py-2 text-sm font-semibold text-black">Capture Screenshot</button>
      <p className="mt-1 text-xs text-slate-300">{status || 'Use cinematic camera + pose for share-ready framing.'}</p>
    </section>
  );
}
