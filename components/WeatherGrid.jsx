'use client'

import { useState, useEffect } from "react";
import { useWeatherData } from "@/hooks/useWeatherData";
import SearchBar from "./SearchBar";
import WeatherCard from "./WeatherCard";
import WeatherSkeleton from "./WeatherSkeleton";

export default function WeatherGrid() {
  // ── Server-fetched data via custom hook ───────────────────────────
  const { data, loading, error } = useWeatherData();

  // ── UI state ──────────────────────────────────────────────────────
  const [search,         setSearch]         = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortBy,         setSortBy]         = useState("default");
  const [showCount,      setShowCount]      = useState(12);

  // ── useEffect: debounce the search input ──────────────────────────
  // Runs every time `search` changes. Waits 300 ms before updating
  // debouncedSearch so the filter doesn't re-run on every keystroke.
  // The cleanup cancels the previous timer before scheduling a new one.
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  // ── Derived list: filter → sort → slice ───────────────────────────
  const displayed = data
    .filter((city) => {
      const q = debouncedSearch.toLowerCase();
      return (
        city.name.toLowerCase().includes(q) ||
        city.country.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "temp_desc": return b.weather.temperature_2m         - a.weather.temperature_2m;
        case "temp_asc":  return a.weather.temperature_2m         - b.weather.temperature_2m;
        case "humidity":  return b.weather.relative_humidity_2m   - a.weather.relative_humidity_2m;
        case "wind":      return b.weather.wind_speed_10m         - a.weather.wind_speed_10m;
        default:          return 0;
      }
    })
    .slice(0, showCount);

  // ── Render ────────────────────────────────────────────────────────
  return (
    <div>
      <SearchBar
        search={search}       setSearch={setSearch}
        sortBy={sortBy}       setSortBy={setSortBy}
        showCount={showCount} setShowCount={setShowCount}
      />

      {error && (
        <div className="mb-6 rounded-xl bg-red-500/10 border border-red-500/25 text-red-300 px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {loading ? (
          Array.from({ length: 12 }).map((_, i) => <WeatherSkeleton key={i} />)
        ) : displayed.length > 0 ? (
          displayed.map((city) => <WeatherCard key={city.name} city={city} />)
        ) : (
          <div className="col-span-full py-20 text-center text-slate-600">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-sm">No cities match &ldquo;{debouncedSearch}&rdquo;</p>
          </div>
        )}
      </div>

      {!loading && !error && (
        <p className="mt-9 text-center text-[0.72rem] text-slate-700 tracking-wide">
          Showing {displayed.length} of {data.length} cities &nbsp;·&nbsp; Powered by Open-Meteo
        </p>
      )}
    </div>
  );
}
