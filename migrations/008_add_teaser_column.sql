-- Add teaser column to posts table
ALTER TABLE posts ADD COLUMN teaser TEXT;

-- Update existing records to have a default teaser (using excerpt from content or a placeholder)
UPDATE posts SET teaser = substr(regexp_replace(content_hindi, '<[^>]*>', '', 'g'), 1, 150) || '...' WHERE teaser IS NULL;
