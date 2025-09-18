// content for question answer
import { AnimatePresence } from 'motion/react';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  materialDark,
  coy,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import React from 'react';
import { Question } from '@/lib/types';

type AnswerContentProps = {
  mode: string;
  showAnswer: boolean;
  question: Question;
  isDark: boolean;
};

const AnswerContent: React.FC<AnswerContentProps> = ({
  mode,
  showAnswer,
  question,
  isDark,
}) => {
  return (
    <AnimatePresence initial={false}>
      {(mode === 'study' || (mode === 'practice' && showAnswer)) && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className='overflow-hidden mt-3'
        >
          {question.answer && <p>{question.answer}</p>}
          {question.example && (
            <SyntaxHighlighter
              language={question.lang}
              style={isDark ? materialDark : coy}
              className='rounded-2xl mt-3 '
            >
              {question.example}
            </SyntaxHighlighter>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnswerContent;
