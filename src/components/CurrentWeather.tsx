import {
  FiDroplet,
  FiWind,
  FiEye,
  FiThermometer,
  FiSunrise,
  FiSunset,
} from 'react-icons/fi';
import type { CurrentWeather as CurrentWeatherType, Unit } from '../types/weather';
import {
  getWeatherIconUrl,
  formatTime,
  getWindDirection,
  getUnitSymbol,
} from '../utils/helpers';

interface CurrentWeatherProps {
  weather: CurrentWeatherType;
  units: Unit;
}

export default function CurrentWeather({ weather, units }: CurrentWeatherProps) {
  const unitSymbol = getUnitSymbol(units);

  return (
    <div className="flex flex-col items-center text-center">
      {/* City & Country */}
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">
        {weather.city}
        <span className="text-lg font-normal text-white/70 ml-2">
          {weather.country}
        </span>
      </h1>

      {/* Weather Icon & Description */}
      <img
        src={getWeatherIconUrl(weather.condition.icon)}
        alt={weather.condition.description}
        className="w-32 h-32 md:w-40 md:h-40 drop-shadow-lg"
      />

      {/* Temperature */}
      <div className="text-7xl md:text-8xl font-extrabold text-white mb-2 drop-shadow-lg">
        {weather.temperature}
        <span className="text-4xl md:text-5xl font-normal align-top">{unitSymbol}</span>
      </div>

      <p className="text-xl text-white/80 capitalize mb-6">
        {weather.condition.description}
      </p>

      {/* Feels like */}
      <p className="text-white/70 mb-8">
        Feels like {weather.feelsLike}{unitSymbol}
      </p>

      {/* Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-lg">
        <DetailCard
          icon={<FiDroplet />}
          label="Humidity"
          value={`${weather.humidity}%`}
        />
        <DetailCard
          icon={<FiWind />}
          label="Wind"
          value={`${weather.windSpeed} m/s ${getWindDirection(weather.windDeg)}`}
        />
        <DetailCard
          icon={<FiEye />}
          label="Visibility"
          value={`${weather.visibility} km`}
        />
        <DetailCard
          icon={<FiThermometer />}
          label="Pressure"
          value={`${weather.pressure} hPa`}
        />
        <DetailCard
          icon={<FiSunrise />}
          label="Sunrise"
          value={formatTime(weather.sunrise, weather.timezone)}
        />
        <DetailCard
          icon={<FiSunset />}
          label="Sunset"
          value={formatTime(weather.sunset, weather.timezone)}
        />
      </div>
    </div>
  );
}

function DetailCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 flex flex-col items-center gap-1 border border-white/10">
      <span className="text-white/60 text-lg">{icon}</span>
      <span className="text-white/50 text-xs">{label}</span>
      <span className="text-white text-sm font-medium">{value}</span>
    </div>
  );
}
