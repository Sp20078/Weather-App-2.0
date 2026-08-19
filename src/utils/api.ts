// OpenWeatherMap API configuration
// Get a free API key at https://openweathermap.org/api
// For demo purposes, we use a built-in key. Replace with your own in production.
const API_KEY = import.meta.env.VITE_OWM_API_KEY || '4d8fb5b93d4af21d66a2948710284366';
const BASE_URL = 'https://api.openweathermap.org';

export async function geocodeCity(city: string) {
  const url = `${BASE_URL}/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Geocoding failed');
  const data = await res.json();
  if (!data.length) throw new Error(`City "${city}" not found`);
  return { lat: data[0].lat, lon: data[0].lon };
}

export async function fetchCurrentWeather(
  lat: number,
  lon: number,
  units: string
) {
  const url = `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch weather data');
  return res.json();
}

export async function fetchForecast(
  lat: number,
  lon: number,
  units: string
) {
  const url = `${BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch forecast');
  return res.json();
}

// Reverse geocode to get city name from coordinates
export async function reverseGeocode(lat: number, lon: number) {
  const url = `${BASE_URL}/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Reverse geocoding failed');
  const data = await res.json();
  if (!data.length) throw new Error('Location not found');
  return { city: data[0].name, country: data[0].country };
}
