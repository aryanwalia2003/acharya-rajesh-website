-- Migration: Add UNLISTED status to posts
ALTER TABLE posts DROP CONSTRAINT IF EXISTS posts_status_check;
ALTER TABLE posts ADD CONSTRAINT posts_status_check CHECK (status IN ('DRAFT', 'PUBLISHED', 'UNLISTED'));