'use client';

import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatedThemeToggler } from '../ThemeToggle';
import { AnimatedHamburgerButton } from './hamburgerBtn';
import { Heart, Settings, UserRound } from 'lucide-react';
import AuthDrawer from '../AuthDrawer';
import { useAuth } from '../useAuth';
import { useRouter } from 'next/navigation';

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavToggleProps {
  isOpen: boolean;
  onClick: () => void;
  toggleRef?: React.RefObject<HTMLDivElement | null>;
}

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: 'blur(10px)',
        boxShadow:
          '0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset',
        width: visible ? '90%' : '100%',
        paddingRight: visible ? '12px' : '0px',
        paddingLeft: visible ? '12px' : '0px',
        borderRadius: '2rem',
        y: visible ? 20 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        'relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-black/40 px-0 py-2 lg:hidden',
        'bg-black/40 dark:bg-white/20',
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        'flex w-full flex-row items-center justify-between pr-4',
        className
      )}
    >
      {children}
    </div>
  );
};

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  toggleRef?: React.RefObject<HTMLDivElement | null>;
}

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
  toggleRef,
}: MobileNavMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        (!toggleRef ||
          !toggleRef.current ||
          !toggleRef.current.contains(e.target as Node))
      ) {
        onClose();
      }
    },
    [onClose, menuRef, toggleRef]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, handleClickOutside]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              backdropFilter: 'blur(10px)',
              boxShadow:
                '0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset',
            }}
            exit={{ opacity: 0 }}
            className={cn(
              'absolute inset-x-0 top-20 z-50 flex w-full flex-col items-center text-neutral-100 justify-start gap-4 rounded-2xl bg-neutral-700 dark:bg-neutral-500 px-4 py-6 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]',
              className
            )}
          >
            <div className='grid grid-cols-2 grid-rows-2 gap-4 w-full'>
              {React.Children.map(children, (child) =>
                React.isValidElement(child)
                  ? React.cloneElement(
                      child as React.ReactElement<{ onClick?: () => void }>,
                      {
                        onClick: () => onClose(),
                      }
                    )
                  : child
              )}
            </div>
            <div className='w-full flex justify-end gap-3 items-center'>
              {user ? (
                <>
                  <div
                    className='dark:text-black rounded-2xl bg-black/80 dark:bg-white px-4 py-3'
                    onClick={() => router.push('/settings')}
                  >
                    <Settings />
                  </div>
                  <div
                    className='dark:text-black rounded-2xl bg-black/80 dark:bg-white px-4 py-3'
                    onClick={() => router.push('/favourites')}
                  >
                    <Heart />
                  </div>
                </>
              ) : (
                <div className='dark:text-black rounded-2xl bg-black/80 dark:bg-white px-4 py-3'>
                  <UserRound
                    onClick={() => {
                      onClose();
                      setOpen(true);
                    }}
                  />
                </div>
              )}
              <AnimatedThemeToggler className='text-white dark:text-black rounded-2xl bg-black/80 dark:bg-white px-4 py-3' />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {open && <AuthDrawer open={open} setOpen={setOpen} />}{' '}
    </>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
  toggleRef,
}: MobileNavToggleProps) => {
  return (
    <div ref={toggleRef}>
      <AnimatedHamburgerButton onClick={onClick} isOpen={isOpen} />
    </div>
  );
};
