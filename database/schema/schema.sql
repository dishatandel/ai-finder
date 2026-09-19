CREATE DATABASE IF NOT EXISTS ai_finder_db;
USE ai_finder_db;

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
);

-- Tasks Table
CREATE TABLE IF NOT EXISTS tasks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    category_id BIGINT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- AI Tools Table
CREATE TABLE IF NOT EXISTS ai_tools (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    features TEXT,
    pricing_type VARCHAR(50) NOT NULL, -- e.g., Free, Freemium, Paid
    pricing_details VARCHAR(255),
    best_for TEXT,
    limitations TEXT,
    website_url VARCHAR(255) NOT NULL,
    last_verified DATE
);

-- Tool-Task Junction Table with Relevance Weighting
CREATE TABLE IF NOT EXISTS tool_tasks (
    tool_id BIGINT NOT NULL,
    task_id BIGINT NOT NULL,
    relevance_weight INT DEFAULT 10, -- 10 = Direct Match, 5 = Secondary Match
    PRIMARY KEY (tool_id, task_id),
    FOREIGN KEY (tool_id) REFERENCES ai_tools(id) ON DELETE CASCADE,
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE
);

-- Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    tool_id BIGINT NOT NULL,
    user_name VARCHAR(100) NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tool_id) REFERENCES ai_tools(id) ON DELETE CASCADE
);