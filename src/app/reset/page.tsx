'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthForms } from '@/hooks/useAuthForms';
import FormChange from '@/components/forms/FormChange';

export default function ResetPasswordPage() {
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  if (success === true) {
    setTimeout(() => router.push('/home'), 2000);
  }

  const { resetPassForm, handleResetPass, submitError } = useAuthForms({
    setSuccess,
  });

  return (
    <div className='min-h-screen flex items-center justify-center p-6'>
      <div className='max-w-md w-full bg-white dark:bg-black shadow-lg rounded-2xl p-6'>
        <h1 className='text-2xl font-bold mb-4 text-center'>Reset Password</h1>

        {success ? (
          <p className='mx-auto text-xl text-center flex flex-col gap-2'>
            <span className='text-pink-400 '>
              ✅ Password successfully updated!
            </span>
            You will be redirected to the main page shortly.
          </p>
        ) : (
          <FormChange
            changeForm={resetPassForm}
            submitError={submitError}
            onSubmitChange={handleResetPass}
          />
        )}
      </div>
    </div>
  );
}
