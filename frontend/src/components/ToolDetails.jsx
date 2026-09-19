import React from 'react';
import { X, ExternalLink, Star, Tag, CheckCircle2 } from 'lucide-react';

export const ToolDetails = ({ tool, onClose }) => {
  if (!tool) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-100 bg-slate-800/60 p-2 rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex items-start space-x-4 mb-6">
          <img
            src={tool.logoUrl}
            alt={tool.name}
            className="w-16 h-16 rounded-2xl bg-slate-800 object-cover border border-slate-700"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/64/0f172a/64748b?text=AI'; }}
          />
          <div>
            <h2 className="text-2xl font-bold text-slate-100">{tool.name}</h2>
            <div className="flex items-center space-x-3 mt-1 text-sm">
              <span className="text-cyan-400 font-medium">{tool.category}</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">{tool.subcategory}</span>
            </div>
          </div>
        </div>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
          {tool.description}
        </p>

        {tool.useCases && (
          <div className="mb-6 bg-slate-950/50 border border-slate-800/80 rounded-2xl p-4">
            <h4 className="text-xs uppercase font-semibold text-slate-400 tracking-wider mb-2 flex items-center space-x-1">
              <CheckCircle2 size={14} className="text-cyan-400" />
              <span>Primary Use Cases</span>
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">{tool.useCases}</p>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8 text-center">
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <span className="block text-xs text-slate-500">Pricing</span>
            <span className="text-sm font-semibold text-slate-200">{tool.pricingType}</span>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <span className="block text-xs text-slate-500">Rating</span>
            <span className="text-sm font-semibold text-amber-400 flex items-center justify-center space-x-1">
              <Star size={14} className="fill-amber-400" />
              <span>{tool.rating}</span>
            </span>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 col-span-2 sm:col-span-1">
            <span className="block text-xs text-slate-500">Users</span>
            <span className="text-sm font-semibold text-slate-200">{(tool.usageCount / 1000).toFixed(0)}k+</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <div className="flex items-center space-x-1 text-slate-400 text-xs">
            <Tag size={14} />
            <span>{tool.tags}</span>
          </div>
          <a
            href={tool.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-medium text-sm rounded-xl flex items-center space-x-2 transition-all shadow-lg shadow-cyan-500/20"
          >
            <span>Visit Website</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};