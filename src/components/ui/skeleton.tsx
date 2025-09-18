// skeleton card/list components
'use client';
import React from 'react';

interface SkeletonListProps {
  count: number;
  isDark: boolean;
  className?: string;
}

export const SkeletonCard = ({ isDark }: { isDark: boolean }) => (
  <div
    suppressHydrationWarning
    className={`w-full max-w-3xl mx-auto h-24 rounded-xl animate-pulse ${
      isDark ? 'bg-white/20' : 'bg-black/20'
    }`}
  />
);

export const SkeletonList = ({
  count,
  isDark,
  className,
}: SkeletonListProps) => (
  <div className={`flex flex-col gap-6 ${className}`}>
    {Array(count)
      .fill(0)
      .map((_, i) => (
        <SkeletonCard key={i} isDark={isDark} />
      ))}
  </div>
);
