import { query } from "@/lib/db";

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