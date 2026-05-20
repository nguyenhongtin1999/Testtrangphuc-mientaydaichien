import { useCharacterStore } from '../../stores/characterStore';

export function GenderSwitcher() {
  const gender = useCharacterStore((s) => s.gender);
  const setGender = useCharacterStore((s) => s.setGender);

  return (
    <div className="flex gap-2">
      <button className={`rounded px-3 py-1 ${gender==='male'?'bg-emerald-300 text-black':'bg-slate-700 text-white'}`} onClick={() => setGender('male')}>Nam</button>
      <button className={`rounded px-3 py-1 ${gender==='female'?'bg-emerald-300 text-black':'bg-slate-700 text-white'}`} onClick={() => setGender('female')}>Nữ</button>
    </div>
  );
}
