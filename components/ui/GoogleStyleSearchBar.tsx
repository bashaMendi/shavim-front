'use client';
import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface GoogleStyleSearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function GoogleStyleSearchBar({
  value,
  onChange,
  onSearch,
  placeholder = "חפש...",
  className = ""
}: GoogleStyleSearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    const event = {
      target: { value: '' }
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(event);
    inputRef.current?.focus();
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={`relative max-w-2xl mx-auto ${className}`}>
      <div className={`
        relative flex items-center w-full
        bg-white/80 backdrop-blur-sm
        border-2 rounded-full shadow-lg
        transition-all duration-300 ease-in-out
        ${isFocused 
          ? 'border-purple-500 shadow-purple-200/50 scale-[1.02]' 
          : 'border-gray-200 hover:border-gray-300 hover:shadow-xl'
        }
      `}>
        {/* אייקון חיפוש - כפתור לחיפוש */}
        <button
          onClick={handleSearch}
          className="absolute right-3 p-2 text-gray-400 hover:text-purple-500 transition-colors duration-200 rounded-full hover:bg-purple-50"
          type="button"
          aria-label="חפש"
        >
          <Search size={18} />
        </button>

        {/* שדה קלט */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="
            w-full pr-12 pl-4 py-3
            bg-transparent
            text-gray-800 placeholder-gray-500
            text-base
            outline-none
            border-none
            rounded-full
          "
        />

        {/* כפתור ניקוי */}
        {value && (
          <button
            onClick={handleClear}
            className="
              absolute left-3
              p-1 rounded-full
              bg-gray-200 hover:bg-gray-300
              text-gray-500 hover:text-gray-700
              transition-all duration-200
              flex items-center justify-center
            "
            type="button"
            aria-label="נקה חיפוש"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* אפקט זוהר כשמתמקדים */}
      {isFocused && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-xl -z-10" />
      )}
    </div>
  );
} 