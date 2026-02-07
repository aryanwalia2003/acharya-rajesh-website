"use client";

import { useState } from 'react';
import { 
  Wand2, Languages, CalendarDays, Eye, Send, ChevronLeft, 
  LayoutDashboard, FileText, Clock, X, Plus, Bold, Italic, Quote,
  Type, Image as ImageIcon, Settings, Info, Save
} from 'lucide-react';
import Link from 'next/link';

export default function AdminWritePage() {
  const [isPreview, setIsPreview] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [title, setTitle] = useState("शनि का गोचर 2024");
  const [content, setContent] = useState("शनि का गोचर 2024 में एक महत्वपूर्ण ज्योतिषीय घटना है...");
  const [tags, setTags] = useState(["ShaniTransit", "VedicAstrology"]);
  const [newTag, setNewTag] = useState("");

  // Logic to calculate word count & reading time
  const wordCount = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 150);

  const addTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  if (isPreview) { /* Previous Preview Code... */ }

  return (
    <div className="flex h-screen bg-brand-paper overflow-hidden">
      {/* LEFT SIDEBAR (Library) */}
      <aside className="hidden w-64 flex-col border-r border-brand-navy/10 bg-white lg:flex">
        <div className="p-6 border-b border-brand-navy/5">
          <Link href="/" className="flex items-center gap-2 text-brand-navy font-bold">
            <LayoutDashboard size={20} className="text-brand-gold" />
            Admin Dashboard
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2 mb-4">Library</p>
          <button className="flex w-full items-center gap-3 rounded-lg bg-brand-navy/5 px-3 py-2 text-sm font-bold text-brand-navy text-left">
            <FileText size={18} /> New Article
          </button>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 hover:bg-brand-navy/5 transition-colors text-left text-brand-gold">
            <Clock size={18} /> Drafts (4)
          </button>
        </nav>
        <div className="p-4 border-t border-brand-navy/5">
           <button 
            onClick={() => setShowSettings(!showSettings)}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${showSettings ? 'bg-brand-gold text-brand-navy' : 'text-slate-500 hover:bg-brand-navy/5'}`}
           >
            <Settings size={18} /> SEO & Settings
          </button>
        </div>
      </aside>

      {/* MAIN EDITOR AREA */}
      <main className="flex flex-1 flex-col overflow-hidden relative">
        <header className="flex h-16 items-center justify-between border-b border-brand-navy/5 bg-white px-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[10px] font-bold text-green-500 uppercase tracking-widest">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></div>
              Cloud Synced
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setIsPreview(true)} className="flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-widest text-brand-navy hover:bg-brand-navy/5">
              <Eye size={16} /> Preview
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-brand-navy px-6 py-2 text-xs font-bold uppercase tracking-widest text-brand-gold shadow-md active:scale-95 transition-transform">
              <Send size={16} /> Publish
            </button>
          </div>
        </header>

        {/* Toolbar */}
        <div className="flex items-center gap-1 border-b border-brand-navy/5 bg-white px-8 py-2">
          <button title="Bold" className="p-2 text-slate-400 hover:bg-slate-50 hover:text-brand-navy rounded"><Bold size={18} /></button>
          <button title="Italic" className="p-2 text-slate-400 hover:bg-slate-50 hover:text-brand-navy rounded"><Italic size={18} /></button>
          <div className="mx-2 h-4 w-px bg-slate-200"></div>
          <button title="Add Sanskrit Block" className="p-2 text-slate-400 hover:bg-slate-50 hover:text-brand-navy rounded flex items-center gap-1 border border-transparent hover:border-brand-gold/30">
            <Quote size={18} /> <span className="text-[10px] font-bold uppercase">Sanskrit Shloka</span>
          </button>

        </div>

        {/* Writing Area */}
        <div className="flex-1 overflow-y-auto px-8 py-12 md:px-20 lg:px-32 pb-32">
          <div className="mx-auto max-w-2xl">
            
            {/* 1. REFINED TAGS AREA (Fixed Visibility & Clipping) */}
            <div className="mb-12 flex flex-wrap items-center gap-3">
              {/* Existing Tags */}
              {tags.map(t => (
                <span key={t} className="flex items-center gap-1.5 rounded-full bg-brand-gold/20 border border-brand-gold/40 px-3 py-1 text-[11px] font-bold text-brand-navy uppercase shadow-sm">
                  #{t}
                  <X 
                    size={14} 
                    className="cursor-pointer text-brand-navy/40 hover:text-red-600 transition-colors" 
                    onClick={() => setTags(tags.filter(tag => tag !== t))} 
                  />
                </span>
              ))}

              {/* Modern Add Tag Input */}
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1 focus-within:border-brand-gold focus-within:ring-1 focus-within:ring-brand-gold/20 transition-all shadow-sm">
                <Plus size={14} className="text-slate-400" />
                <form onSubmit={addTag}>
                  <input 
                    type="text" 
                    value={newTag} 
                    onChange={(e) => setNewTag(e.target.value)} 
                    placeholder="Add Keyword..." 
                    className="w-28 border-none bg-transparent p-0 text-[11px] font-bold uppercase tracking-widest text-brand-navy placeholder:text-slate-400 focus:ring-0" 
                  />
                </form>
              </div>
            </div>

            {/* 2. TITLE (Added top padding to prevent clipping) */}
            <div className="relative pt-4">
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="शीर्षक यहाँ लिखें..."
                className="w-full border-none bg-transparent font-hindi text-4xl md:text-5xl font-black text-brand-navy placeholder:text-slate-200 focus:ring-0 leading-normal py-2"
              />
            </div>
            


            {/* 4. CONTENT EDITOR */}
            <textarea 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="अपनी रिसर्च यहाँ लिखें..."
              className="mt-12 min-h-[600px] w-full resize-none border-none bg-transparent font-hindi text-xl md:text-2xl leading-[1.8] text-brand-ink outline-none focus:ring-0"
            />
          </div>
        </div>

        {/* BOTTOM STATUS BAR */}
        <div className="absolute bottom-0 w-full border-t border-brand-navy/5 bg-white/80 px-8 py-3 backdrop-blur-md flex items-center justify-between">
          <div className="flex gap-6">
            <div className="flex flex-col">
              <span className="text-[8px] font-black uppercase text-slate-400">Word Count</span>
              <span className="text-xs font-bold text-brand-navy">{wordCount} Words</span>
            </div>
            <div className="flex flex-col border-x border-slate-100 px-6">
              <span className="text-[8px] font-black uppercase text-slate-400">Reading Time</span>
              <span className="text-xs font-bold text-brand-navy">{readingTime} Minutes</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] font-black uppercase text-slate-400">Hindi Font</span>
              <span className="text-xs font-bold text-brand-navy">Martel (Primary)</span>
            </div>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-slate-50 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-brand-navy">
            <Info size={14} /> Writing Guide
          </button>
        </div>
      </main>

      {/* RIGHT SIDEBAR (AI Suite) */}
      <aside className="hidden w-80 flex-col border-l border-brand-navy/10 bg-white lg:flex">
        <div className="p-6 border-b border-brand-navy/5">
          <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-brand-navy">
            <Wand2 size={16} className="text-brand-gold" /> AI Suite
          </h3>
        </div>
        <div className="p-6 space-y-4 overflow-y-auto">
          {/* AI Tools Cards from previous version... */}
          <ToolCard icon={<Languages size={18}/>} title="Translation" desc="Hindi to Scholarly English" />
          <ToolCard icon={<FileText size={18}/>} title="Summary" desc="3-Paragraph Exec Summary" />
          <ToolCard icon={<CalendarDays size={18}/>} title="Extract Dates" desc="Muhurats & Transits" badge="SAVE REQ" />
          
          <div className="mt-8 rounded-xl bg-brand-navy p-4 text-center">
            <p className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] mb-2">Need Reference?</p>
            <button className="w-full rounded-lg bg-white/10 py-2 text-[10px] font-bold text-white hover:bg-white/20 transition-colors uppercase">Open Ephemeris</button>
          </div>
        </div>
      </aside>
    </div>
  );
}

// Small helper component for AI Sidebar
function ToolCard({ icon, title, desc, badge }: { icon: any, title: string, desc: string, badge?: string }) {
  return (
    <button className="flex w-full flex-col gap-1 rounded-xl border border-brand-navy/5 bg-brand-paper p-4 text-left transition-all hover:border-brand-gold/50 group">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2 text-brand-navy font-bold text-xs uppercase tracking-tight">
          <span className="text-brand-gold">{icon}</span> {title}
        </div>
        {badge && <span className="rounded bg-slate-200 px-1.5 py-0.5 text-[7px] font-black text-slate-500">{badge}</span>}
      </div>
      <p className="text-[10px] text-slate-400">{desc}</p>
    </button>
  );
}