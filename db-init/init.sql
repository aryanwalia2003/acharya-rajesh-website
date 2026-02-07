-- 1. Create ENUM-like check constraints for Roles and Status
-- Using text with checks is more flexible for Raw SQL

-- 2. Users Table (Google OAuth based)
CREATE TABLE IF NOT EXISTS users (
    id BIGINT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    role VARCHAR(20) DEFAULT 'GUEST' CHECK (role IN ('ADMIN', 'READER', 'GUEST')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Blog Posts Table
CREATE TABLE IF NOT EXISTS posts (
    id BIGINT PRIMARY KEY,
    title_hindi TEXT NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL, -- This is used for the URL
    content_hindi TEXT NOT NULL,
    english_title TEXT,
    english_translation TEXT,
    english_summary TEXT,
    -- JSONB stores extracted astrological dates: [{ "date": "2024-10-12", "event": "Shani Transit" }]
    important_dates JSONB DEFAULT '[]'::jsonb,
    tags TEXT[] DEFAULT '{}',
    status VARCHAR(20) DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'PUBLISHED')),
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Appointments Table
CREATE TABLE IF NOT EXISTS appointments (
    id BIGINT PRIMARY KEY,
    client_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    scheduled_time TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED')),
    meeting_link TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. AI Result Cache (Permanent storage for expensive LLM calls)
CREATE TABLE IF NOT EXISTS ai_cache (
    id BIGINT PRIMARY KEY,
    input_hash VARCHAR(64) UNIQUE NOT NULL, -- SHA-256 of the Hindi text
    result_type VARCHAR(50), -- 'translation' or 'summary'
    result_content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- 7. Automated Update for 'updated_at'
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();