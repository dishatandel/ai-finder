import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ToolCard } from './components/ToolCard';
import { ToolDetails } from './components/ToolDetails';
import { searchTools, getToolsByCategory } from './api/toolService';
import { Loader2, Bookmark } from 'lucide-react';

export default function App() {
  const [tools, setTools] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedPricing, setSelectedPricing] = useState('ALL');
  const [showOnlyBookmarks, setShowOnlyBookmarks] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);
  const [loading, setLoading] = useState(false);

  // Persistent bookmarks from browser localStorage
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('aifinder_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('aifinder_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (id) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((bId) => bId !== id) : [...prev, id]
    );
  };

  const fetchTools = async (searchQuery) => {
    setLoading(true);
    try {
      const data = await searchTools(searchQuery);
      setTools(data);
    } catch (err) {
      console.error('Failed to fetch tools:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = async (cat) => {
    setSelectedCategory(cat);
    setQuery('');
    setLoading(true);
    try {
      if (cat === 'ALL') {
        await fetchTools('');
      } else {
        let data = await getToolsByCategory(cat);
        if (!data || data.length === 0) {
          const searchTerm = cat === 'Image Generation' ? 'image' :
                             cat === 'Resume/Career' ? 'resume' :
                             cat === 'Presentation/PPT' ? 'presentation' :
                             cat === 'PDF/Documents' ? 'pdf' : cat;
          data = await searchTools(searchTerm);
        }
        setTools(data);
      }
    } catch (err) {
      console.error('Failed category fetch:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTools('');
  }, []);

  // Filter tools client-side by Pricing and Bookmarks
  const filteredTools = tools.filter((tool) => {
    const matchesPricing = selectedPricing === 'ALL' || tool.pricingType === selectedPricing;
    const matchesBookmark = !showOnlyBookmarks || bookmarks.includes(tool.id);
    return matchesPricing && matchesBookmark;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-white">
      <Navbar onSelectCategory={handleCategorySelect} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Hero query={query} setQuery={setQuery} onSearch={fetchTools} />

        {/* Pricing & Bookmark Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80">
          {/* Pricing Tabs */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400 mr-2">Pricing:</span>
            {['ALL', 'Free', 'Freemium', 'Paid'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedPricing(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  selectedPricing === type
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Bookmarks Toggle */}
          <button
            onClick={() => setShowOnlyBookmarks(!showOnlyBookmarks)}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
              showOnlyBookmarks
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                : 'bg-slate-800/80 border-slate-700/50 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bookmark size={14} className={showOnlyBookmarks ? "fill-amber-400" : ""} />
            <span>Bookmarks ({bookmarks.length})</span>
          </button>
        </div>

        {/* Results Metadata */}
        <div className="flex items-center justify-between mb-6 text-xs sm:text-sm text-slate-400 font-mono">
          <span>Found {filteredTools.length} AI tools</span>
          {selectedCategory !== 'ALL' && <span>Filter: {selectedCategory}</span>}
        </div>

        {/* Grid and States */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-cyan-400 mb-3" />
            <p className="text-sm">Fetching tools from backend...</p>
          </div>
        ) : filteredTools.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800/80">
            <p className="text-slate-400 text-base">No AI tools matched your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                onSelect={setSelectedTool}
                isBookmarked={bookmarks.includes(tool.id)}
                onToggleBookmark={toggleBookmark}
              />
            ))}
          </div>
        )}
      </main>

      <ToolDetails tool={selectedTool} onClose={() => setSelectedTool(null)} />
    </div>
  );
}