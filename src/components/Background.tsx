import type { Theme } from '../types/weather';
import { getThemeColors } from '../utils/helpers';

interface BackgroundProps {
  theme: Theme;
  children: React.ReactNode;
}

export default function Background({ theme, children }: BackgroundProps) {
  const { gradient } = getThemeColors(theme);

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${gradient} transition-all duration-1000`}
    >
      {children}
    </div>
  );
}
