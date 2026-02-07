import Navbar from '@/components/Navbar';
import BlogCard from '@/components/BlogCard';

export default function Home() {
  // Static data for UI development
  const featuredBlogs = [
    {
      title: "Saturn's Transit through Aquarius 2024",
      excerpt: "शनि का कुंभ राशि में गोचर एक महत्वपूर्ण ज्योतिषीय घटना है। यह समय आत्म-चिंतन और कर्मों के फल का विश्लेषण करने का है। इस गोचर के दौरान, हमें धैर्य और अनुशासन का पालन करना चाहिए...",
      date: "October 12, 2023",
      category: "Planetary Transits",
      slug: "saturn-transit-2024"
    },
    {
      title: "Understanding the Nakshatras",
      excerpt: "नक्षत्रों का हमारे जीवन पर गहरा प्रभाव पड़ता है। वैदिक ज्योतिष में २७ नक्षत्रों का वर्णन मिलता है, जिनमें से प्रत्येक की अपनी विशिष्ट ऊर्जा है। चंद्रमा की स्थिति के अनुसार नक्षत्र हमारे मन और भावनाओं को निर्देशित करते हैं...",
      date: "September 28, 2023",
      category: "Fundamentals",
      slug: "understanding-nakshatras"
    }
  ];

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

        {/* Blog Feed */}
        <div className="flex flex-col">
          {featuredBlogs.map((blog) => (
            <BlogCard key={blog.slug} {...blog} />
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 flex justify-center border-t border-brand-navy/5 pt-12">
          <button className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-brand-gold transition-colors">
            View Older Entries
          </button>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-brand-navy/5 py-12 text-center">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
          © 2024 Acharya Rajesh Walia. All Wisdom Reserved.
        </p>
      </footer>
    </div>
  );
}