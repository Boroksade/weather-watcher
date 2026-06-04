import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Weather Watcher",
  description: "Real-time weather data for cities around the world",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={geist.variable}>
      <body>
        <header className="sticky top-0 z-50 border-b border-white/7 bg-[#050c1a]/75 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3.5">

            {/* Gradient icon badge */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-sky-500 flex items-center justify-center text-xl shrink-0 shadow-lg shadow-indigo-500/40">
              🌤
            </div>

            {/* Title + subtitle */}
            <div>
              <h1 className="text-lg font-bold tracking-tight leading-tight bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
                Weather Watcher
              </h1>
              <p className="text-[0.7rem] text-slate-500 mt-0.5 uppercase tracking-widest">
                Live conditions · 12 cities worldwide
              </p>
            </div>

            {/* Live badge */}
            <div className="ml-auto">
              <span className="text-[0.7rem] text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-2.5 py-0.5 tracking-wide">
                ● LIVE
              </span>
            </div>

          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-9">
          {children}
        </main>
      </body>
    </html>
  );
}
