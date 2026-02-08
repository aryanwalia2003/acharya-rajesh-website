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

// New - Cursor-based pagination with optional Status Filter
export async function getAdminArticlesPaginated(
  cursor: string | null = null, 
  limit: number = 20,
  status: 'PUBLISHED' | 'UNLISTED' | 'DRAFT' | null = null
) {
  let whereClause = "";
  let params: any[] = [];

  if (status) {
    whereClause = "status = $1";
    params = [status];
  }

  console.log('Fetching articles with status:', status, 'Where Clause:', whereClause);

  return getPaginatedData<Article>(
    'posts',
    cursor,
    limit,
    ['id::text as id', 'COALESCE(draft_title, title_hindi) as title_hindi', 'slug', 'status', 'created_at', 'published_at'],
    whereClause,
    params
  );
}