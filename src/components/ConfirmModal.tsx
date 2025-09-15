'use client';

import { X } from 'lucide-react';
import React from 'react';
import FormChange from './forms/FormChange';
import { UseFormReturn } from 'react-hook-form';

interface ConfirmModalProps {
  open: boolean;
  title?: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
  onChangePassword: (data: { password: string }) => void;
  error?: string | null;
  mode?: 'normal' | 'password';
  form: UseFormReturn<{ password: string }>;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  onChangePassword,
  form,
  error,
  mode = 'normal',
}) => {
  if (!open) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      {/* overlay */}
      <div className='absolute inset-0 bg-black/50' onClick={onCancel} />

      {/* modal */}
      <div className='relative bg-white dark:bg-neutral-900 rounded-xl shadow-2xl p-6 w-[90%] max-w-md z-10 flex flex-col gap-4'>
        <button
          className='absolute z-10 cursor-pointer top-3 right-3 text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition'
          onClick={onCancel}
        >
          <X size={20} />
        </button>
        {mode === 'normal' ? (
          <>
            <h2 className='text-2xl font-bold'>{title}</h2>
            <p className='text-lg'>{message}</p>
            {error && (
              <p className='text-sm text-red-500 mt-1 mx-auto'>
                Error: {error}
              </p>
            )}
            <div className='flex justify-end gap-4 mt-2'>
              <button
                className='px-4 py-2  rounded-lg font-bold text-lg text-white bg-black/30 hover:bg-black/40 dark:bg-white/30 dark:hover:bg-white/40  border dark:border-white/30 border-black/30 transition-all duration-200 cursor-pointer'
                onClick={onCancel}
              >
                No
              </button>
              <button
                className='px-4 py-2 font-bold rounded-lg text-lg text-white bg-red-600/60 hover:bg-red-600/80 dark:bg-red-500/60 dark:hover:bg-red-500/70  border dark:border-white/30 border-black/30 transition-all duration-200 cursor-pointer'
                onClick={onConfirm}
              >
                Yes
              </button>
            </div>
          </>
        ) : (
          <FormChange
            changeForm={form}
            submitError={error}
            onSubmitChange={onChangePassword}
          />
        )}
      </div>
    </div>
  );
};

export default ConfirmModal;
