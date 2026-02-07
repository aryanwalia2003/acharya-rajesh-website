"use client";

import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef, useCallback, useEffect } from 'react';

interface VirtualizedListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  estimatedItemHeight: number;
  onLoadMore?: () => void;
  hasNextPage?: boolean;
  isLoading?: boolean;
  loadingComponent?: React.ReactNode;
  emptyComponent?: React.ReactNode;
  className?: string;
  overscan?: number;
}

export function VirtualizedList<T>({
  items,
  renderItem,
  estimatedItemHeight,
  onLoadMore,
  hasNextPage = false,
  isLoading = false,
  loadingComponent,
  emptyComponent,
  className = '',
  overscan = 5
}: VirtualizedListProps<T>) {
  const parentRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimatedItemHeight,
    overscan,
  });

  // Infinite scroll via IntersectionObserver
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting && hasNextPage && !isLoading && onLoadMore) {
      onLoadMore();
    }
  }, [hasNextPage, isLoading, onLoadMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: parentRef.current,
      rootMargin: '200px', // Trigger before reaching bottom
      threshold: 0,
    });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [handleIntersection]);

  if (items.length === 0 && !isLoading) {
    return emptyComponent || <div className="p-8 text-center text-slate-400">No items found</div>;
  }

  return (
    <div ref={parentRef} className={`overflow-auto ${className}`}>
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            {renderItem(items[virtualRow.index], virtualRow.index)}
          </div>
        ))}
      </div>

      {/* Sentinel for infinite scroll */}
      <div ref={loadMoreRef} style={{ height: 1 }} />

      {/* Loading indicator */}
      {isLoading && (loadingComponent || (
        <div className="py-4 text-center text-sm text-slate-400 animate-pulse">
          Loading more...
        </div>
      ))}
    </div>
  );
}
