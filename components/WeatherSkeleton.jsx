export default function WeatherSkeleton() {
  return (
    <div className="rounded-2xl p-5 bg-slate-900/60 border border-white/9 backdrop-blur-xl animate-pulse flex flex-col gap-4">

      {/* City name + country + icon */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="h-3.5 w-24 bg-slate-700/50 rounded" />
          <div className="h-2.5 w-8  bg-slate-700/50 rounded" />
        </div>
        <div className="h-7 w-7 bg-slate-700/50 rounded-lg" />
      </div>

      {/* Temperature */}
      <div className="h-12 w-28 bg-slate-700/50 rounded" />

      {/* Condition label */}
      <div className="h-2.5 w-20 bg-slate-700/50 rounded -mt-2" />

      {/* Stats row */}
      <div className="border-t border-white/6 pt-3 grid grid-cols-3 gap-1">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex flex-col items-center gap-1.5">
            <div className="h-2 w-10 bg-slate-700/50 rounded" />
            <div className="h-3 w-8  bg-slate-700/50 rounded" />
          </div>
        ))}
      </div>

    </div>
  );
}
