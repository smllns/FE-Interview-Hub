import React, { useState } from 'react';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';

interface CustomInputProps<T extends FieldValues> {
  labelText: string;
  type: string;
  name: Path<T>;
  form: UseFormReturn<T>;
  placeholder: string;
  autocomplete: string;
}

function CustomInput<T extends FieldValues>({
  labelText,
  type,
  name,
  form,
  placeholder,
  autocomplete,
}: CustomInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className='flex flex-col'>
      <label className='block text-md font-medium mb-1'>{labelText}</label>

      <div className='relative'>
        <input
          type={inputType}
          {...form.register(name)}
          placeholder={placeholder}
          autoComplete={autocomplete}
          className='w-full border dark:border-white/30 border-black/40 rounded px-3 py-2 pr-10 focus:outline-none focus:border-black focus:bg-black/10 dark:focus:border-white dark:focus:bg-white/10'
        />

        {/* show/hide eye for password */}
        {isPassword && (
          <button
            type='button'
            onClick={() => setShowPassword((prev) => !prev)}
            className='absolute inset-y-0 right-3 flex items-center justify-center text-gray-500 hover:text-black dark:text-gray-300 dark:hover:text-white cursor-pointer transition '
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {typeof form.formState.errors[name]?.message === 'string' && (
        <p className='text-sm text-red-500 mt-1'>
          {form.formState.errors[name]?.message}
        </p>
      )}
    </div>
  );
}

export default CustomInput;
