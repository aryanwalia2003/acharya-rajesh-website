"use client";

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import ImportantDates from '@/components/ImportantDates';
import { Share2, Bookmark, Sparkles, X, Link2, Check } from 'lucide-react';

interface ExtractedDate {
  date: string;
  title_hi: string;
  title_en: string;
  type: string;
}

interface BlogPostProps {
  post: {
    title: string;
    content: string;
    date: string;
    category: string;
    slug: string;
    englishTranslation: string | null;
    englishSummary: string | null;
    importantDates: ExtractedDate[];
  };
}

export default function ClientBlogPost({ post }: BlogPostProps) {
  const [view, setView] = useState<'hindi' | 'english' | 'summary'>('hindi');
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const hasTranslation = !!post.englishTranslation;
  const hasSummary = !!post.englishSummary;
  const hasDates = post.importantDates && post.importantDates.length > 0;

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `${post.title} - Acharya Rajesh`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareToWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank');
  };

  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-brand-paper">
      {/* Top Progress Bar */}
      <div className="fixed top-0 left-0 z-[60] h-1 w-full bg-brand-navy/10">
        <div className="h-full bg-brand-gold w-1/3 transition-all duration-300"></div>
      </div>

      <Navbar />

      <main className="mx-auto max-w-3xl px-6 py-12 md:py-20">
        {/* Article Header */}
        <header className="mb-12 text-center">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold">
            {post.category}
          </span>
          <h1 className="mt-4 font-hindi text-4xl md:text-5xl font-black leading-tight text-brand-navy">
            {post.title}
          </h1>
          <p className="mt-4 text-sm italic text-slate-400">Published on {post.date} • By Acharya Rajesh </p>
          
          {/* Language Switcher */}
          <div className="mt-8 flex justify-center gap-1 border-b border-brand-navy/10 text-xs font-bold uppercase tracking-widest">
            <button 
              onClick={() => setView('hindi')}
              className={`px-4 py-2 transition-all ${view === 'hindi' ? 'border-b-2 border-brand-gold text-brand-navy' : 'text-slate-400'}`}
            >
              Hindi
            </button>
            <button 
              onClick={() => setView('english')}
              disabled={!hasTranslation}
              className={`px-4 py-2 transition-all flex items-center gap-1 ${view === 'english' ? 'border-b-2 border-brand-gold text-brand-navy' : 'text-slate-400'} ${!hasTranslation ? 'opacity-40 cursor-not-allowed' : ''}`}
            >
              English {hasTranslation && <Sparkles size={12} className="text-brand-gold" />}
            </button>
            <button 
              onClick={() => setView('summary')}
              disabled={!hasSummary}
              className={`px-4 py-2 transition-all flex items-center gap-1 ${view === 'summary' ? 'border-b-2 border-brand-gold text-brand-navy' : 'text-slate-400'} ${!hasSummary ? 'opacity-40 cursor-not-allowed' : ''}`}
            >
              Summary {hasSummary && <Sparkles size={12} className="text-brand-gold" />}
            </button>
          </div>
        </header>

        {/* Article Content */}
        <article className={`prose prose-lg max-w-none text-brand-ink leading-relaxed transition-all duration-500`}>
          {view === 'hindi' && (
            <div className="font-hindi text-xl md:text-2xl space-y-8 opacity-100" dangerouslySetInnerHTML={{ __html: post.content }}>
            </div>
          )}

          {view === 'english' && (
            <div className="font-display text-lg md:text-xl space-y-8 animate-fade-in">
              {hasTranslation ? (
                <div dangerouslySetInnerHTML={{ __html: post.englishTranslation! }} />
              ) : (
                <p className="text-slate-400 italic">English translation is not available yet.</p>
              )}
            </div>
          )}

          {view === 'summary' && (
            <div className="rounded-lg bg-brand-navy/5 p-8 font-display text-lg">
              <h4 className="mb-4 font-bold uppercase tracking-widest text-brand-gold flex items-center gap-2">
                <Sparkles size={16} /> Executive Summary
              </h4>
              {hasSummary ? (
                <p className="leading-relaxed">{post.englishSummary}</p>
              ) : (
                <p className="text-slate-400 italic">Summary is not available yet.</p>
              )}
            </div>
          )}
        </article>

        {/* Key Dates Component - Only show if dates exist */}
        {hasDates && <ImportantDates dates={post.importantDates} />}

        {/* Bottom Actions */}
        <footer className="mt-16 flex items-center justify-between border-t border-brand-navy/10 pt-8">
          <div className="flex gap-4">
            <button 
              onClick={() => setShowShareModal(true)}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-brand-gold"
            >
              <Share2 size={16} /> Share
            </button>
            <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-brand-gold">
              <Bookmark size={16} /> Save
            </button>
          </div>
          <a href="/book" className="text-sm font-bold text-brand-gold underline underline-offset-4 decoration-brand-gold/30 hover:decoration-brand-gold">
            Book an appointment →
          </a>
        </footer>
      </main>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="text-lg font-bold text-brand-navy">Share this article</h3>
              <button 
                onClick={() => setShowShareModal(false)}
                className="p-2 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              {/* Copy Link */}
              <button 
                onClick={copyLink}
                className="flex w-full items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-brand-gold hover:bg-brand-gold/5 transition-all"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-100">
                  {copied ? <Check size={20} className="text-green-500" /> : <Link2 size={20} className="text-slate-600" />}
                </div>
                <div className="text-left">
                  <p className="font-bold text-brand-navy">{copied ? 'Copied!' : 'Copy Link'}</p>
                  <p className="text-xs text-slate-400 truncate max-w-[200px]">{shareUrl}</p>
                </div>
              </button>

              {/* Social Platforms */}
              <div className="grid grid-cols-3 gap-3">
                <button 
                  onClick={shareToWhatsApp}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-200 hover:border-green-500 hover:bg-green-50 transition-all"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-slate-600">WhatsApp</span>
                </button>

                <button 
                  onClick={shareToTwitter}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-200 hover:border-sky-500 hover:bg-sky-50 transition-all"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-black">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-slate-600">X</span>
                </button>

                <button 
                  onClick={shareToFacebook}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-200 hover:border-blue-600 hover:bg-blue-50 transition-all"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-slate-600">Facebook</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
