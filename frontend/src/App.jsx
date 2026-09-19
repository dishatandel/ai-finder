import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ToolCard } from './components/ToolCard';
import { ToolDetails } from './components/ToolDetails';
import { searchTools, getToolsByCategory } from './api/toolService';
import { Loader2, Bookmark } from 'lucide-react';

// Guarantee static dataset loads on Vercel without backend
const FALLBACK_TOOLS = [
  {
    id: 1,
    name: "ChatGPT",
    category: "Writing/Chat",
    description: "Conversational AI model for drafting text, coding help, humanizing text, and brainstorming.",
    pricingType: "Freemium",
    websiteUrl: "https://chatgpt.com",
    tags: ["chat", "writing", "coding assistant", "humanizer"]
  },
  {
    id: 2,
    name: "Midjourney",
    category: "Image Generation",
    description: "Generates high-quality art and photorealistic images from textual prompts.",
    pricingType: "Paid",
    websiteUrl: "https://midjourney.com",
    tags: ["image generator", "art", "design"]
  },
  {
    id: 3,
    name: "v0 by Vercel",
    category: "Coding/Development",
    description: "Generative UI system powered by AI to create React components from prompts.",
    pricingType: "Freemium",
    websiteUrl: "https://v0.dev",
    tags: ["coding assistant", "frontend", "ui"]
  },
  {
    id: 4,
    name: "Claude",
    category: "Writing/Chat",
    description: "Advanced AI assistant capable of long-form writing, complex reasoning, and coding.",
    pricingType: "Freemium",
    websiteUrl: "https://claude.ai",
    tags: ["chat", "reasoning", "coding assistant"]
  },
  {
    id: 5,
    name: "Gamma App",
    category: "Presentation/PPT",
    description: "AI-powered tool that generates visually appealing presentations, documents, and web pages.",
    pricingType: "Freemium",
    websiteUrl: "https://gamma.app",
    tags: ["presentation", "PPT maker", "slides"]
  },
  {
    id: 6,
    name: "ChatPDF",
    category: "PDF/Documents",
    description: "Interactive tool to summarize, ask questions, and analyze long PDF documents instantly.",
    pricingType: "Free",
    websiteUrl: "https://chatpdf.com",
    tags: ["PDF AI", "pdf", "summarizer", "documents"]
  },
  {
    id: 7,
    name: "Kickresume",
    category: "Resume/Career",
    description: "Create professional resumes and cover letters with AI assistance in minutes.",
    pricingType: "Freemium",
    websiteUrl: "https://kickresume.com",
    tags: ["resume builder", "career", "jobs"]
  }
];

export default function App() {
  // Initialize state directly with FALLBACK_TOOLS so it never shows 0 on load
  const [tools, setTools] = useState(FALLBACK_TOOLS);
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

  const filterStaticTools = (searchQuery) => {
    if (!searchQuery.trim()) return FALLBACK_TOOLS;
    const q = searchQuery.toLowerCase();
    return FALLBACK_TOOLS.filter(tool =>
      tool.name.toLowerCase().includes(q) ||
      tool.description.toLowerCase().includes(q) ||
      tool.category.toLowerCase().includes(q) ||
      tool.tags.some(tag => tag.toLowerCase().includes(q))
    );
  };

  const fetchTools = async (searchQuery) => {
    setLoading(true);
    try {
      const data = await searchTools(searchQuery);
      if (Array.isArray(data) && data.length > 0) {
        setTools(data);
      } else {
        setTools(filterStaticTools(searchQuery));
      }
    } catch (err) {
      setTools(filterStaticTools(searchQuery));
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
        if (Array.isArray(data) && data.length > 0) {
          setTools(data);
        } else {
          const catFiltered = FALLBACK_TOOLS.filter(tool =>
            tool.category.toLowerCase().includes(cat.toLowerCase()) ||
            tool.tags.some(tag => tag.toLowerCase().includes(cat.toLowerCase()))
          );
          setTools(catFiltered.length > 0 ? catFiltered : FALLBACK_TOOLS);
        }
      }
    } catch (err) {
      const catFiltered = FALLBACK_TOOLS.filter(tool =>
        tool.category.toLowerCase().includes(cat.toLowerCase()) ||
        tool.tags.some(tag => tag.toLowerCase().includes(cat.toLowerCase()))
      );
      setTools(catFiltered.length > 0 ? catFiltered : FALLBACK_TOOLS);
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
            <p className="text-sm">Fetching tools...</p>
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