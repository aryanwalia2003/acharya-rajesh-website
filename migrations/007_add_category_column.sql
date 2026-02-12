-- Add category column to posts
ALTER TABLE posts ADD COLUMN IF NOT EXISTS category VARCHAR(50) DEFAULT 'Misceleneous';

-- Add check constraint to ensure only valid categories are used
ALTER TABLE posts ADD CONSTRAINT check_category 
CHECK (category IN ('Astrology', 'Panchang', 'Festivals', 'Misceleneous'));

-- Update existing records to have a default category if needed (though DEFAULT handles new inserts)
UPDATE posts SET category = 'Misceleneous' WHERE category IS NULL;
