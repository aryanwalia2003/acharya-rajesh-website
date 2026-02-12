import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogFeed from '@/components/BlogFeed';
import { getLatestPosts } from '../actions';

// Force dynamic rendering (no caching)
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Journal | Acharya Rajesh ',
  description: 'Explore the complete collection of  Astrology articles, daily horoscopes, and spiritual insights.',
};

export default async function JournalPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const category = params.category;
  const { posts, hasMore, nextCursor } = await getLatestPosts(10, undefined, category);

  return (
    <div className="min-h-screen bg-brand-paper selection:bg-brand-gold/30">
      <Navbar />
      
      <main className="mx-auto max-w-2xl px-6 py-16 md:py-24">
        {/* Header */}
        <section className="mb-12 text-center">
          <p className="mb-4 text-sm italic text-brand-gold font-medium">
            The Complete Archive
          </p>
          <h1 className="text-4xl md:text-5xl font-normal tracking-tight text-brand-navy">
             Journal
          </h1>
          <div className="mx-auto mt-8 h-px w-24 bg-brand-gold/40"></div>
        </section>

        {/* Category Filter */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          <Link 
            href="/journal"
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-all ${
              !category 
                ? 'bg-brand-navy text-brand-gold border-brand-navy' 
                : 'bg-white text-slate-500 border-slate-200 hover:border-brand-navy/30 hover:text-brand-navy'
            }`}
          >
            All
          </Link>
          {['Astrology', 'Panchang', 'Festivals', 'Misceleneous'].map((cat) => (
            <Link 
              key={cat}
              href={`/journal?category=${cat}`}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-all ${
                category === cat
                  ? 'bg-brand-navy text-brand-gold border-brand-navy' 
                  : 'bg-white text-slate-500 border-slate-200 hover:border-brand-navy/30 hover:text-brand-navy'
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Blog Feed with Infinite Scroll */}
        {/* Key forces remount when category changes, fixing the "not redirected" issue */}
        <BlogFeed
          key={category || 'all'}
          initialPosts={posts}
          initialHasMore={hasMore}
          initialNextCursor={nextCursor}
          category={category}
        />
      </main>

      <Footer />
    </div>
  );
}
