import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getLatestPosts } from './actions';
import { ArrowRight, Star, Moon, Sun, Calendar } from 'lucide-react';

export default async function Home() {
  // Fetch only top 3 posts for the teaser section
  const { posts } = await getLatestPosts(3);

  return (
    <div className="min-h-screen bg-brand-paper selection:bg-brand-gold/30">
      <Navbar />
      
      <main>
        {/* HERO SECTION */}
        <section className="relative px-6 py-20 md:py-32 text-center overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-gold/5 rounded-full blur-3xl -z-10"></div>
          
          <div className="mx-auto max-w-4xl relative z-10">
            <span className="inline-block mb-6 rounded-full border border-brand-gold/30 bg-brand-gold/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-navy">
               Astrology & Spiritual Guidance
            </span>
            <h1 className="mb-8 text-5xl md:text-7xl font-display font-medium text-brand-navy leading-tight">
              Align Your Life with <br/>
              <span className="italic text-brand-gold">Cosmic Wisdom</span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-brand-navy/70 leading-relaxed font-hindi">
              Explore ancient  knowledge, daily panchang, and spiritual insights to navigate life's journey with clarity and purpose.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/journal" 
                className="group flex items-center gap-2 rounded-full bg-brand-navy px-8 py-4 text-sm font-bold uppercase tracking-widest text-brand-gold shadow-lg hover:bg-brand-navy/90 hover:scale-105 transition-all"
              >
                Read Journal <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/about" 
                className="flex items-center gap-2 rounded-full border border-brand-navy/10 bg-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-brand-navy hover:bg-brand-navy/5 hover:border-brand-navy/30 transition-all"
              >
                About Acharya Ji
              </Link>
            </div>
          </div>
        </section>

        {/* CATEGORIES SECTION */}
        <section className="px-6 py-16 bg-white/50">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-brand-navy mb-4">Explore by Category</h2>
              <div className="h-1 w-20 bg-brand-gold mx-auto rounded-full"></div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {/* Category: Astrology */}
              <Link href="/journal?category=Astrology" className="group">
                <div className="h-full bg-brand-paper p-8 rounded-2xl border border-brand-navy/5 hover:border-brand-gold/30 hover:shadow-lg transition-all text-center">
                  <div className="w-16 h-16 mx-auto bg-brand-navy rounded-full flex items-center justify-center mb-6 text-brand-gold group-hover:scale-110 transition-transform shadow-md">
                    <Moon size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-brand-navy mb-3">Astrology</h3>
                  <p className="text-brand-navy/60 text-sm leading-relaxed mb-4">
                    In-depth analysis of planetary movements, zodiac signs, and their impact on your life.
                  </p>
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-gold group-hover:text-brand-navy transition-colors">View Articles &rarr;</span>
                </div>
              </Link>

              {/* Category: Panchang */}
              <Link href="/journal?category=Panchang" className="group">
                <div className="h-full bg-brand-paper p-8 rounded-2xl border border-brand-navy/5 hover:border-brand-gold/30 hover:shadow-lg transition-all text-center">
                   <div className="w-16 h-16 mx-auto bg-brand-navy rounded-full flex items-center justify-center mb-6 text-brand-gold group-hover:scale-110 transition-transform shadow-md">
                    <Calendar size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-brand-navy mb-3">Panchang</h3>
                  <p className="text-brand-navy/60 text-sm leading-relaxed mb-4">
                    Daily  calendar, auspicious timings (Shubh Muhurat), and planetary positions.
                  </p>
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-gold group-hover:text-brand-navy transition-colors">View Daily Updates &rarr;</span>
                </div>
              </Link>

              {/* Category: Festivals */}
              <Link href="/journal?category=Festivals" className="group">
                <div className="h-full bg-brand-paper p-8 rounded-2xl border border-brand-navy/5 hover:border-brand-gold/30 hover:shadow-lg transition-all text-center">
                   <div className="w-16 h-16 mx-auto bg-brand-navy rounded-full flex items-center justify-center mb-6 text-brand-gold group-hover:scale-110 transition-transform shadow-md">
                    <Sun size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-brand-navy mb-3">Festivals</h3>
                  <p className="text-brand-navy/60 text-sm leading-relaxed mb-4">
                    Significance, rituals, and dates of major Indian festivals and spiritual observances.
                  </p>
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-gold group-hover:text-brand-navy transition-colors">Celebrate &rarr;</span>
                </div>
              </Link>
              
               {/* Category: Miscellaneous */}
               <Link href="/journal?category=Misceleneous" className="group">
                <div className="h-full bg-brand-paper p-8 rounded-2xl border border-brand-navy/5 hover:border-brand-gold/30 hover:shadow-lg transition-all text-center">
                   <div className="w-16 h-16 mx-auto bg-brand-navy rounded-full flex items-center justify-center mb-6 text-brand-gold group-hover:scale-110 transition-transform shadow-md">
                    <Star size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-brand-navy mb-3">Miscellaneous</h3>
                  <p className="text-brand-navy/60 text-sm leading-relaxed mb-4">
                    General spiritual guidance, Vastu tips, and other wisdom for daily living.
                  </p>
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-gold group-hover:text-brand-navy transition-colors">Explore More &rarr;</span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* LATEST FROM JOURNAL */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-4xl">
             <div className="flex items-center justify-between mb-12">
               <div>
                  <h2 className="text-3xl font-display text-brand-navy">Latest Insights</h2>
                  <p className="text-sm text-brand-navy/50 mt-2">Updates from the  Journal</p>
               </div>
               <Link href="/journal" className="hidden md:flex text-xs font-bold uppercase tracking-widest text-brand-navy hover:text-brand-gold transition-colors items-center gap-2">
                 View All <ArrowRight size={14} />
               </Link>
            </div>

            <div className="space-y-8">
              {posts.map((post) => (
                <Link 
                  key={post.slug} 
                  href={`/blog/${post.slug}`}
                  className="block group"
                >
                  <article className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-white border border-brand-navy/5 hover:border-brand-gold/30 hover:shadow-md transition-all">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                         <span className="px-2 py-1 rounded bg-brand-navy/5 text-[10px] font-bold uppercase tracking-wider text-brand-navy/70">
                            {post.category}
                         </span>
                         <span className="text-[10px] uppercase tracking-wider text-brand-navy/40 font-bold flex items-center gap-1">
                            <Calendar size={10} /> {post.date}
                         </span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-brand-navy mb-3 font-hindi group-hover:text-brand-gold transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-brand-navy/60 text-sm leading-relaxed line-clamp-2 md:line-clamp-3 font-hindi">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="md:self-center">
                       <span className="text-xs font-bold uppercase tracking-widest text-brand-gold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                         Read Article <ArrowRight size={14} />
                       </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            <div className="mt-12 text-center md:hidden">
               <Link href="/journal" className="inline-block rounded-full border border-brand-navy/10 px-6 py-3 text-xs font-bold uppercase tracking-widest text-brand-navy hover:bg-brand-navy hover:text-brand-gold transition-colors">
                 View All Articles
               </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}