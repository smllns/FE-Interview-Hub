import { BACKGROUNDS } from '@/lib/bgData';
import { ChevronsDown } from 'lucide-react';
import React from 'react';
import { motion } from 'framer-motion';

interface ContentPageHeroProps {
  title: string;
  description: string;
  scrollToMain: () => void;
  isDark: boolean;
}

const ContentPageHero: React.FC<ContentPageHeroProps> = ({
  title,
  description,
  scrollToMain,
  isDark,
}) => {
  const activeBackgrounds = BACKGROUNDS.filter(
    (bg) =>
      title.toLowerCase().includes(bg.key) ||
      description.toLowerCase().includes(bg.key)
  );
  return (
    <div className='h-screen overflow-hidden'>
      <div
        className='
    absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8
    min-[320px]:text-4xl md:text-6xl z-10 font-bold text-black dark:text-white text-center px-4
    rounded-xl
    '
      >
        <h1 className='min-[320px]:text-3xl sm:text-4xl md:text-6xl font-black mb-4'>
          {title}
        </h1>
        <p className='mb-8 min-[320px]:text-sm sm:text-xl'>{description}</p>
        <motion.div
          className='mx-auto py-4 w-10 h-10 cursor-pointer'
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: 'loop',
          }}
          onClick={scrollToMain}
        >
          <ChevronsDown className='text-black dark:text-white w-10 h-10' />
        </motion.div>
      </div>
      {activeBackgrounds.map((bg, idx) => {
        switch (bg.key) {
          case 'javascript':
            return <bg.component key={idx} isDark={isDark} {...bg.props} />;
          case 'tailwind':
            return <bg.component key={idx} isDark={isDark} {...bg.props} />;
          case 'react':
            return <bg.component key={idx} isDark={isDark} {...bg.props} />;
          case 'typescript':
            return <bg.component key={idx} isDark={isDark} {...bg.props} />;
          case 'html':
            return <bg.component key={idx} isDark={isDark} {...bg.props} />;
          case 'visuals':
            return <bg.component key={idx} isDark={isDark} {...bg.props} />;
        }
      })}
    </div>
  );
};

export default ContentPageHero;
