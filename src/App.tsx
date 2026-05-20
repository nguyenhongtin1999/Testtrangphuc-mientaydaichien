import { CharacterViewer } from './components/CharacterViewer/CharacterViewer';
import { CosmeticPanel } from './components/CosmeticPanel/CosmeticPanel';
import { GenderSwitcher } from './components/GenderSwitcher/GenderSwitcher';

export default function App() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-cyan-950 to-emerald-950 p-3 text-white md:p-4">
      <header className="mb-3 flex items-center justify-between rounded-xl bg-slate-900/80 p-2">
        <h1 className="text-sm font-bold md:text-lg">Miền Tây Đại Chiến · Character Viewer</h1>
        <GenderSwitcher />
      </header>
      <section className="grid min-h-[78vh] grid-cols-1 gap-3 md:grid-cols-[2fr_1fr]">
        <div className="overflow-hidden rounded-xl border border-emerald-300/20"><CharacterViewer /></div>
        <CosmeticPanel />
      </section>
    </main>
  );
}
