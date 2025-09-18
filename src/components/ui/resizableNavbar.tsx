// desktop navbar
'use client';
import { cn } from '@/lib/utils';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { PaintRoller } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import {
  NavbarLogoProps,
  NavbarProps,
  NavBodyProps,
  NavItemsProps,
} from '@/lib/types';

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div ref={ref} className={cn(' z-40 w-full h-0', className)}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible }
            )
          : child
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? 'blur(10px)' : 'blur(10px)',
        boxShadow:
          '0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset',
        width: visible ? '40%' : '100%',
        y: visible ? 20 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 50,
      }}
      style={{
        minWidth: '800px',
      }}
      className={cn(
        'relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-black/40 px-4 py-2 lg:flex ',
        'bg-black/40 dark:bg-white/20',
        className
      )}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible }
            )
          : child
      )}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const pathname = usePathname();

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        'absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-md font-black text-neutral-100 transition duration-200  lg:flex lg:space-x-2',
        className
      )}
    >
      {items.map((item, idx) => {
        const isActive = pathname === item.link;

        return (
          <Link
            onMouseEnter={() => setHovered(idx)}
            onClick={onItemClick}
            className='relative px-4 py-2 text-neutral-100 transition-all'
            key={`link-${idx}`}
            href={item.link}
          >
            {(hovered === idx || isActive) && (
              <motion.div
                layoutId='hovered'
                className='absolute inset-0 h-full w-full rounded-xl dark:bg-white/20 bg-black/20'
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className='relative z-20'>{item.name}</span>
          </Link>
        );
      })}
    </motion.div>
  );
};

export const NavbarLogo = ({ visible }: NavbarLogoProps) => {
  const router = useRouter();
  const handleClick = () => {
    if (visible) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/home');
    }
  };

  return (
    <button
      onClick={handleClick}
      className='relative z-20 mx-4 flex items-center space-x-4 px-2 py-1 font-black cursor-pointer'
    >
      <PaintRoller width={30} height={30} className='text-white' />
      <span className=' text-neutral-100 uppercase '>FE Hub</span>
    </button>
  );
};
