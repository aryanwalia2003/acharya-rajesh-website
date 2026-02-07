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