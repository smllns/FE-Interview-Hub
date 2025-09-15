import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import CustomInput from '../ui/input';
import SubmitBtn from '../ui/submitBtn';
import { ResetPassForm } from '@/lib/types';

type ChangeFormProps = {
  changeForm: UseFormReturn<{ password: string }>;
  onSubmitChange: (data: { password: string }) => void;
  submitError: string | null | undefined;
};

const FormChange: React.FC<ChangeFormProps> = ({
  changeForm,
  onSubmitChange,
  submitError,
}) => {
  return (
    <form
      onSubmit={changeForm.handleSubmit(onSubmitChange)}
      className='flex flex-col gap-4'
    >
      <CustomInput<ResetPassForm>
        labelText='New Password'
        type='password'
        name='password'
        form={changeForm}
        placeholder='yourNewPassword'
        autocomplete='new-password'
      />

      {submitError && (
        <p className='text-sm text-red-500 mt-1 mx-auto'>
          Error: {submitError}
        </p>
      )}
      <SubmitBtn btnLabel='Change Password' />
    </form>
  );
};

export default FormChange;
