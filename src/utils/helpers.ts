import type { Theme } from '../types/weather';

export function getWeatherTheme(
  weatherId: number,
  isNight: boolean
): Theme {
  if (isNight) return 'night';
  if (weatherId >= 200 && weatherId < 300) return 'thunderstorm';
  if (weatherId >= 300 && weatherId < 600) return 'rain';
  if (weatherId >= 600 && weatherId < 700) return 'snow';
  if (weatherId >= 700 && weatherId < 800) return 'fog';
  if (weatherId === 800) return 'clear';
  return 'clouds';
}

export function getThemeColors(theme: Theme): { gradient: string; accent: string } {
  const themes: Record<Theme, { gradient: string; accent: string }> = {
    clear: {
      gradient: 'from-blue-400 via-blue-500 to-blue-600',
      accent: 'text-yellow-200',
    },
    clouds: {
      gradient: 'from-gray-400 via-gray-500 to-gray-700',
      accent: 'text-gray-200',
    },
    rain: {
      gradient: 'from-gray-600 via-blue-800 to-gray-900',
      accent: 'text-blue-200',
    },
    snow: {
      gradient: 'from-blue-100 via-blue-200 to-blue-300',
      accent: 'text-blue-600',
    },
    thunderstorm: {
      gradient: 'from-purple-900 via-gray-900 to-gray-800',
      accent: 'text-yellow-300',
    },
    fog: {
      gradient: 'from-gray-300 via-gray-400 to-gray-500',
      accent: 'text-gray-700',
    },
    night: {
      gradient: 'from-indigo-900 via-blue-900 to-gray-900',
      accent: 'text-indigo-200',
    },
  };
  return themes[theme];
}

export function formatTime(timestamp: number, timezoneOffset: number): string {
  const date = new Date((timestamp + timezoneOffset) * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC',
  });
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

export function getWindDirection(degrees: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
}

export function isNightTime(sunrise: number, sunset: number, dt: number): boolean {
  const now = dt * 1000;
  return now < sunrise * 1000 || now > sunset * 1000;
}

export function getWeatherIconUrl(iconCode: string): string {
  return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
}

export function getUnitSymbol(unit: string): string {
  return unit === 'metric' ? '°C' : '°F';
}

export function kmToMiles(km: number): number {
  return km * 0.621371;
}
