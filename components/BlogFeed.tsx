"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import BlogCard from "./BlogCard";
import { getLatestPosts, Post } from "@/app/actions";

type BlogFeedProps = {
  initialPosts: Post[];
  initialHasMore: boolean;
  initialNextCursor: string | null;
};

export default function BlogFeed({
  initialPosts,
  initialHasMore,
  initialNextCursor,
}: BlogFeedProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [nextCursor, setNextCursor] = useState<string | null>(initialNextCursor);
  const [isLoading, setIsLoading] = useState(false);

  // Ref for the sentinel element
  const sentinelRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore || !nextCursor) return;

    setIsLoading(true);
    try {
      const result = await getLatestPosts(10, nextCursor);
      setPosts((prev) => [...prev, ...result.posts]);
      setHasMore(result.hasMore);
      setNextCursor(result.nextCursor);
    } catch (error) {
      console.error("Error loading more posts:", error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, nextCursor]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { rootMargin: "200px" } // Load 200px before reaching the bottom
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, isLoading, loadMore]);

  return (
    <>
      <div className="flex flex-col">
        {posts.length > 0 ? (
          posts.map((blog) => <BlogCard key={blog.slug} {...blog} />)
        ) : (
          <div className="text-center py-12 text-slate-400">
            <p className="text-sm">No articles published yet.</p>
            <p className="text-xs mt-2">Come back soon for astrological insights.</p>
          </div>
        )}
      </div>

      {/* Sentinel element for intersection observer */}
      <div ref={sentinelRef} className="h-4" />

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex justify-center py-8">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 animate-pulse">
            Loading more entries...
          </div>
        </div>
      )}

      {/* End of content indicator */}
      {!hasMore && posts.length > 0 && (
        <div className="mt-8 flex justify-center border-t border-brand-navy/5 pt-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-300">
            You&apos;ve reached the end
          </p>
        </div>
      )}
    </>
  );
}
