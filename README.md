<div align="center">

# ⛅ Weather App 2.0

**A modern, responsive weather application built with React, Vite, and TypeScript.**

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)

[Live Demo](#-getting-started) · [Report Bug](https://github.com/your-username/weather-app-2.0/issues) · [Request Feature](https://github.com/your-username/weather-app-2.0/issues)

</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔍 **City Search** | Search any city worldwide for instant weather data |
| 📍 **Geolocation** | One-click location detection with browser geolocation |
| 🌡️ **Current Weather** | Temperature, feels-like, humidity, wind, visibility, pressure |
| 📅 **5-Day Forecast** | Daily high/low temperatures and weather conditions |
| 🎨 **Dynamic Themes** | Background gradients change based on weather conditions |
| 🌙 **Day/Night Mode** | Automatically detects sunrise/sunset for accurate theming |
| 🔄 **Unit Toggle** | Switch between Celsius (°C) and Fahrenheit (°F) |
| 💾 **Persistent Search** | Remembers your last searched city via localStorage |
| 📱 **Responsive Design** | Fully responsive — works on mobile, tablet, and desktop |
| ⚡ **Blazing Fast** | Built with Vite for instant HMR and optimized builds |

## 🖼️ Preview

```
┌─────────────────────────────────────────────────┐
│  ⛅ Weather        [°C]  [Search city... 🔍 📍] │
│                                                   │
│              New York, US                         │
│              ☀️  (clear sky)                      │
│                28°C                               │
│           Feels like 26°C                         │
│                                                   │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │
│  │Mon   │ │Tue   │ │Wed   │ │Thu   │ │Fri   │  │
│  │ ☀️   │ │ 🌧️   │ │ ⛅   │ │ ☀️   │ │ 🌧️   │  │
│  │30°   │ │22°   │ │25°   │ │29°   │ │20°   │  │
│  │18°   │ │16°   │ │17°   │ │19°   │ │15°   │  │
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘  │
└─────────────────────────────────────────────────┘
```

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript 5
- **Build Tool:** Vite 5
- **Styling:** Tailwind CSS 3
- **Icons:** React Icons
- **API:** [OpenWeatherMap](https://openweathermap.org/api)

## 📁 Project Structure

```
weather-app-2.0/
├── public/
├── src/
│   ├── components/
│   │   ├── Background.tsx        # Dynamic gradient background
│   │   ├── CurrentWeather.tsx    # Today's weather display
│   │   ├── ErrorMessage.tsx      # Error notification
│   │   ├── Forecast.tsx          # 5-day forecast cards
│   │   ├── LoadingSpinner.tsx    # Loading state
│   │   ├── SearchBar.tsx         # City search input
│   │   ├── UnitToggle.tsx        # °C / °F switch
│   │   └── WelcomeScreen.tsx     # Empty state screen
│   ├── hooks/
│   │   └── useWeather.ts         # Custom weather data hook
│   ├── types/
│   │   └── weather.ts            # TypeScript interfaces
│   ├── utils/
│   │   ├── api.ts                # OpenWeatherMap API service
│   │   └── helpers.ts            # Formatting & utility functions
│   ├── App.tsx                   # Main application component
│   ├── index.css                 # Global styles & Tailwind
│   ├── main.tsx                  # React entry point
│   └── vite-env.d.ts            # Vite type declarations
├── .env                          # Environment variables (git-ignored)
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.app.json
└── vite.config.ts
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Sp20078/weather-app-2.0.git
   cd weather-app-2.0
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the project root:

   ```env
   VITE_OWM_API_KEY=your_openweathermap_api_key
   ```
   (In this it is already there)

   > 🔑 Get a free API key at [openweathermap.org/api](https://openweathermap.org/api)
   > Keys typically activate within 10 minutes of registration.

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open in browser**

   Navigate to [http://localhost:5173](http://localhost:5173)

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality |

## 🌤️ Weather Themes

The app dynamically changes its background gradient based on current weather conditions:

| Condition | Theme |
|-----------|-------|
| ☀️ Clear | Blue gradient |
| ☁️ Clouds | Gray gradient |
| 🌧️ Rain | Dark blue-gray gradient |
| ❄️ Snow | Light blue gradient |
| ⛈️ Thunderstorm | Purple-gray gradient |
| 🌫️ Fog | Light gray gradient |
| 🌙 Night | Indigo-dark gradient |

## 🔧 Configuration

### API Key

The app uses the [OpenWeatherMap API](https://openweathermap.org/api). You can configure the API key via:

1. **Environment variable** (recommended):
   ```env
   VITE_OWM_API_KEY=your_key_here
   ```

2. **Fallback** in `src/utils/api.ts` (not recommended for production)

### Available API Endpoints

- `/geo/1.0/direct` — Geocoding (city → coordinates)
- `/data/2.5/weather` — Current weather
- `/data/2.5/forecast` — 5-day / 3-hour forecast

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) — Free weather API
- [React](https://react.dev/) — UI library
- [Vite](https://vitejs.dev/) — Build tool
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [React Icons](https://react-icons.github.io/react-icons/) — Icon library

---

<div align="center">

**Built with ❤️ using React + Vite + TypeScript**

</div>
