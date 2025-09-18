// single question component
'use client';
import React, { useState } from 'react';
import AnswerBtn from './AnswerBtn';
import AnswerContent from './AnswerContent';
import { LikeButton } from './LikeButton';
import { Question } from '@/lib/types';
import { CoolMode } from './ui/coolBtn';

interface QuestionCardProps {
  question: Question;
  isDark: boolean;
  mode: string;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  isDark,
  mode,
}) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const hasAnswerContent = question.answer || question.example;
  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className='relative w-full p-6 border border-black/30 dark:border-white/15 rounded-xl shadow-sm bg-white dark:bg-neutral-800 max-w-3xl mx-auto z-10'>
      <div className='flex justify-between items-start'>
        <div className='flex flex-col'>
          <div className=' text-sm  flex flex-wrap gap-3 bg-black/10  dark:bg-black/20 w-fit p-2 rounded-xl mb-3'>
            {question.section && <span>🧷 {capitalize(question.section)}</span>}
            {question.difficulty && (
              <span>✨ {capitalize(question.difficulty)}</span>
            )}
            {question.topic && <span>🫧 {question.topic}</span>}
          </div>
          <h2 className='font-bold text-xl '>{question.question}</h2>
        </div>

        <div className='flex flex-col items-end gap-2 ml-4'>
          <CoolMode
            options={{
              particle: '🩷',
              particleCount: 3,
              speedHorz: 3,
              speedUp: 1,
              size: 10,
            }}
          >
            <LikeButton questionId={question.id} />
          </CoolMode>

          {mode === 'practice' && hasAnswerContent && (
            <AnswerBtn
              showAnswer={showAnswer}
              setShowAnswer={setShowAnswer}
              styles='min-[320px]:hidden md:flex'
            />
          )}
        </div>
      </div>

      {mode === 'practice' && hasAnswerContent && (
        <AnswerBtn
          showAnswer={showAnswer}
          setShowAnswer={setShowAnswer}
          styles='md:hidden mt-2'
        />
      )}

      <AnswerContent
        isDark={isDark}
        mode={mode}
        showAnswer={showAnswer}
        question={question}
      />
    </div>
  );
};
