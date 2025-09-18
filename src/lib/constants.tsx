import {
  CodeXml,
  FileCode2,
  Paintbrush,
  Palette,
  Rocket,
  ShieldCheck,
  Github,
  Linkedin,
  Mail,
  Baby,
  Puzzle,
  Star,
} from 'lucide-react';
// constants with colors for topics display
export const topicColors = [
  {
    light: '#f87171,#fbbf24,#34d399',
    dark: '#f8717179,#fbbf2479,#34d3997d',
  },
  {
    light: '#60a5fa,#a78bfa,#f472b6',
    dark: '#60a5fa80,#a78bfa80,#f472b680',
  },
  {
    light: '#facc15,#22d3ee,#8b5cf6',
    dark: '#facc1579,#22d3ee7d,#8b5cf67d',
  },
  {
    light: '#fb923c,#f59e0b,#84cc16',
    dark: '#fb923c7d,#f59e0b7d,#84cc167d',
  },
  {
    light: '#06b6d4,#3b82f6,#9333ea',
    dark: '#06b6d480,#3b82f680,#9333ea80',
  },
];

// constants with messaged text and colors for terminal display
export const terminalMessages = [
  {
    text: '✔ Loading HTML/CSS modules...',
    color: 'text-green-600 dark:text-green-500',
  },
  {
    text: '✔ Verifying JavaScript knowledge...',
    color: 'text-green-600 dark:text-green-500',
  },
  {
    text: '✔ Setting up React and Next.js questions...',
    color: 'text-green-600 dark:text-green-500',
  },
  {
    text: '✔ Initializing TypeScript checks...',
    color: 'text-green-600 dark:text-green-500',
  },
  {
    text: '✔ Tailwind CSS & design system validation...',
    color: 'text-green-600 dark:text-green-500',
  },
  {
    text: '✔ Motion/Animations modules loaded...',
    color: 'text-green-600 dark:text-green-500',
  },
];

// constants for grid on main page
export const features = [
  {
    Icon: FileCode2,
    name: 'HTML',
    description: 'Questions & answers on HTML: structure, tags, semantics.',
    href: '/html',
    cta: 'Learn More',
    background: (
      <div
        className='absolute inset-0 
        bg-[radial-gradient(120%_120%_at_50%_0%,rgba(0,119,255,0.6)_0%,rgba(236,72,153,0.6)_40%,rgba(251,191,36,0.6)_100%)]
        dark:bg-[radial-gradient(120%_120%_at_50%_0%,rgba(219,39,119,0.8)_0%,rgba(79,70,229,0.7)_50%,rgba(245,158,11,0.7)_100%)]
        opacity-40 dark:opacity-30'
      />
    ),
    className:
      'lg:row-start-1 lg:row-end-2 lg:col-start-2 lg:col-end-3 min-[320px]:max-h-60 sm:max-h-full',
  },
  {
    Icon: Palette,
    name: 'CSS',
    description:
      'Questions & answers on CSS: selectors, Flexbox, Grid, animations.',
    href: '/css',
    cta: 'Discover',
    background: (
      <div
        className='absolute inset-0 
        bg-[radial-gradient(130%_130%_at_20%_30%,rgba(0,119,255,0.6)_0%,rgba(147,51,234,0.6)_45%,rgba(244,114,182,0.6)_100%)]
        dark:bg-[radial-gradient(130%_130%_at_20%_30%,rgba(6,182,212,0.8)_0%,rgba(227,66,255,0.7)_40%,rgba(59,246,62,0.7)_100%)]
        opacity-40 dark:opacity-30'
      />
    ),
    className:
      'lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3 min-[320px]:max-h-60 sm:max-h-full',
  },
  {
    Icon: CodeXml,
    name: 'JavaScript',
    description:
      'Questions & answers on JS: variables, functions, events, DOM.',
    href: '/javascript',
    cta: 'Check It Out',
    background: (
      <div
        className='absolute inset-0 
        bg-[radial-gradient(140%_140%_at_80%_20%,rgba(59,130,246,0.6)_0%,rgba(251,191,36,0.6)_50%,rgba(244,63,94,0.6)_100%)]
        dark:bg-[radial-gradient(140%_140%_at_80%_20%,rgba(245,158,11,0.8)_0%,rgba(16,185,129,0.7)_40%,rgba(34,197,94,0.7)_100%)]
        opacity-40 dark:opacity-30'
      />
    ),
    className:
      'lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4 min-[320px]:max-h-60 sm:max-h-full',
  },
  {
    Icon: Paintbrush,
    name: 'Tailwind CSS',
    description:
      'Questions & answers on Tailwind: utilities, responsiveness, themes.',
    href: '/tailwind',
    cta: 'View More',
    background: (
      <div
        className='absolute inset-0 
        bg-[radial-gradient(150%_150%_at_50%_80%,rgba(14,165,233,0.6)_0%,rgba(101,255,70,0.6)_45%,rgba(139,92,246,0.6)_100%)]
        dark:bg-[radial-gradient(150%_150%_at_50%_80%,rgba(236,72,153,0.8)_0%,rgba(139,92,246,0.7)_50%,rgba(14,165,233,0.7)_100%)]
        opacity-40 dark:opacity-30'
      />
    ),
    className:
      'lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-3 min-[320px]:max-h-60 sm:max-h-full',
  },
  {
    Icon: ShieldCheck,
    name: 'TypeScript',
    description:
      'Questions & answers on TypeScript: types, interfaces, generics.',
    href: '/typescript',
    cta: 'Explore',
    background: (
      <div
        className='absolute inset-0 
        bg-[radial-gradient(160%_160%_at_30%_70%,rgba(2,82,255,0.6)_0%,rgba(231,112,255,0.6)_40%,rgba(236,72,153,0.6)_100%)]
        dark:bg-[radial-gradient(160%_160%_at_30%_70%,rgba(34,197,94,0.8)_0%,rgba(21,128,61,0.7)_40%,rgba(74,222,128,0.7)_100%)]
        opacity-40 dark:opacity-30'
      />
    ),
    className:
      'lg:col-start-3 lg:col-end-3 lg:row-start-3 lg:row-end-4 min-[320px]:max-h-60 sm:max-h-full',
  },
  {
    Icon: Rocket,
    name: 'React',
    description: 'Questions & answers on React: components, hooks, state.',
    href: '/react',
    cta: 'Read More',
    background: (
      <div
        className='absolute inset-0 
        bg-[radial-gradient(180%_180%_at_70%_60%,rgba(34,197,94,0.6)_0%,rgba(255,238,0,0.6)_40%,rgba(59,130,246,0.4)_100%)]
        dark:bg-[radial-gradient(180%_180%_at_70%_60%,rgba(245,158,11,0.8)_0%,rgba(236,72,153,0.7)_40%,rgba(79,70,229,0.7)_100%)]
        opacity-40 dark:opacity-30'
      />
    ),
    className:
      'lg:row-start-2 lg:row-end-4 lg:col-start-2 lg:col-end-3 min-[320px]:max-h-60 sm:max-h-full',
  },
];

// links for footer
export const links = [
  {
    href: 'https://github.com/smllns',
    icon: <Github size={20} />,
    colorClass: 'hover:text-green-700 dark:hover:text-green-600',
  },
  {
    href: 'https://www.linkedin.com/in/smllns/',
    icon: <Linkedin size={20} />,
    colorClass: 'hover:text-blue-500',
  },
  {
    href: 'mailto:marysmoly@gmail.com',
    icon: <Mail size={20} />,
    colorClass: 'hover:text-red-500',
  },
];

// constants for difficulty grid
export const levels = [
  {
    Icon: Baby,
    name: 'Beginner',
    description: 'Easy questions for getting started.',
    colorsLight: '#f87171,#fbbf24,#34d399',
    colorsDark: '#f8717179,#fbbf2479,#34d3997d',
  },
  {
    Icon: Puzzle,
    name: 'Middle',
    description: 'Intermediate questions to level up.',
    colorsLight: '#60a5fa,#a78bfa,#f472b6',
    colorsDark: '#60a5fa80,#a78bfa80,#f472b680',
  },
  {
    Icon: Star,
    name: 'Senior',
    description: 'Advanced questions for experts.',
    colorsLight: '#facc15,#22d3ee,#8b5cf6',
    colorsDark: '#facc1579,#22d3ee7d,#8b5cf67d',
  },
];
