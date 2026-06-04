function getWeatherInfo(code) {
  if (code === 0)                 return { label: "Clear Sky",     emoji: "☀️",  conditionBg: "bg-amber-400/5"   };
  if (code <= 3)                  return { label: "Partly Cloudy", emoji: "⛅",  conditionBg: "bg-slate-400/5"   };
  if (code === 45 || code === 48) return { label: "Foggy",         emoji: "🌫️", conditionBg: "bg-stone-400/5"   };
  if (code >= 51 && code <= 55)   return { label: "Drizzle",       emoji: "🌦️", conditionBg: "bg-sky-400/5"     };
  if (code >= 61 && code <= 65)   return { label: "Rain",          emoji: "🌧️", conditionBg: "bg-blue-500/5"    };
  if (code >= 71 && code <= 77)   return { label: "Snow",          emoji: "🌨️", conditionBg: "bg-blue-200/5"    };
  if (code >= 80 && code <= 82)   return { label: "Showers",       emoji: "🌦️", conditionBg: "bg-cyan-400/5"    };
  if (code === 85 || code === 86) return { label: "Snow Showers",  emoji: "❄️",  conditionBg: "bg-violet-400/5"  };
  if (code >= 95)                 return { label: "Thunderstorm",  emoji: "⛈️", conditionBg: "bg-purple-500/5"  };
  return                                 { label: "Unknown",       emoji: "🌡️", conditionBg: "bg-slate-500/5"   };
}

function getTempClass(temp) {
  if (temp >= 35) return "text-rose-400";
  if (temp >= 25) return "text-orange-400";
  if (temp >= 15) return "text-amber-400";
  if (temp >=  5) return "text-emerald-400";
  return "text-indigo-400";
}

export default function WeatherCard({ city }) {
  const { weather } = city;
  const { label, emoji, conditionBg } = getWeatherInfo(weather.weather_code);
  const temp      = Math.round(weather.temperature_2m);
  const feelsLike = Math.round(weather.apparent_temperature);
  const humidity  = weather.relative_humidity_2m;
  const wind      = Math.round(weather.wind_speed_10m);

  return (
    <div className="relative overflow-hidden rounded-2xl p-5 bg-slate-900/60 border border-white/9 backdrop-blur-xl transition-all duration-200 hover:bg-slate-800/70 hover:border-slate-500/40 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5),0_0_60px_rgba(99,102,241,0.08)] cursor-default flex flex-col gap-4">

      {/* Subtle condition tint */}
      <div className={`absolute inset-0 rounded-2xl pointer-events-none ${conditionBg}`} />

      {/* Content sits above tint */}
      <div className="relative z-10 flex flex-col gap-4">

        {/* City name + country + condition icon */}
        <div className="flex items-start justify-between">
          <div>
            <p className="font-semibold text-slate-100 text-base leading-tight">{city.name}</p>
            <p className="text-[0.68rem] text-slate-500 mt-1 uppercase tracking-widest font-medium">{city.country}</p>
          </div>
          <span className="text-[1.75rem] leading-none" title={label}>{emoji}</span>
        </div>

        {/* Temperature */}
        <div className="flex items-end gap-1">
          <span className={`text-[3.25rem] font-extrabold leading-none tracking-tight tabular-nums ${getTempClass(temp)}`}>
            {temp}°
          </span>
          <span className="text-slate-500 text-sm mb-1">C</span>
        </div>

        {/* Condition label */}
        <p className="text-sm text-slate-400 -mt-2">{label}</p>

        {/* Stats */}
        <div className="border-t border-white/7 pt-3 grid grid-cols-3 gap-1 text-center">
          {[
            { label: "Feels like", value: `${feelsLike}°`  },
            { label: "Humidity",   value: `${humidity}%`   },
            { label: "Wind",       value: `${wind} km/h`   },
          ].map(({ label: l, value }) => (
            <div key={l}>
              <p className="text-[0.62rem] text-slate-500 uppercase tracking-wider font-medium mb-1">{l}</p>
              <p className="text-sm font-semibold text-slate-300">{value}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
