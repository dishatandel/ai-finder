import React from 'react';
import { Sparkles } from 'lucide-react'; // Import a sleek AI icon

export function Navbar({ onSelectCategory }) {
  return (
    <nav className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* LOGO BRANDING */}
        <div 
          onClick={() => onSelectCategory('ALL')}
          className="flex items-center space-x-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 group-hover:border-cyan-400 transition-all">
            <Sparkles className="w-5 h-5 fill-cyan-400/20" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            AI<span className="text-cyan-400">Finder</span>
          </span>
        </div>

        {/* ... Rest of your Navbar code ... */}
      </div>
    </nav>
  );
}