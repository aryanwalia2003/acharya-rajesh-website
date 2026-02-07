import { query } from "@/lib/db";
import { getPaginatedData } from "@/lib/pagination";

interface Article {
  id: string;
  title_hindi: string;
  slug: string;
  status: string;
  created_at: Date;
  published_at: Date | null;
}

// Legacy - fetches all (keep for backward compatibility)
export async function getAdminArticles() {
  const sql = `
    SELECT 
      id::text, 
      title_hindi, 
      slug, 
      status, 
      created_at, 
      published_at 
    FROM posts 
    ORDER BY created_at DESC
  `;
  
  const result = await query(sql);
  return result.rows;
}

// New - Cursor-based pagination
export async function getAdminArticlesPaginated(cursor: string | null = null, limit: number = 20) {
  return getPaginatedData<Article>(
    'posts',
    cursor,
    limit,
    ['id::text as id', 'title_hindi', 'slug', 'status', 'created_at', 'published_at'],
    '', // No WHERE clause - admin sees all
    []
  );
}