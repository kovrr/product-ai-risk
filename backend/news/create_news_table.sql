-- Create news_newsarticle table for RSS feed
-- Run this in PostgreSQL: psql -d aikovrr -f create_news_table.sql

CREATE TABLE IF NOT EXISTS news_newsarticle (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    summary TEXT,
    url VARCHAR(1000) NOT NULL UNIQUE,
    source VARCHAR(100) NOT NULL,
    source_url VARCHAR(500),
    framework VARCHAR(100),
    article_type VARCHAR(50) CHECK (article_type IN ('regulation', 'framework', 'standard', 'guidance')),
    published_at TIMESTAMP WITH TIME ZONE NOT NULL,
    fetched_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS news_newsarticle_published_at_idx ON news_newsarticle (published_at DESC);
CREATE INDEX IF NOT EXISTS news_newsarticle_is_active_idx ON news_newsarticle (is_active);

-- Grant permissions
GRANT ALL PRIVILEGES ON news_newsarticle TO postgres;
GRANT USAGE, SELECT ON SEQUENCE news_newsarticle_id_seq TO postgres;

SELECT 'News table created successfully!' as status;
