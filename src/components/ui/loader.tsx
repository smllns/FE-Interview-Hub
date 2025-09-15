'use client';
import { cn } from '@/lib/utils';
import React, { CSSProperties } from 'react';

type SpinningTextProps = {
  children: string | string[];
  style?: CSSProperties;
  duration?: number;
  className?: string;
  reverse?: boolean;
  fontSize?: number;
  radius?: number;
};

export function SpinningText({
  children,
  duration = 10,
  style,
  className,
  reverse = false,
  radius = 5,
}: SpinningTextProps) {
  if (typeof children !== 'string' && !Array.isArray(children)) {
    throw new Error('children must be a string or an array of strings');
  }

  if (Array.isArray(children)) {
    if (!children.every((child) => typeof child === 'string')) {
      throw new Error('all elements in children array must be strings');
    }
    children = children.join('');
  }

  const letters = children.split('');
  letters.push(' ');

  return (
    <div
      className={cn('relative inline-block', className)}
      style={{
        ...style,
        animation: `spin ${duration}s linear infinite`,
        animationDirection: reverse ? 'reverse' : 'normal',
      }}
    >
      {letters.map((letter, index) => (
        <span
          aria-hidden='true'
          key={`${index}-${letter}`}
          className='absolute left-1/2 top-1/2 inline-block'
          style={
            {
              '--index': index,
              '--total': letters.length,
              '--radius': radius,
              transform: `
                translate(-50%, -50%)
                rotate(calc(360deg / var(--total) * var(--index)))
                translateY(calc(var(--radius, 5) * -1ch))
              `,
              transformOrigin: 'center',
            } as CSSProperties
          }
        >
          {letter}
        </span>
      ))}
      <span className='sr-only'>{children}</span>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
