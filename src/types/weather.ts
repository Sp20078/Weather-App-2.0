export interface Coordinates {
  lat: number;
  lon: number;
}

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface CurrentWeather {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDeg: number;
  visibility: number;
  condition: WeatherCondition;
  dt: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface DailyForecast {
  dt: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
  };
  humidity: number;
  windSpeed: number;
  weather: WeatherCondition[];
  pop: number;
}

export interface ForecastData {
  city: string;
  country: string;
  daily: DailyForecast[];
}

export interface GeocodingResult {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export type Unit = 'metric' | 'imperial';

export type Theme = 'clear' | 'clouds' | 'rain' | 'snow' | 'thunderstorm' | 'fog' | 'night';

export type AppError = {
  message: string;
  code?: number;
};
