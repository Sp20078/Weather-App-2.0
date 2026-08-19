import type { Unit } from '../types/weather';

interface UnitToggleProps {
  unit: Unit;
  onToggle: () => void;
}

export default function UnitToggle({ unit, onToggle }: UnitToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="px-4 py-2 rounded-xl bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all text-sm font-medium"
    >
      {unit === 'metric' ? '°C' : '°F'}
    </button>
  );
}
