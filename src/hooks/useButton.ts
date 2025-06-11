import type { ButtonProps } from '../types/button';
import clsx from 'clsx';

const ButtonSize = {
  sm: 'w-11 h-5 text-xs p-1',
  md: 'w-22 h-9 px-4 py-2',
  lg: 'w-30 h-10 text-lg px-6 py-2',
  xl: 'w-40 h-15 px-6 py-4',
};

export const useButton = ({ size, text, type, disabled, onClick, customStyle }: ButtonProps) => {
  const buttonStyle = clsx(
    'border flex justify-center items-center rounded-md transition box-border outline-none',
    {
      'cursor-pointer': !disabled,
      'hover:bg-gray-300': !disabled && type !== 'text',
      'bg-gray-200 hover:bg-gray-200 text-gray-600 cursor-not-allowed': disabled,
      'border-none hover:bg-transparent hover:font-semibold': type === 'text',
    },
    ButtonSize[size],
    customStyle
  );

  return { text, type, buttonStyle, disabled, onClick };
};
