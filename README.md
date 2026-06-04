# Weather Watcher

A responsive single-page weather dashboard built with Next.js and Tailwind CSS. Displays real-time weather conditions for 12 major cities worldwide using the free Open-Meteo API — no API key required.

---

## Features

- **Live weather data** — temperature, feels like, humidity, wind speed, and weather condition for 12 cities
- **Search** — filter cities by name or country code with a 300ms debounced input
- **Sort** — order cities by hottest, coldest, most humid, or windiest
- **Slice** — limit the view to top 4, top 8, or all cities
- **Skeleton loading** — animated placeholder cards while data fetches
- **Error handling** — user-friendly banner if the API request fails
- **Fully responsive** — 1 to 4 column grid that adapts to any screen size

---

## Tech Stack

| Tool | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org) | App Router, Server and Client Components |
| [React 19](https://react.dev) | `useState`, `useEffect` hooks |
| [Tailwind CSS v4](https://tailwindcss.com) | All styling |
| [Open-Meteo API](https://open-meteo.com) | Free real-time weather data |

---

## Project Structure

```
weather-watcher/
├── app/
│   ├── layout.js           # Root layout — header, fonts, metadata
│   ├── page.js             # Page entry point (Server Component)
│   └── globals.css         # Global styles and body background
├── components/
│   ├── WeatherGrid.jsx     # Grid orchestration — filter, sort, slice state
│   ├── WeatherCard.jsx     # Individual city weather card
│   ├── WeatherSkeleton.jsx # Animated loading placeholder
│   └── SearchBar.jsx       # Search, sort, and show-count controls
└── hooks/
    └── useWeatherData.js   # Custom hook — fetches all city weather data
```

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Boroksade/weather-watcher.git

# Navigate into the project
cd weather-watcher

# Install dependencies
npm install
```

### Running the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for production

```bash
npm run build
npm run start
```

---

## Cities Covered

New York · London · Tokyo · Paris · Dubai · Sydney · Lagos · Toronto · Berlin · São Paulo · Mumbai · Singapore

---

## API

Weather data is sourced from [Open-Meteo](https://open-meteo.com) — a free, open-source weather API with no authentication required.

Fields used: `temperature_2m`, `apparent_temperature`, `relative_humidity_2m`, `wind_speed_10m`, `weather_code`
