// components/ui/Input.tsx
'use client';
import React, { forwardRef, useId, InputHTMLAttributes, ReactNode } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  id?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, icon, iconPosition = 'right', className = '', ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    const inputClasses = `
      w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent 
      bg-white/50  transition-all duration-200
      ${icon ? (iconPosition === 'right' ? 'pr-10 pl-4' : 'pl-10 pr-4') : 'px-4'}
      py-3
      ${error ? 'border-red-500 focus:ring-red-500' : ''}
      ${className}
    `.trim();

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className={`absolute top-1/2 transform -translate-y-1/2 ${
              iconPosition === 'right' ? 'right-3' : 'left-3'
            }`}>
              {icon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={inputClasses}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...props}
          />
        </div>
        {error && (
          <p id={`${inputId}-error`} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
