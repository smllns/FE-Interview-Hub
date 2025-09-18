// helper util - styled toast
import toast from 'react-hot-toast';
import React from 'react';

const baseClasses =
  'px-4 py-2 rounded-lg shadow-lg transition-all duration-300 dark:bg-neutral-200 dark:text-black text-white bg-neutral-800  px-4 py-2 rounded-lg shadow-lg';

export const showToast = (message: string) => {
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      }  ${baseClasses}`}
    >
      {message}
    </div>
  ));
};
