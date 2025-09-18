// wrapper for questions background
import React from 'react';
import { CirclesBackgroundFullHeight } from './ui/backgrounds/questionsBg';
import { Question } from '@/lib/types';

type ParallaxQuestionsCirclesProps = {
  isDark: boolean;
  questions: Question[];
  count: number;
};

const ParallaxQuestionsCircles: React.FC<ParallaxQuestionsCirclesProps> = ({
  count,
  isDark,
  questions,
}) => {
  return (
    <>
      {questions.length !== 0 && (
        <div className='absolute inset-0 pointer-events-none z-0'>
          <CirclesBackgroundFullHeight
            isDark={isDark}
            count={count}
            parallaxFactor={8000}
          />
        </div>
      )}
    </>
  );
};

export default ParallaxQuestionsCircles;
