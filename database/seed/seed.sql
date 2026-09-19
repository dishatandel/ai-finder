USE ai_finder_db;

-- Insert Base Categories
INSERT INTO categories (id, name, description) VALUES
(1, 'Writing', 'Tools for content generation, editing, and translation'),
(2, 'Coding', 'Tools for code generation, debugging, and review'),
(3, 'Image', 'Tools for image generation and editing');

-- Insert Initial Tasks
INSERT INTO tasks (id, category_id, name, description) VALUES
(1, 1, 'Humanize Text', 'Make AI generated text sound more natural'),
(2, 1, 'Grammar Checking', 'Correct spelling and grammatical mistakes'),
(3, 1, 'Content Generation', 'Write articles, posts, and long-form text'),
(4, 2, 'Code Generation', 'Generate code snippets and logic'),
(5, 2, 'Debugging', 'Identify and fix bugs in existing code');

-- Insert Sample AI Tools
INSERT INTO ai_tools (id, name, description, features, pricing_type, pricing_details, best_for, limitations, website_url, last_verified) VALUES
(1, 'ChatGPT', 'Versatile conversational AI model by OpenAI capable of text generation, coding, and reasoning.', 'Text generation, Code assistance, Web browsing', 'Freemium', 'Free tier available; Plus at $20/month', 'General writing, coding, and brainstorming', 'Occasional hallucinations', 'https://chatgpt.com', '2026-01-15'),
(2, 'Grammarly', 'AI-powered writing assistant focused on grammar, clarity, and tone adjustments.', 'Grammar checking, Tone detection, Citation generator', 'Freemium', 'Free basic version; Premium from $12/month', 'Proofreading and formal writing', 'Advanced features require paid plan', 'https://www.grammarly.com', '2026-01-20'),
(3, 'GitHub Copilot', 'AI pair programmer that provides real-time code completions and suggestions inside your IDE.', 'Contextual autocomplete, Chat assistant, CLI suggestions', 'Paid', 'Individual plan at $10/month', 'Developers seeking real-time coding assistance', 'Requires IDE integration; needs manual verification', 'https://github.com/features/copilot', '2026-02-01');

-- Associate Tools with Tasks
INSERT INTO tool_tasks (tool_id, task_id, relevance_weight) VALUES
(1, 1, 10), -- ChatGPT for Humanize Text (Direct)
(1, 3, 10), -- ChatGPT for Content Generation (Direct)
(1, 4, 8),  -- ChatGPT for Code Generation (Secondary)
(2, 2, 10), -- Grammarly for Grammar Checking (Direct)
(2, 1, 6),  -- Grammarly for Humanize Text (Secondary)
(3, 4, 10), -- Copilot for Code Generation (Direct)
(3, 5, 9);  -- Copilot for Debugging (Direct)