import { getAdminArticlesPaginated } from "./data";
import { isAdmin } from "@/lib/auth-utils";
import ArticleListClient from "./ArticleListClient";
import Link from "next/link";
import { Plus, LayoutDashboard, FileText } from "lucide-react";

export default async function AdminArticlesPage() {
  // 1. Protection
  const authorized = await isAdmin();
  if (!authorized) return <div className="p-20 text-center">Unauthorized Access</div>;

  // 2. Fetch first page of paginated data
  const { data: initialArticles, meta } = await getAdminArticlesPaginated(null, 20);

  return (
    <div className="flex h-screen bg-brand-paper overflow-hidden">
      {/* SIDEBAR */}
      <aside className="hidden w-64 flex-col border-r border-brand-navy/10 bg-white lg:flex">
        <div className="p-6 border-b border-brand-navy/5">
          <Link href="/" className="flex items-center gap-2 text-brand-navy font-bold">
            <LayoutDashboard size={20} className="text-brand-gold" />
            Admin Dashboard
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin/write" className="flex items-center gap-3 rounded-lg bg-brand-navy px-3 py-2 text-sm font-bold text-brand-gold shadow-lg hover:bg-brand-navy/90 transition-all mb-6">
            <Plus size={18} /> New Article
          </Link>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2 mb-2">Content</p>
          <div className="flex w-full items-center gap-3 rounded-lg bg-brand-navy/5 px-3 py-2 text-sm font-bold text-brand-navy cursor-default">
            <FileText size={18} /> All Articles
          </div>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b border-brand-navy/5 bg-white px-8">
          <h1 className="text-xl font-bold text-brand-navy uppercase tracking-tight font-display italic">Article Management</h1>
        </header>

        {/* Pass paginated data to the Client */}
        <ArticleListClient 
          initialArticles={initialArticles} 
          initialCursor={meta.nextCursor}
          initialHasMore={meta.hasNextPage}
        />
      </main>
    </div>
  );
}
