import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  slug: string;
}

export default function BlogCard({ title, excerpt, date, category, slug }: BlogCardProps) {
  return (
    <article className="group flex flex-col gap-4 border-b border-brand-navy/5 py-12 last:border-0">
      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold">
          {category}
        </span>
        <Link href={`/blog/${slug}`}>
          <h2 className="text-3xl md:text-4xl font-normal leading-tight text-brand-navy group-hover:text-brand-gold transition-colors duration-300">
            {title}
          </h2>
        </Link>
        <time className="text-xs italic text-slate-400">{date}</time>
      </div>
      
      <p className="hindi-text text-lg md:text-xl leading-relaxed text-brand-ink/80 opacity-90 line-clamp-3">
        {excerpt}
      </p>

      <div className="pt-2">
        <Link 
          href={`/blog/${slug}`} 
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-brand-gold hover:text-brand-navy transition-colors group/link"
        >
          Read Entry
          <ArrowRight size={16} className="transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}