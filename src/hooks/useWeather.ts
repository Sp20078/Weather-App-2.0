import { useState, useCallback } from 'react';
import type {
  CurrentWeather,
  ForecastData,
  Unit,
  AppError,
  DailyForecast,
} from '../types/weather';
import {
  geocodeCity,
  fetchCurrentWeather,
  fetchForecast,
} from '../utils/api';

function groupForecastsByDay(
  forecastList: Array<{
    dt: number;
    main: { temp: number; temp_min: number; temp_max: number; humidity: number };
    wind: { speed: number };
    weather: Array<{ id: number; main: string; description: string; icon: string }>;
    pop: number;
  }>
): DailyForecast[] {
  const dailyMap = new Map<string, DailyForecast>();

  for (const item of forecastList) {
    const date = new Date(item.dt * 1000).toDateString();
    if (!dailyMap.has(date)) {
      dailyMap.set(date, {
        dt: item.dt,
        temp: {
          day: Math.round(item.main.temp),
          min: Math.round(item.main.temp_min),
          max: Math.round(item.main.temp_max),
          night: Math.round(item.main.temp_min),
        },
        humidity: item.main.humidity,
        windSpeed: item.wind.speed,
        weather: item.weather,
        pop: item.pop,
      });
    } else {
      const existing = dailyMap.get(date)!;
      existing.temp.min = Math.min(existing.temp.min, Math.round(item.main.temp_min));
      existing.temp.max = Math.max(existing.temp.max, Math.round(item.main.temp_max));
    }
  }

  return Array.from(dailyMap.values()).slice(0, 5);
}

export function useWeather() {
  const [current, setCurrent] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);
  const [units, setUnits] = useState<Unit>('metric');

  const clearError = useCallback(() => setError(null), []);

  const fetchWeatherByCoords = useCallback(
    async (lat: number, lon: number) => {
      setLoading(true);
      setError(null);
      try {
        const [currentData, forecastData] = await Promise.all([
          fetchCurrentWeather(lat, lon, units),
          fetchForecast(lat, lon, units),
        ]);

        setCurrent({
          city: currentData.name,
          country: currentData.sys.country,
          temperature: Math.round(currentData.main.temp),
          feelsLike: Math.round(currentData.main.feels_like),
          humidity: currentData.main.humidity,
          pressure: currentData.main.pressure,
          windSpeed: currentData.wind.speed,
          windDeg: currentData.wind.deg,
          visibility: currentData.visibility / 1000,
          condition: currentData.weather[0],
          dt: currentData.dt,
          timezone: currentData.timezone,
          sunrise: currentData.sys.sunrise,
          sunset: currentData.sys.sunset,
        });

        setForecast({
          city: forecastData.city.name,
          country: forecastData.city.country,
          daily: groupForecastsByDay(forecastData.list),
        });
      } catch (err) {
        setError({
          message: err instanceof Error ? err.message : 'An error occurred',
        });
      } finally {
        setLoading(false);
      }
    },
    [units]
  );

  const fetchWeatherByCity = useCallback(
    async (city: string) => {
      setLoading(true);
      setError(null);
      try {
        const coords = await geocodeCity(city);
        await fetchWeatherByCoords(coords.lat, coords.lon);
      } catch (err) {
        setError({
          message: err instanceof Error ? err.message : 'An error occurred',
        });
        setLoading(false);
      }
    },
    [fetchWeatherByCoords]
  );

  const fetchWeatherByLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      setError({ message: 'Geolocation is not supported by your browser' });
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          // The weather API itself returns the city name — no reverse geocoding needed
          await fetchWeatherByCoords(latitude, longitude);
        } catch (err) {
          setError({
            message: err instanceof Error ? err.message : 'An error occurred',
          });
          setLoading(false);
        }
      },
      () => {
        setError({ message: 'Location access denied. Please search for a city.' });
        setLoading(false);
      }
    );
  }, [fetchWeatherByCoords]);

  const toggleUnits = useCallback(() => {
    const newUnits = units === 'metric' ? 'imperial' : 'metric';
    setUnits(newUnits);
    // Refetch if we have current weather
    if (current) {
      geocodeCity(current.city).then((coords) => {
        fetchWeatherByCoords(coords.lat, coords.lon);
      });
    }
  }, [units, current, fetchWeatherByCoords]);

  return {
    current,
    forecast,
    loading,
    error,
    units,
    clearError,
    fetchWeatherByCity,
    fetchWeatherByLocation,
    toggleUnits,
  };
}
