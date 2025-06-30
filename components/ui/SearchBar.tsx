// components/ui/SearchBar.tsx
'use client';
import React, { ChangeEvent, forwardRef, useId } from 'react';
import Button from './Button';

export interface SearchBarProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  // לדוגמה: אפשר להוסיף prop של Button לצד כדי לשלוח חיפוש בלחיצה
}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ value, onChange, placeholder = '', className = '' }, ref) => {
    const generatedId = useId();
    return (
      <div className={`flex items-center border border-gray-300 rounded-md ${className}`}>
        <input
          id={generatedId}
          ref={ref}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="flex-1 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-l-md"
        />
        <Button
          className="rounded-r-md"
          type="button"
          variant="secondary"
          // אם רוצים: onClick={() => onSearch(value)}
        >
          חפש
        </Button>
      </div>
    );
  }
);

SearchBar.displayName = 'SearchBar';
export default SearchBar;
