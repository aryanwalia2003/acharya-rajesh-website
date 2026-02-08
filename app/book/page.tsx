import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, ArrowRight, MessageSquare, Phone } from 'lucide-react';

export default function BookPage() {
  return (
    <div className="min-h-screen bg-brand-paper selection:bg-brand-gold/30 flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center px-6 py-20">
        <div className="text-center max-w-2xl">
          {/* Icon */}
          <div className="w-20 h-20 bg-brand-navy/5 rounded-full flex items-center justify-center mx-auto mb-8 text-brand-navy animate-pulse">
            <Calendar size={40} strokeWidth={1.5} />
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-display font-medium text-brand-navy mb-6">
            Consultations <br/>
            <span className="italic text-brand-gold">Coming Soon</span>
          </h1>

          {/* Description */}
          <p className="text-lg text-brand-navy/70 leading-relaxed mb-10">
            We are currently refining our online booking system to provide you with the best experience. 
            In the meantime, you can directly reach out to us for appointments.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://wa.me/919810449333" 
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-emerald-600 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white shadow-lg hover:bg-emerald-700 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <MessageSquare size={18} />
              Book on WhatsApp
            </a>
            
            <a 
              href="tel:+919810449333" 
              className="rounded-full border border-brand-navy/10 bg-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-brand-navy shadow-sm hover:border-brand-gold/50 hover:text-brand-gold transition-all flex items-center justify-center gap-2"
            >
              <Phone size={18} />
              Call Now
            </a>
          </div>

          {/* Back Link */}
          <div className="mt-12">
            <Link href="/" className="text-xs font-bold uppercase tracking-widest text-brand-navy/40 hover:text-brand-navy transition-colors">
              Return Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
