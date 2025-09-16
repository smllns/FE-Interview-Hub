'use client';
import { motion, useTransform, useScroll, MotionValue } from 'motion/react';
import React, { useMemo, useRef } from 'react';

interface ParallaxCircle {
  size: number;
  top: number;
  left: number;
  speed: number;
}

interface CirclesBackgroundProps {
  count?: number;
  parallaxFactor?: number;
  isDark: boolean;
}

const Circle: React.FC<{
  circle: ParallaxCircle;
  index: number;
  color: string;
  parallaxFactor: number;
  scrollYProgress: MotionValue<number>;
}> = ({ circle, index, color, parallaxFactor, scrollYProgress }) => {
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, circle.speed * parallaxFactor]
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1,
        delay: index * 0.01,
      }}
      style={{
        width: circle.size,
        height: circle.size,
        borderRadius: '50%',
        background: color,
        position: 'absolute',
        top: `${circle.top}%`,
        left: `${circle.left}%`,
        y,
      }}
    />
  );
};

export const CirclesBackgroundFullHeight: React.FC<CirclesBackgroundProps> = ({
  count = 15,
  parallaxFactor = 300,
  isDark,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const color = useMemo(() => (isDark ? '#60a5fa3e' : '#db27783e'), [isDark]);

  const { scrollYProgress } = useScroll({});

  const circles: ParallaxCircle[] = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        size: 80 + Math.random() * 100,
        top: Math.random() * 100,
        left: Math.random() * 100,
        speed: 0.1 + Math.random() * 0.5,
      })),
    [count]
  );

  return (
    <div ref={containerRef} className='relative w-full h-full'>
      {circles.map((c, i) => (
        <Circle
          key={i}
          circle={c}
          index={i}
          color={color}
          parallaxFactor={parallaxFactor}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </div>
  );
};
