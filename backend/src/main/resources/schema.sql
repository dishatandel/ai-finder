SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS tool_tasks;
DROP TABLE IF EXISTS ai_tools;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE ai_tools (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    category VARCHAR(255),
    subcategory VARCHAR(255),
    tags TEXT,
    keywords TEXT,
    use_cases TEXT,
    pricing_type VARCHAR(50),
    website_url VARCHAR(512),
    logo_url VARCHAR(512),
    rating DOUBLE DEFAULT 4.5,
    usage_count INT DEFAULT 0,
    FULLTEXT INDEX ft_all_idx (name, description, category, subcategory, tags, keywords, use_cases),
    FULLTEXT INDEX ft_name_idx (name),
    FULLTEXT INDEX ft_keywords_idx (keywords),
    FULLTEXT INDEX ft_tags_idx (tags),
    FULLTEXT INDEX ft_use_cases_idx (use_cases),
    FULLTEXT INDEX ft_category_sub_idx (category, subcategory),
    FULLTEXT INDEX ft_desc_idx (description)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;