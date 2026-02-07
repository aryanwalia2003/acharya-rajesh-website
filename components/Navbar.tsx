import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-navy/10 bg-brand-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="text-brand-gold transition-transform duration-500 group-hover:rotate-180">
            <Sparkles size={28} fill="currentColor" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tight text-brand-navy leading-none">
              ACHARYA RAJESH
            </h1>
            <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gold font-bold">
              Vedic Astrologer
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-brand-navy/70">
          <Link href="/articles" className="hover:text-brand-gold transition-colors">Journal</Link>
          <Link href="/about" className="hover:text-brand-gold transition-colors">About</Link>
          <Link href="/contact" className="hover:text-brand-gold transition-colors">Contact</Link>
        </nav>

        {/* CTA Button */}
        <Link 
          href="/book" 
          className="rounded-full bg-brand-navy px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-brand-gold shadow-lg hover:bg-brand-navy/90 transition-all active:scale-95"
        >
          Book Appointment
        </Link>
      </div>
    </header>
  );
}