'use client';
import { Github, Linkedin, Mail } from 'lucide-react';
import React from 'react';

const FooterLinks = () => {
  return (
    <div className='flex items-center gap-4'>
      <span className='text-sm opacity-75 '>
        coded by <span className='font-bold'>smllns</span>
      </span>
      <a
        href='https://github.com/smllns'
        target='_blank'
        rel='noopener noreferrer'
        className='text-gray-700 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-600 transition-colors'
      >
        <Github size={20} />
      </a>
      <a
        href='https://www.linkedin.com/in/smllns/'
        target='_blank'
        rel='noopener noreferrer'
        className='text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-colors'
      >
        <Linkedin size={20} />
      </a>
      <a
        href='mailto:marysmoly@gmail.com'
        className='text-gray-700 dark:text-gray-300 hover:text-red-500 transition-colors'
      >
        <Mail size={20} />
      </a>
    </div>
  );
};

export default FooterLinks;
