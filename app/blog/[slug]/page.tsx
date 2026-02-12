import { getPostBySlug } from '@/app/actions';
import Navbar from '@/components/Navbar';
import ImportantDates from '@/components/ImportantDates';
import { Share2, Bookmark } from 'lucide-react';
import { notFound } from 'next/navigation';
import ClientBlogPost from './ClientBlogPost';

import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const post = await getPostBySlug(decodedSlug);

  if (!post) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: post.title,
    description: post.teaser || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.teaser || post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: ['Acharya Rajesh'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.teaser || post.excerpt,
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const post = await getPostBySlug(decodedSlug);

  if (!post) {
    notFound();
  }

  return <ClientBlogPost post={post} />;
}