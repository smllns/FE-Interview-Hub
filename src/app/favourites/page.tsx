'use client';
import NavigationBar from '@/components/Navbar';
import Iridescence from '@/components/ui/backgrounds/favsBg';
import { useDarkMode } from '@/hooks/isDarkTheme';
import { ChevronsDown } from 'lucide-react';
import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { useScrollTo } from '@/hooks/useScrollTo';
import { useAuth } from '@/components/useAuth';
import { SkeletonList } from '@/components/SkeletonList';
import { QuestionCard } from '@/components/QuestionCard';
import ToggleFilter from '@/components/ToggleFilter';
import Footer from '@/components/Footer';
import { Question } from '@/lib/types';

const FavPage = () => {
  const mainRef = useRef<HTMLDivElement | null>(null);
  const [questionsFilterMode, setQuestionsFilterMode] = useState('practice');
  const [favQuestions, setFavQuestions] = useState<Question[]>([]);

  const scrollToMain = useScrollTo(mainRef);
  const isDark = useDarkMode();
  const { user, favourites } = useAuth();
  useEffect(() => {
    if (user && favourites.length > 0) {
      fetch('/api/favourites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: favourites }),
      })
        .then((res) => res.json())
        .then((data) => setFavQuestions(data))
        .catch((err) => console.error(err));
    }
  }, [user, favourites]);

  return (
    <div className='min-h-screen w-full relative flex flex-col '>
      <div className='sticky w-full top-10 z-20 px-4'>
        <NavigationBar />
      </div>
      <div className='px-4 py-8 text-center h-screen w-full relative flex flex-col items-center justify-center '>
        <div className='absolute inset-0 -z-10'>
          <Iridescence
            isDark={isDark}
            mouseReact={false}
            amplitude={0.1}
            speed={1.0}
          />
        </div>
        <h1
          className='min-[320px]:text-4xl md:text-6xl z-10 font-bold text-black dark:text-white text-center px-4
    rounded-xl'
        >
          Favourite Questions
        </h1>
        <p className='min-[320px]:text-lg sm:text-xl md:text-2xl font-black mb-4'>
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
      <div
        className='min-h-screen flex flex-col justify-center items-center px-4'
        ref={mainRef}
      >
        <div className='flex justify-center px-8 pt-32 pb-8'>
          <ToggleFilter
            options={['practice', 'study']}
            selected={questionsFilterMode}
            onChange={setQuestionsFilterMode}
            title='Display mode'
          />
        </div>
        <div className='w-full max-w-3xl space-y-6 pb-8 mx-auto'>
          {favQuestions.length === 0 ? (
            <SkeletonList count={5} isDark={isDark} />
          ) : (
            favQuestions.map((q) => (
              <QuestionCard
                key={q.id}
                question={q}
                isDark={isDark}
                mode={questionsFilterMode}
              />
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FavPage;
