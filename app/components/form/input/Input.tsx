'use client';

import { fontGameCompact } from '@/app/lib/fonts';
import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className = '', autoComplete = 'off', ...props }: InputProps) {
  return (
    <input
      autoComplete={autoComplete}
      {...props}
      className={`
        p-2 w-full 
        border-4 
        rounded-md 
        bg-transparent
        ${fontGameCompact.className}
        text-white
        border-gray-300
        placeholder-neutral-500
        focus:outline-none focus:ring-2 focus:ring-primary
        transition duration-200 ease-in-out
        ${className}
      `}
    />
  );
}
