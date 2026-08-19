import { useCallback, useEffect } from 'react';
import { useWeather } from './hooks/useWeather';
import {
  getWeatherTheme,
  isNightTime,
} from './utils/helpers';
import Background from './components/Background';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import ErrorMessage from './components/ErrorMessage';
import LoadingSpinner from './components/LoadingSpinner';
import UnitToggle from './components/UnitToggle';
import WelcomeScreen from './components/WelcomeScreen';

export default function App() {
  const {
    current,
    forecast,
    loading,
    error,
    units,
    clearError,
    fetchWeatherByCity,
    fetchWeatherByLocation,
    toggleUnits,
  } = useWeather();

  const theme = current
    ? getWeatherTheme(
        current.condition.id,
        isNightTime(current.sunrise, current.sunset, current.dt)
      )
    : 'clear';

  // Load last searched city on mount
  useEffect(() => {
    const lastCity = localStorage.getItem('weatherApp_lastCity');
    if (lastCity) {
      fetchWeatherByCity(lastCity);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Save last searched city
  useEffect(() => {
    if (current?.city) {
      localStorage.setItem('weatherApp_lastCity', current.city);
    }
  }, [current?.city]);

  const handleSearch = useCallback(
    (city: string) => {
      fetchWeatherByCity(city);
    },
    [fetchWeatherByCity]
  );

  return (
    <Background theme={theme}>
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <h1 className="text-2xl font-bold text-white/90">
              ⛅ Weather
            </h1>
            <div className="flex items-center gap-3">
              <UnitToggle unit={units} onToggle={toggleUnits} />
              <SearchBar
                onSearch={handleSearch}
                onLocationClick={fetchWeatherByLocation}
                loading={loading}
              />
            </div>
          </header>

          {/* Error */}
          {error && (
            <div className="mb-6">
              <ErrorMessage message={error.message} onDismiss={clearError} />
            </div>
          )}

          {/* Loading */}
          {loading && <LoadingSpinner />}

          {/* Welcome */}
          {!loading && !current && !error && (
            <WelcomeScreen onLocationClick={fetchWeatherByLocation} />
          )}

          {/* Weather Content */}
          {!loading && current && (
            <div className="flex flex-col gap-8">
              <CurrentWeather weather={current} units={units} />
              {forecast && <Forecast daily={forecast.daily} units={units} />}
            </div>
          )}

          {/* Footer */}
          <footer className="text-center text-white/30 text-xs mt-12 pb-4">
            Powered by OpenWeatherMap
          </footer>
        </div>
      </div>
    </Background>
  );
}
