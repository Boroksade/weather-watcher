import { useState, useEffect } from "react";

const CITIES = [
  { name: "New York",  country: "US", lat:  40.71, lon:  -74.01 },
  { name: "London",    country: "GB", lat:  51.51, lon:   -0.13 },
  { name: "Tokyo",     country: "JP", lat:  35.68, lon:  139.65 },
  { name: "Paris",     country: "FR", lat:  48.86, lon:    2.35 },
  { name: "Dubai",     country: "AE", lat:  25.20, lon:   55.27 },
  { name: "Sydney",    country: "AU", lat: -33.87, lon:  151.21 },
  { name: "Lagos",     country: "NG", lat:   6.52, lon:    3.38 },
  { name: "Toronto",   country: "CA", lat:  43.65, lon:  -79.38 },
  { name: "Berlin",    country: "DE", lat:  52.52, lon:   13.41 },
  { name: "São Paulo", country: "BR", lat: -23.55, lon:  -46.63 },
  { name: "Mumbai",    country: "IN", lat:  19.08, lon:   72.88 },
  { name: "Singapore", country: "SG", lat:   1.35, lon:  103.82 },
];

function buildUrl(lat, lon) {
  return (
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code`
  );
}

export function useWeatherData() {
  const [data, setData]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchAll() {
      try {
        const results = await Promise.all(
          CITIES.map(async (city) => {
            const res = await fetch(buildUrl(city.lat, city.lon), {
              signal: controller.signal,
            });
            if (!res.ok) throw new Error(`Failed to fetch ${city.name}`);
            const json = await res.json();
            return { ...city, weather: json.current };
          })
        );
        setData(results);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Could not load weather data. Check your connection and try again.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
    return () => controller.abort();
  }, []);

  return { data, loading, error };
}
