// component wrapper for questions, skeleton, mode toggler and background
import ParallaxQuestionsCircles from './ParallaxQuestionsCircles';
import ModeToggle from './ModeToggle';
import QuestionsList from './QuestionsList';
import React, { ForwardedRef } from 'react';
import { Question } from '@/lib/types';
import { SkeletonList } from './ui/skeleton';

interface QuestionComponentProps {
  ref?: ForwardedRef<HTMLDivElement>;
  isDark: boolean;
  questions: Question[];
  questionsFilterMode: string;
  setQuestionsFilterMode: (value: string) => void;
  count: number;
  pt: boolean;
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({
  ref,
  isDark,
  questions,
  questionsFilterMode,
  setQuestionsFilterMode,
  count,
  pt,
}) => {
  return (
    <div className='w-full max-w-dvw relative overflow-hidden' ref={ref}>
      <ParallaxQuestionsCircles
        isDark={isDark}
        questions={questions}
        count={count}
      />

      <div className='relative z-10 flex flex-col gap-6 py-8 px-4'>
        <ModeToggle
          questionsFilterMode={questionsFilterMode}
          setQuestionsFilterMode={setQuestionsFilterMode}
          pt={pt}
        />
        {questions.length === 0 ? (
          <SkeletonList count={5} isDark={isDark} />
        ) : (
          <QuestionsList
            questions={questions}
            isDark={isDark}
            questionsFilterMode={questionsFilterMode}
          />
        )}
      </div>
    </div>
  );
};

export default QuestionComponent;
