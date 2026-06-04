'use client'

const selectClass =
  "rounded-xl px-4 py-2.5 text-sm bg-slate-900/60 border border-white/8 " +
  "text-slate-200 backdrop-blur-xl focus:outline-none focus:ring-2 " +
  "focus:ring-indigo-500/50 focus:border-transparent cursor-pointer " +
  "transition-shadow min-w-40";

const optStyle = { background: "#0f172a" };

export default function SearchBar({
  search,    setSearch,
  sortBy,    setSortBy,
  showCount, setShowCount,
}) {
  return (
    <div
      role="search"
      aria-label="Filter and sort cities"
      className="flex flex-wrap gap-3 mb-9"
    >
      {/* Search — filter */}
      <div className="relative flex-1 min-w-56">
        <span
          aria-hidden="true"
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm pointer-events-none"
        >
          🔍
        </span>
        <input
          type="search"
          placeholder="Search cities or country codes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl pl-10 pr-4 py-2.5 text-sm bg-slate-900/60 border border-white/8 text-slate-200 placeholder:text-slate-500 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-shadow"
        />
      </div>

      {/* Sort */}
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        aria-label="Sort cities"
        className={selectClass}
      >
        <option value="default"   style={optStyle}>Sort: Default</option>
        <option value="temp_desc" style={optStyle}>🔥 Hottest First</option>
        <option value="temp_asc"  style={optStyle}>❄️ Coldest First</option>
        <option value="humidity"  style={optStyle}>💧 Most Humid</option>
        <option value="wind"      style={optStyle}>💨 Windiest</option>
      </select>

      {/* Show top N — slice */}
      <select
        value={showCount}
        onChange={(e) => setShowCount(Number(e.target.value))}
        aria-label="Limit number of results"
        className={selectClass}
      >
        <option value={12} style={optStyle}>Show: All</option>
        <option value={8}  style={optStyle}>Show: Top 8</option>
        <option value={4}  style={optStyle}>Show: Top 4</option>
      </select>
    </div>
  );
}
