const FALLBACK_TOOLS = [
  {
    id: 1,
    name: "ChatGPT",
    category: "Writing & Chat",
    description: "Conversational AI model for drafting text, coding help, and brainstorming.",
    pricing: "Freemium",
    tags: ["chat", "writing", "coding assistant"]
  },
  {
    id: 2,
    name: "Midjourney",
    category: "Image Generation",
    description: "Generates high-quality art and photorealistic images from textual prompts.",
    pricing: "Paid",
    tags: ["image generator", "art", "design"]
  },
  {
    id: 3,
    name: "v0 by Vercel",
    category: "Coding & UI",
    description: "Generative UI system powered by AI to create React components from prompts.",
    pricing: "Freemium",
    tags: ["coding assistant", "frontend", "ui"]
  }
];

// Inside your component where tools are fetched:
useEffect(() => {
  fetch('http://localhost:8080/api/tools')
    .then((res) => {
      if (!res.ok) throw new Error('Backend offline');
      return res.json();
    })
    .then((data) => setTools(data.length > 0 ? data : FALLBACK_TOOLS))
    .catch((err) => {
      console.log('Using static fallback data:', err);
      setTools(FALLBACK_TOOLS);
    });
}, []);