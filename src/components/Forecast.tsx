import type { DailyForecast, Unit } from '../types/weather';
import { formatDate, getWeatherIconUrl } from '../utils/helpers';

interface ForecastProps {
  daily: DailyForecast[];
  units: Unit;
}

export default function Forecast({ daily }: ForecastProps) {

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-white/90 mb-4 text-center">
        5-Day Forecast
      </h2>
      <div className="grid grid-cols-5 gap-2 md:gap-3">
        {daily.map((day, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-3 flex flex-col items-center gap-1 border border-white/10 hover:bg-white/20 transition-all"
          >
            <span className="text-white/70 text-xs font-medium">
              {index === 0 ? 'Today' : formatDate(day.dt)}
            </span>
            <img
              src={getWeatherIconUrl(day.weather[0].icon)}
              alt={day.weather[0].description}
              className="w-12 h-12"
            />
            <span className="text-white font-bold text-lg">
              {day.temp.max}°
            </span>
            <span className="text-white/50 text-sm">
              {day.temp.min}°
            </span>
            <span className="text-white/40 text-xs capitalize">
              {day.weather[0].main}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
