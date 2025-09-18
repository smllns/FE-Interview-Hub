// links for footer
'use client';
import { links } from '@/lib/constants';
import React from 'react';

const FooterLinks: React.FC = () => (
  <div className='flex items-center gap-4'>
    <span className='text-sm opacity-75'>
      coded by <span className='font-bold'>smllns</span>
    </span>
    {links.map((link, idx) => (
      <a
        key={idx}
        href={link.href}
        target={link.href.startsWith('http') ? '_blank' : undefined}
        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className={`text-gray-700 dark:text-gray-300 transition-colors ${link.colorClass}`}
      >
        {link.icon}
      </a>
    ))}
  </div>
);

export default FooterLinks;
