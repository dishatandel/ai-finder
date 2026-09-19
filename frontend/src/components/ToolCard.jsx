import React, { useState } from 'react';
import { Star, ExternalLink, Bookmark } from 'lucide-react';

const REAL_LOGOS = {
  'Undetectable AI': 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/openai.svg',
  'HideMyAI': 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/robotframework.svg',
  'BypassGPT': 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/probot.svg',
  'Grammarly': 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/grammarly.svg',
  'Gamma App': 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/slides.svg',
  'Tome AI': 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/generalelectric.svg',
  'GitHub Copilot': 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/githubcopilot.svg',
  'Cursor AI': 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/visualstudiocode.svg',
  'Midjourney': 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/midjourney.svg',
  'Kickresume AI': 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/read-the-docs.svg',
  'ChatPDF': 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/adobeacrobatreader.svg',
  'Notion AI': 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/notion.svg',
  'ElevenLabs': 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/elevenlabs.svg'
};

export const ToolCard = ({ tool, onSelect, isBookmarked, onToggleBookmark }) => {
  const [imgError, setImgError] = useState(false);
  const iconSrc = REAL_LOGOS[tool.name] || tool.logoUrl;

  return (
    <div 
      onClick={() => onSelect(tool)}
      className="group relative bg-slate-900/80 backdrop-blur-md border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-5 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-xl bg-slate-800 border border-slate-700/80 flex items-center justify-center font-bold text-cyan-400 text-lg shadow-inner overflow-hidden flex-shrink-0 p-2">
              {iconSrc && !imgError ? (
                <img 
                  src={iconSrc} 
                  alt={tool.name} 
                  className="w-full h-full object-contain filter invert opacity-90 group-hover:opacity-100 transition-opacity"
                  onError={() => setImgError(true)}
                />
              ) : (
                <span>{tool.name ? tool.name.charAt(0) : 'A'}</span>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-slate-100 text-base group-hover:text-cyan-400 transition-colors">
                {tool.name}
              </h3>
              <span className="text-xs text-slate-400 font-mono">{tool.subcategory || tool.category}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(tool.id);
              }}
              className="p-1.5 rounded-lg border border-slate-800 bg-slate-950/50 hover:border-slate-700 text-slate-400 hover:text-amber-400 transition-colors"
              title={isBookmarked ? "Remove from bookmarks" : "Save to bookmarks"}
            >
              <Bookmark size={15} className={isBookmarked ? "fill-amber-400 text-amber-400" : ""} />
            </button>
            <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${
              tool.pricingType === 'Free' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' :
              tool.pricingType === 'Paid' ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' :
              'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
            }`}>
              {tool.pricingType}
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 mb-4 leading-relaxed">
          {tool.description}
        </p>
      </div>

      <div>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tool.tags?.split(',').slice(0, 3).map((tag, i) => (
            <span key={i} className="text-[11px] bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded border border-slate-700/50">
              #{tag.trim()}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs text-slate-400">
          <div className="flex items-center space-x-1 text-amber-400">
            <Star size={14} className="fill-amber-400" />
            <span className="font-semibold text-slate-200">{tool.rating}</span>
            <span className="text-slate-500 ml-1">({(tool.usageCount / 1000).toFixed(0)}k)</span>
          </div>
          <a
            href={tool.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center space-x-1 text-slate-300 hover:text-cyan-400 transition-colors font-medium"
          >
            <span>Visit</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  );
};