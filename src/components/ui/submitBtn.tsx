// reusable submit button
import React from 'react';

type SubmitBtnProps = {
  btnLabel: string;
};

const SubmitBtn = ({ btnLabel }: SubmitBtnProps) => {
  return (
    <button
      type='submit'
      className='cursor-pointer rounded px-4 py-2 transition bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20  font-bold uppercase border dark:border-white/30 border-black/30 '
    >
      {btnLabel}
    </button>
  );
};

export default SubmitBtn;
