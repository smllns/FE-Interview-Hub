// questions list reusable component
import React from 'react';
import { QuestionCard } from './QuestionCard';
import { Question } from '@/lib/types';

type QuestionsListProps = {
  questions: Question[];
  isDark: boolean;
  questionsFilterMode: string;
};

const QuestionsList: React.FC<QuestionsListProps> = ({
  questions,
  isDark,
  questionsFilterMode,
}) => {
  return (
    <>
      {questions.map((q) => (
        <QuestionCard
          key={q.id}
          question={q}
          isDark={isDark}
          mode={questionsFilterMode}
        />
      ))}
    </>
  );
};

export default QuestionsList;
