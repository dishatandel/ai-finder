import React from 'react';
import { Search, Sparkles, X } from 'lucide-react';

export const Hero = ({ query, setQuery, onSearch }) => {
  const quickSearches = ['humanizer', 'PPT maker', 'coding assistant', 'image generator', 'resume builder', 'PDF AI'];

  return (
    <div className="relative pt-12 pb-8 text-center max-w-4xl mx-auto px-4">
      <div className="inline-flex items-center space-x-2 bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-full text-xs text-cyan-400 mb-6 shadow-inner">
        <Sparkles size={14} />
        <span className="font-semibold tracking-wide uppercase">Next-Gen AI Index</span>
      </div>

    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-100 tracking-tight mb-4 max-w-3xl mx-auto leading-tight">
  Find the Right <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 bg-clip-text text-transparent">AI Tool</span> for Every Task
</h1>

      <p className="text-slate-400 text-base sm:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
        Search across curated AI tools using natural query matching, category filters, and relevance ranking.
      </p>

      <div className="relative max-w-2xl mx-auto mb-6">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
          <Search size={20} />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSearch(query)}
          placeholder="Search tools (e.g., 'humanizer', 'PPT maker', 'coding assistant')..."
          className="w-full pl-12 pr-12 py-4 bg-slate-900/90 border border-slate-800 focus:border-cyan-500 rounded-2xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 text-sm sm:text-base transition-all shadow-2xl"
        />
        {query && (
          <button
            onClick={() => { setQuery(''); onSearch(''); }}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-200"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
        <span className="text-slate-500 font-medium">Popular:</span>
        {quickSearches.map((term) => (
          <button
            key={term}
            onClick={() => { setQuery(term); onSearch(term); }}
            className="bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 px-3 py-1 rounded-lg transition-colors cursor-pointer"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
};