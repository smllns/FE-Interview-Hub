'use client';
import NavigationBar from '@/components/Navbar';
import { Heart } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useScrollTo } from '@/hooks/useScrollTo';
import { useAuth } from '@/context/AuthContext';
import Footer from '@/components/Footer';
import { Question } from '@/lib/types';
import QuestionComponent from '@/components/QuestionComponent';
import { useDarkMode } from '@/hooks/isDarkTheme';
import FavouritesHero from '@/components/FavouritesHero';

const FavPage = () => {
  const mainRef = useRef<HTMLDivElement | null>(null);
  const [questionsFilterMode, setQuestionsFilterMode] = useState('practice');
  const [favQuestions, setFavQuestions] = useState<Question[] | null>([]);

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
    } else {
      setFavQuestions(null);
    }
  }, [user, favourites]);

  return (
    <div className='min-h-screen w-full relative flex flex-col'>
      <div className='sticky w-full top-10 z-20 px-4'>
        <NavigationBar />
      </div>
      <FavouritesHero scrollToMain={scrollToMain} isDark={isDark} />
      {favQuestions === null ? (
        <div
          className='min-h-screen flex justify-center flex-col items-center'
          ref={mainRef}
        >
          <h1 className='min-[320px]:text-3xl sm:text-4xl md:text-5xl z-10 font-bold text-black dark:text-white text-center px-4 rounded-xl'>
            Seems like you don’t have any favourite questions yet!
          </h1>
          <p className='min-[320px]:text-lg sm:text-xl md:text-2xl font-black text-center m-4'>
            Click{' '}
            <Heart
              className='w-10 h-10 inline-flex'
              fill='red'
              strokeWidth={2}
            />{' '}
            button on any question to add to favourites!
          </p>
        </div>
      ) : (
        <div className='min-h-screen flex justify-center flex-col'>
          <QuestionComponent
            isDark={isDark}
            questions={favQuestions}
            questionsFilterMode={questionsFilterMode}
            setQuestionsFilterMode={setQuestionsFilterMode}
            count={80}
            ref={mainRef}
            pt={true}
          />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default FavPage;
