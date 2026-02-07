import Navbar from '@/components/Navbar';
import BlogFeed from '@/components/BlogFeed';
import { getLatestPosts } from './actions';

export default async function Home() {
  const { posts, hasMore, nextCursor } = await getLatestPosts(10);

  return (
    <div className="min-h-screen bg-brand-paper selection:bg-brand-gold/30">
      <Navbar />
      
      <main className="mx-auto max-w-2xl px-6 py-16 md:py-24">
        {/* Intro Header */}
        <section className="mb-20 text-center">
          <p className="mb-4 text-sm italic text-brand-gold font-medium">
            Ancient Wisdom for the Modern Seeker
          </p>
          <h1 className="text-4xl md:text-5xl font-normal tracking-tight text-brand-navy">
            The Vedic Scholar
          </h1>
          <div className="mx-auto mt-8 h-px w-24 bg-brand-gold/40"></div>
        </section>

        {/* Blog Feed with Infinite Scroll */}
        <BlogFeed
          initialPosts={posts}
          initialHasMore={hasMore}
          initialNextCursor={nextCursor}
        />
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-brand-navy/5 py-12 text-center">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
          © {new Date().getFullYear()} Acharya Rajesh Walia. All Wisdom Reserved.
        </p>
      </footer>
    </div>
  );
}