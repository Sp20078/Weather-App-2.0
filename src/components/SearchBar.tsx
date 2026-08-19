import { useState, type FormEvent } from 'react';
import { FiSearch, FiMapPin, FiLoader } from 'react-icons/fi';

interface SearchBarProps {
  onSearch: (city: string) => void;
  onLocationClick: () => void;
  loading: boolean;
}

export default function SearchBar({ onSearch, onLocationClick, loading }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 w-full max-w-md mx-auto">
      <div className="relative flex-1">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search city..."
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/20 backdrop-blur-md text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
          disabled={loading}
        />
      </div>
      <button
        type="submit"
        disabled={loading || !query.trim()}
        className="px-5 py-3 rounded-xl bg-white/30 backdrop-blur-md text-white border border-white/30 hover:bg-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? <FiLoader className="text-xl animate-spin" /> : <FiSearch className="text-xl" />}
      </button>
      <button
        type="button"
        onClick={onLocationClick}
        disabled={loading}
        className="px-4 py-3 rounded-xl bg-white/30 backdrop-blur-md text-white border border-white/30 hover:bg-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all disabled:opacity-50"
        title="Use my location"
      >
        <FiMapPin className="text-xl" />
      </button>
    </form>
  );
}
