'use client';
import React, { useState, useRef } from 'react';
import { Navbar, NavBody, NavItems, NavbarLogo } from './ui/resizableNavbar';
import { AnimatedThemeToggler } from './ThemeToggle';
import AuthModal from './AuthModal';
import { Heart, Settings, UserRound } from 'lucide-react';
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
} from './ui/mobileNavbar';
import { useAuth } from './useAuth';
import { useRouter } from 'next/navigation';

const navItems = [
  { name: 'HTML', link: '/html' },
  { name: 'CSS', link: '/css' },
  { name: 'JS', link: '/javascript' },
  { name: 'TAILWIND', link: '/tailwind' },
  { name: 'REACT', link: '/react' },
  { name: 'TS', link: '/typescript' },
];
const NavigationBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const router = useRouter();

  return (
    <Navbar>
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <div className='flex items-center gap-4'>
          {user ? (
            <>
              <Settings
                className='cursor-pointer hover:scale-110 transition z-10 text-white'
                onClick={() => router.push('/settings')}
              />
              <Heart
                className='cursor-pointer hover:scale-110 transition z-10 text-white'
                onClick={() => router.push('/favourites')}
              />
            </>
          ) : (
            <UserRound
              className='cursor-pointer hover:scale-110 transition z-10 text-white'
              onClick={() => setOpen(true)}
            />
          )}
          <AnimatedThemeToggler className='z-10 text-white cursor-pointer transition hover:scale-110' />
        </div>
      </NavBody>
      {open && <AuthModal open={open} setOpen={setOpen} />}

      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            toggleRef={toggleRef}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => {
            setIsMobileMenuOpen(false);
          }}
          toggleRef={toggleRef}
        >
          {navItems.map((item, idx) => (
            <a
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={() => {
                setIsMobileMenuOpen(false);
              }}
              className='relative flex justify-center items-center font-semibold text-neutral-100 dark:text-black bg-black dark:bg-white transition-all duration-300 px-10 py-2 rounded-full'
            >
              <span>{item.name}</span>
            </a>
          ))}
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
};

export default NavigationBar;
