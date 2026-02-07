"use client";

import { useState } from 'react';
import { Globe, EyeOff, Clock, Edit3, Trash2, MoreVertical, Filter, Search } from 'lucide-react';
import Link from 'next/link';
import { deleteArticle } from './actions';

export default function ArticleListClient({ initialArticles }: { initialArticles: any[] }) {
  const [articles, setArticles] = useState(initialArticles);
  const [activeTab, setActiveTab] = useState<'all' | 'PUBLISHED' | 'UNLISTED' | 'DRAFT'>('all');

  const filtered = activeTab === 'all' 
    ? articles 
    : articles.filter(a => a.status === activeTab);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this research?")) {
      const res = await deleteArticle(id);
      if (res.success) {
        setArticles(articles.filter(a => a.id !== id));
      }
    }
  };

  return (
    <>
      {/* Tabs */}
      <div className="px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
            <button onClick={() => setActiveTab('all')} className={`px-4 py-1.5 text-xs font-bold uppercase rounded-lg transition-all ${activeTab === 'all' ? 'bg-white text-brand-navy shadow-sm' : 'text-slate-400'}`}>All</button>
            <button onClick={() => setActiveTab('PUBLISHED')} className={`px-4 py-1.5 text-xs font-bold uppercase rounded-lg transition-all ${activeTab === 'PUBLISHED' ? 'bg-white text-brand-navy shadow-sm' : 'text-slate-400'}`}>Public</button>
            <button onClick={() => setActiveTab('UNLISTED')} className={`px-4 py-1.5 text-xs font-bold uppercase rounded-lg transition-all ${activeTab === 'UNLISTED' ? 'bg-white text-brand-navy shadow-sm' : 'text-slate-400'}`}>Unlisted</button>
            <button onClick={() => setActiveTab('DRAFT')} className={`px-4 py-1.5 text-xs font-bold uppercase rounded-lg transition-all ${activeTab === 'DRAFT' ? 'bg-white text-brand-navy shadow-sm' : 'text-slate-400'}`}>Drafts</button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-y-auto px-8 pb-12">
        <div className="rounded-2xl border border-brand-navy/5 bg-white overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-brand-navy/5 text-[10px] font-black uppercase tracking-widest text-slate-500">
              <tr>
                <th className="px-6 py-4">Title & Status</th>
                <th className="px-6 py-4">Date Created</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((article) => (
                <tr key={article.id} className="group hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-1.5">
                      <span className="font-hindi text-lg font-bold text-brand-navy">{article.title_hindi}</span>
                      <StatusBadge status={article.status} />
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-slate-400 font-medium">
                    {new Date(article.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/write?edit=${article.id}`} className="p-2 text-slate-400 hover:text-brand-gold">
                        <Edit3 size={18} />
                      </Link>
                      <button onClick={() => handleDelete(article.id)} className="p-2 text-slate-400 hover:text-red-500">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function StatusBadge({ status }: { status: string }) {
  const configs: any = {
    PUBLISHED: { icon: <Globe size={10} />, label: 'Public', styles: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
    UNLISTED: { icon: <EyeOff size={10} />, label: 'Unlisted', styles: 'bg-sky-50 text-sky-700 border-sky-100' },
    DRAFT: { icon: <Clock size={10} />, label: 'Draft', styles: 'bg-slate-50 text-slate-600 border-slate-200' },
  };
  const config = configs[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[9px] font-black uppercase tracking-tighter ${config.styles}`}>
      {config.icon} {config.label}
    </span>
  );
}