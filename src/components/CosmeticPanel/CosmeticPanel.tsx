import cosmetics from '../../data/cosmetics.json';
import { useCharacterStore } from '../../stores/characterStore';

const categories = ['hair', 'shirts', 'pants', 'hats', 'accessories', 'pets', 'vehicles'] as const;

export function CosmeticPanel() {
  const activeCategory = useCharacterStore((s) => s.activeCategory);
  const setActiveCategory = useCharacterStore((s) => s.setActiveCategory);
  const equip = useCharacterStore((s) => s.equip);
  const equipped = useCharacterStore((s) => s.equipped);

  const items = cosmetics.filter((item) => item.category === activeCategory);

  return (
    <aside className="rounded-xl bg-slate-900/80 p-3 text-white">
      <div className="mb-2 flex flex-wrap gap-1">{categories.map((c)=><button key={c} className={`rounded px-2 py-1 text-xs ${c===activeCategory?'bg-emerald-300 text-black':'bg-slate-700'}`} onClick={()=>setActiveCategory(c)}>{c}</button>)}</div>
      <div className="space-y-2">{items.map((item)=><button key={item.id} onClick={()=>equip(item.category as any,item.id)} className={`block w-full rounded px-2 py-2 text-left ${equipped[item.category as keyof typeof equipped]===item.id?'bg-emerald-700':'bg-slate-800'}`}>{item.name}</button>)}</div>
    </aside>
  );
}
