import React from 'react';
import { Sparkles, Compass, Flame, Info } from 'lucide-react';

export const Navbar = ({ onSelectCategory }) => {
  return (
    <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div 
          onClick={() => onSelectCategory('ALL')} 
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <Sparkles size={20} className="text-white" />
          </div>
          <span className="font-bold text-xl text-slate-100 tracking-tight">
            AI<span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">Finder</span>
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-6 text-sm text-slate-400 font-medium">
          <button onClick={() => onSelectCategory('ALL')} className="hover:text-cyan-400 transition-colors flex items-center space-x-1.5 cursor-pointer">
            <Compass size={16} />
            <span>Discover</span>
          </button>
          <button onClick={() => onSelectCategory('Writing')} className="hover:text-cyan-400 transition-colors flex items-center space-x-1.5 cursor-pointer">
            <Flame size={16} />
            <span>Trending</span>
          </button>
          <a href="#about" className="hover:text-cyan-400 transition-colors flex items-center space-x-1.5">
            <Info size={16} />
            <span>About</span>
          </a>
        </div>
      </div>
    </nav>
  );
};