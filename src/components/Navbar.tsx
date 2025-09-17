'use client';
import React, { useState, useRef } from 'react';
import { Navbar, NavBody, NavItems, NavbarLogo } from './ui/resizableNavbar';
import AuthModal from './AuthModal';
import {
  MobileNav,
  MobileNavHeader,
  MobileNavItems,
  MobileNavMenu,
  MobileNavToggle,
} from './ui/mobileNavbar';
import { NavIcons } from './NavIcons';

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

  return (
    <Navbar>
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <NavIcons onLoginClick={() => setOpen(true)} />
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
          <MobileNavItems
            items={navItems}
            onItemClick={() => setIsMobileMenuOpen(false)}
          />
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
};

export default NavigationBar;
