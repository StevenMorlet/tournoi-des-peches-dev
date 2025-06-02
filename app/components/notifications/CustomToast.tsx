'use client';

import { X } from 'lucide-react';
import clsx from 'clsx';
import { fontGameCompact } from '@/app/lib/fonts';

type CustomToastProps = {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  onDismiss?: () => void;
};

export default function CustomToast({ message, type = 'info', onDismiss }: CustomToastProps) {
  const baseStyles = 'flex items-center w-full max-w-xs p-4 text-sm rounded-lg shadow-md';

  const typeStyles = {
    success: `text-green-300 bg-black border border-4 border-green-700 ${fontGameCompact.className}`,
    error: `text-red-300 bg-black border border-4 border-red-700 ${fontGameCompact.className}`,
    warning: `text-yellow-300 bg-black border border-4 border-yellow-700 ${fontGameCompact.className}`,
    info: `text-white bg-neutral-900 border border-4 border-neutral-700 ${fontGameCompact.className}`,
  };

  const iconBg = {
    success: 'bg-green-900 text-green-400',
    error: 'bg-red-900 text-red-400',
    warning: 'bg-yellow-900 text-yellow-300',
    info: 'bg-neutral-800 text-white',
  };

  const icons = {
    success: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm1-11h-2v2h2V7Zm0 4h-2v4h2v-4Z" />
      </svg>
    ),
  };

  return (
    <div className={clsx(baseStyles, typeStyles[type])}>
      <div className={clsx('flex items-center justify-center w-8 h-8 rounded-lg', iconBg[type])}>
        {icons[type]}
      </div>
      <div className="ml-3 font-normal">{message}</div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="ml-auto text-gray-500 hover:text-white rounded-lg p-1.5 hover:bg-white/10 transition cursor-pointer"
        >
          <X className="w-5 h-5" strokeWidth={4} />
        </button>
      )}
    </div>
  );
}
