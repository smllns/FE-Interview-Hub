import React from 'react';

type AnswerBtnProps = {
  setShowAnswer: (show: boolean) => void;
  showAnswer: boolean;
  styles: string;
};

const AnswerBtn: React.FC<AnswerBtnProps> = ({
  setShowAnswer,
  showAnswer,
  styles,
}) => {
  return (
    <button
      className={`${styles} px-3 py-2 min-w-[155px] rounded-lg font-bold bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2`}
      onClick={() => setShowAnswer(!showAnswer)}
    >
      {showAnswer ? 'Hide Answer' : 'Show Answer'}
      <svg
        className={`w-4 h-4 transition-transform duration-200 ${
          showAnswer ? 'rotate-180' : 'rotate-0'
        }`}
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M19 9l-7 7-7-7'
        />
      </svg>
    </button>
  );
};

export default AnswerBtn;
