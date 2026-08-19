import { FiCloud, FiMapPin } from 'react-icons/fi';

interface WelcomeScreenProps {
  onLocationClick: () => void;
}

export default function WelcomeScreen({ onLocationClick }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <FiCloud className="text-white/30 text-8xl mb-6" />
      <h2 className="text-2xl md:text-3xl font-bold text-white/90 mb-3">
        Weather App
      </h2>
      <p className="text-white/60 mb-8 max-w-sm">
        Search for a city or use your location to get started
      </p>
      <button
        onClick={onLocationClick}
        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30 transition-all"
      >
        <FiMapPin />
        Use My Location
      </button>
    </div>
  );
}
