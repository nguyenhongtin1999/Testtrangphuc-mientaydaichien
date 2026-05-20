import { useMemo } from 'react';
import { useGameStore } from '../../game/stores/useGameStore';
import { CATEGORIES, getItemsByCategoryAndGender, getItemById } from '../../game/utils/cosmetics';

export function InventoryPanel() {
  const gender = useGameStore((s) => s.gender);
  const activeCategory = useGameStore((s) => s.activeCategory);
  const setActiveCategory = useGameStore((s) => s.setActiveCategory);
  const equipped = useGameStore((s) => s.equipped);
  const equipItem = useGameStore((s) => s.equipItem);
  const unequipItem = useGameStore((s) => s.unequipItem);

  const items = useMemo(() => getItemsByCategoryAndGender(activeCategory, gender), [activeCategory, gender]);

  return (
    <aside className="h-full w-full rounded-2xl bg-slate-900/85 p-3 text-white backdrop-blur md:p-4">
      <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-emerald-300">Tủ Đồ</h2>

      <div className="mb-3 flex flex-wrap gap-1">
        {CATEGORIES.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)} className={`rounded px-2 py-1 text-xs ${cat === activeCategory ? 'bg-emerald-300 text-black' : 'bg-slate-700'}`}>
            {cat}
          </button>
        ))}
      </div>

      <button onClick={() => unequipItem(activeCategory)} className="mb-3 rounded bg-rose-400 px-2 py-1 text-xs font-semibold text-black">Unequip {activeCategory}</button>

      <div className="max-h-[40vh] space-y-2 overflow-auto pr-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => equipItem(item.category, item.id)}
            className={`flex w-full items-center justify-between rounded border px-2 py-2 text-left ${equipped[item.category] === item.id ? 'border-emerald-300 bg-slate-700' : 'border-slate-700 bg-slate-800/80'}`}
          >
            <span className="flex items-center gap-2 text-sm"><span>{item.thumbnail}</span><span>{item.name}</span></span>
            <span className="text-[10px] uppercase text-amber-300">{item.rarity}</span>
          </button>
        ))}
      </div>

      <div className="mt-4 border-t border-slate-700 pt-3 text-xs text-slate-200">
        <p className="mb-1 font-semibold text-emerald-200">Đang mặc:</p>
        {CATEGORIES.map((cat) => (
          <p key={cat}>{cat}: {getItemById(equipped[cat])?.name ?? 'Trống'}</p>
        ))}
      </div>
    </aside>
  );
}
