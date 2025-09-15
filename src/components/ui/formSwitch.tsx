import React from 'react';

interface FormSwitchTextProps {
  formText: string;
  formLink: string;
  mode: 'signup' | 'login';
  handleTabChange: (newMode: 'login' | 'signup') => void;
}

const FormSwitchText: React.FC<FormSwitchTextProps> = ({
  formText,
  formLink,
  mode,
  handleTabChange,
}) => {
  return (
    <p className='text-sm text-center mt-2'>
      {formText}{' '}
      <span
        className='text-pink-400 cursor-pointer hover:underline'
        onClick={() => handleTabChange(mode)}
      >
        {formLink}
      </span>
    </p>
  );
};

export default FormSwitchText;
