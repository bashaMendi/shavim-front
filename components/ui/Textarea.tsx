// components/ui/Textarea.tsx
'use client';
import React, { forwardRef, useId, TextareaHTMLAttributes, ReactNode } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  id?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, id, icon, iconPosition = 'right', className = '', ...props }, ref) => {
    const generatedId = useId();
    const textareaId = id ?? generatedId;

    const textareaClasses = `
      w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent 
      bg-white/50 backdrop-blur-sm transition-all duration-200 resize-none
      ${icon ? (iconPosition === 'right' ? 'pr-10 pl-4' : 'pl-10 pr-4') : 'px-4'}
      py-3
      ${error ? 'border-red-500 focus:ring-red-500' : ''}
      ${className}
    `.trim();

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className={`absolute top-3 transform ${
              iconPosition === 'right' ? 'right-3' : 'left-3'
            }`}>
              {icon}
            </div>
          )}
          <textarea
            id={textareaId}
            ref={ref}
            className={textareaClasses}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${textareaId}-error` : undefined}
            {...props}
          />
        </div>
        {error && (
          <p id={`${textareaId}-error`} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
export default Textarea; 