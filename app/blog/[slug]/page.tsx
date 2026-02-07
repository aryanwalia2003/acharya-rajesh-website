"use client"; // Interactive features ke liye

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import ImportantDates from '@/components/ImportantDates';
import { Share2, Bookmark } from 'lucide-react';

export default function BlogPost() {
  const [view, setView] = useState<'hindi' | 'english' | 'summary'>('hindi');

  // Static data for UI demo
  const blogData = {
    title: "वैदिक ज्योतिष: शनि का कुंभ राशि में गोcher",
    date: "October 12, 2023",
    category: "Planetary Transits",
    importantDates: [
      { date: "Jan 17, 2024", event: "Saturn enters Aquarius", description: "A major shift in collective karma and social structures." },
      { date: "June 29, 2024", event: "Saturn Retrograde", description: "Time for internal review and karmic re-balancing." }
    ]
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
            {blogData.category}
          </span>
          <h1 className="mt-4 font-hindi text-4xl md:text-5xl font-black leading-tight text-brand-navy">
            {blogData.title}
          </h1>
          <p className="mt-4 text-sm italic text-slate-400">Published on {blogData.date} • By Pandit Sharma</p>
          
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
              className={`px-4 py-2 transition-all ${view === 'english' ? 'border-b-2 border-brand-gold text-brand-navy' : 'text-slate-400'}`}
            >
              English
            </button>
            <button 
              onClick={() => setView('summary')}
              className={`px-4 py-2 transition-all ${view === 'summary' ? 'border-b-2 border-brand-gold text-brand-navy' : 'text-slate-400'}`}
            >
              Summary
            </button>
          </div>
        </header>

        {/* Article Content */}
        <article className={`prose prose-lg max-w-none text-brand-ink leading-relaxed transition-all duration-500 ${view === 'hindi' ? 'select-none' : ''}`}>
          {view === 'hindi' && (
            <div className="font-hindi text-xl md:text-2xl space-y-8 opacity-100">
              <p className="first-letter:text-6xl first-letter:font-bold first-letter:text-brand-gold first-letter:float-left first-letter:mr-3">
                बृहस्पति ग्रह को देवताओं का गुरु माना जाता है। ज्योतिष शास्त्र में बृहस्पति को अत्यंत शुभ फलदायी ग्रह माना गया है। यह ज्ञान, धन, और सौभाग्य का कारक है।
              </p>
              <p>
                जब ये ग्रह एक राशि से दूसरी राशि में प्रवेश करते हैं, तो पृथ्वी पर रहने वाले सभी प्राणियों पर इसका प्रभाव पड़ता है। शनि, जिसे कर्मफलदाता कहा जाता है, हमारे कर्मों का हिसाब रखता है।
              </p>
            </div>
          )}

          {view === 'english' && (
            <div className="font-display text-lg md:text-xl space-y-8 animate-fade-in">
              <p>Jupiter is considered the Guru of the deities. In Vedic astrology, Jupiter is known as an extremely auspicious planet, signifying wisdom, wealth, and fortune...</p>
            </div>
          )}

          {view === 'summary' && (
            <div className="rounded-lg bg-brand-navy/5 p-8 italic font-display text-lg animate-pulse-subtle">
              <h4 className="mb-4 font-bold uppercase tracking-widest text-brand-gold">Executive Summary</h4>
              <p>This article explores the karmic implications of the 2024 Saturn transit, highlighting key dates for spiritual discipline and advising on remedies for the Aquarius movement.</p>
            </div>
          )}
        </article>

        {/* Key Dates Component */}
        <ImportantDates dates={blogData.importantDates} />

        {/* Bottom Actions */}
        <footer className="mt-16 flex items-center justify-between border-t border-brand-navy/10 pt-8">
          <div className="flex gap-4">
            <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-brand-gold">
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
    </div>
  );
}