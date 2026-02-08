"use server";

import { isAdmin } from "@/lib/auth-utils";
import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteArticle(id: string) {
  if (!(await isAdmin())) throw new Error("Unauthorized");

  await query("DELETE FROM posts WHERE id = $1", [id]);
  
  revalidatePath("/admin/articles");
  return { success: true };
}

// Admin fuzzy search with status filtering

export async function searchAdminArticles(
  searchQuery: string,
  statusFilter: 'all' | 'PUBLISHED' | 'UNLISTED' | 'DRAFT' = 'all',
  limit: number = 50
) {
  if (!(await isAdmin())) throw new Error("Unauthorized");

  if (!searchQuery || searchQuery.trim().length < 2) {
    return [];
  }

  // Base query
  let sql = `
    SELECT 
      id,
      COALESCE(draft_title, title_hindi) as title_hindi, 
      slug, 
      status,
      created_at,
      published_at
    FROM posts 
    WHERE (title_hindi ILIKE $1 OR draft_title ILIKE $1)
  `;

  const params: any[] = [`%${searchQuery}%`];

  // Append status filter if needed
  if (statusFilter !== 'all') {
    sql += ` AND status = $${params.length + 1}`;
    params.push(statusFilter);
  }

  sql += ` ORDER BY created_at DESC LIMIT $${params.length + 1}`;
  params.push(limit);

  try {
    const result = await query(sql, params);
    return result.rows;
  } catch (error) {
    console.error("Error searching admin articles:", error);
    return [];
  }
}
