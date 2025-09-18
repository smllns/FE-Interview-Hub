// hero section for favourites page
import React from 'react';
import Iridescence from './ui/backgrounds/favsBg';
import { motion } from 'framer-motion';
import { ChevronsDown } from 'lucide-react';

const FavouritesHero = ({
  scrollToMain,
  isDark,
}: {
  scrollToMain: () => void;
  isDark: boolean;
}) => {
  return (
    <div className='px-4 py-8 text-center h-screen w-full relative flex flex-col items-center justify-center'>
      <div className='absolute inset-0 -z-10'>
        <Iridescence
          isDark={isDark}
          mouseReact={false}
          amplitude={0.1}
          speed={1.0}
        />
      </div>
      <h1 className='min-[320px]:text-3xl sm:text-4xl md:text-6xl z-10 font-bold text-black dark:text-white text-center px-4 rounded-xl'>
        Favourite Questions
      </h1>
      <p className='min-[320px]:text-sm sm:text-xl md:text-2xl font-black mb-4'>
        Here you can find all the questions you’ve marked as favourites
      </p>
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
  );
};

export default FavouritesHero;
