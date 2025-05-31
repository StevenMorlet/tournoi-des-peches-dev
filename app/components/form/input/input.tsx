'use client';

import React from 'react';
import { fontGameCompact } from '@/app/lib/fonts';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className = '', ...props }: InputProps) {
  return (
    <input
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
        autofill:shadow-[inset_0_0_0px_1000px_black]
        ${className}
      `}
    />
  );
}
