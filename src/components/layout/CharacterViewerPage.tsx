import { CharacterViewerScene } from '../../game/scenes/CharacterViewerScene';
import { useGameStore } from '../../game/stores/useGameStore';
import { CATEGORIES, getItemById } from '../../game/utils/cosmetics';
import { InventoryPanel } from '../ui/InventoryPanel';

export function CharacterViewerPage() {
  const gender = useGameStore((s) => s.gender);
  const setGender = useGameStore((s) => s.setGender);
  const savePreset = useGameStore((s) => s.savePreset);
  const loadPreset = useGameStore((s) => s.loadPreset);
  const resetOutfit = useGameStore((s) => s.resetOutfit);
  const exportPreset = useGameStore((s) => s.exportPreset);
  const equipped = useGameStore((s) => s.equipped);

  const copyExport = async () => {
    const payload = exportPreset();
    await navigator.clipboard.writeText(payload).catch(() => undefined);
    alert(payload);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-cyan-950 via-sky-950 to-emerald-950 p-2 text-white md:p-4">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-slate-900/80 p-2">
        <div className="flex gap-2">
          <button onClick={() => setGender('male')} className={`rounded px-3 py-1 text-sm ${gender === 'male' ? 'bg-emerald-300 text-black' : 'bg-slate-700'}`}>Nam</button>
          <button onClick={() => setGender('female')} className={`rounded px-3 py-1 text-sm ${gender === 'female' ? 'bg-emerald-300 text-black' : 'bg-slate-700'}`}>Nữ</button>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          <button onClick={savePreset} className="rounded bg-blue-400 px-2 py-1 text-black">Save</button>
          <button onClick={loadPreset} className="rounded bg-violet-400 px-2 py-1 text-black">Load</button>
          <button onClick={resetOutfit} className="rounded bg-rose-400 px-2 py-1 text-black">Reset</button>
          <button onClick={copyExport} className="rounded bg-amber-300 px-2 py-1 text-black">Export JSON</button>
        </div>
      </div>

      <section className="grid min-h-[75vh] grid-cols-1 gap-3 md:grid-cols-[2fr_1fr]">
        <div className="overflow-hidden rounded-2xl border border-emerald-300/20"><CharacterViewerScene /></div>
        <InventoryPanel />
      </section>

      <footer className="mt-2 rounded-xl bg-slate-900/80 p-2 text-xs">
        <p className="mb-1 font-semibold text-emerald-200">Outfit Summary</p>
        <div className="grid grid-cols-2 gap-1 md:grid-cols-4">
          {CATEGORIES.map((cat) => <span key={cat}>{cat}: {getItemById(equipped[cat])?.name ?? 'Trống'}</span>)}
        </div>
      </footer>
    </main>
  );
}
