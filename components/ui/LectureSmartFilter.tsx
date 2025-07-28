'use client';

import { useState, useEffect, useRef } from 'react';
import Button from './Button';
import { X, Filter, ChevronDown, Star, Clock } from 'lucide-react';

interface LectureSmartFilterProps {
  onFilterChange: (filters: LectureFilterState) => void;
  className?: string;
}

export interface LectureFilterState {
  rating: string;
  duration: string;
}

export default function LectureSmartFilter({ onFilterChange, className = "" }: LectureSmartFilterProps) {
  const [filters, setFilters] = useState<LectureFilterState>({
    rating: '',
    duration: ''
  });
  const [ratingDropdownOpen, setRatingDropdownOpen] = useState(false);
  const [durationDropdownOpen, setDurationDropdownOpen] = useState(false);
  const [ratingFocusIndex, setRatingFocusIndex] = useState(-1);
  const [durationFocusIndex, setDurationFocusIndex] = useState(-1);
  const ratingRef = useRef<HTMLDivElement>(null);
  const durationRef = useRef<HTMLDivElement>(null);

  const ratingOptions = [
    { value: '', label: 'כל הדירוגים' },
    { value: '4.5', label: '4.5 ומעלה' },
    { value: '4.0', label: '4.0 ומעלה' },
    { value: '3.5', label: '3.5 ומעלה' },
    { value: '3.0', label: '3.0 ומעלה' }
  ];

  const durationOptions = [
    { value: '', label: 'כל הזמנים' },
    { value: '30', label: 'עד 30 דקות' },
    { value: '45', label: 'עד 45 דקות' },
    { value: '60', label: 'עד שעה' },
    { value: '90', label: 'עד שעה וחצי' },
    { value: '120', label: 'עד שעתיים' }
  ];

  const handleFilterChange = (key: keyof LectureFilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
    
    // סגור את ה-dropdown אחרי בחירה
    if (key === 'rating') {
      setRatingDropdownOpen(false);
      setRatingFocusIndex(-1);
    }
    if (key === 'duration') {
      setDurationDropdownOpen(false);
      setDurationFocusIndex(-1);
    }
  };

  const clearFilters = () => {
    const clearedFilters = { rating: '', duration: '' };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = filters.rating !== '' || filters.duration !== '';

  // סגור dropdowns כשלוחצים מחוץ להם
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ratingRef.current && !ratingRef.current.contains(event.target as Node)) {
        setRatingDropdownOpen(false);
        setRatingFocusIndex(-1);
      }
      if (durationRef.current && !durationRef.current.contains(event.target as Node)) {
        setDurationDropdownOpen(false);
        setDurationFocusIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ניווט במקלדת
  const handleKeyDown = (event: React.KeyboardEvent, type: 'rating' | 'duration') => {
    const isRating = type === 'rating';
    const options = isRating ? ratingOptions : durationOptions;
    const focusIndex = isRating ? ratingFocusIndex : durationFocusIndex;
    const setFocusIndex = isRating ? setRatingFocusIndex : setDurationFocusIndex;
    const isOpen = isRating ? ratingDropdownOpen : durationDropdownOpen;

    if (!isOpen) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setFocusIndex(prev => (prev + 1) % options.length);
        break;
      case 'ArrowUp':
        event.preventDefault();
        setFocusIndex(prev => (prev - 1 + options.length) % options.length);
        break;
      case 'Enter':
        event.preventDefault();
        if (focusIndex >= 0) {
          const selectedOption = options[focusIndex];
          handleFilterChange(type, selectedOption.value);
        }
        break;
      case 'Escape':
        event.preventDefault();
        if (isRating) {
          setRatingDropdownOpen(false);
          setRatingFocusIndex(-1);
        } else {
          setDurationDropdownOpen(false);
          setDurationFocusIndex(-1);
        }
        break;
    }
  };

  const getRatingLabel = () => {
    if (!filters.rating) return 'דירוג';
    const option = ratingOptions.find(opt => opt.value === filters.rating);
    return option ? option.label : 'דירוג';
  };

  const getDurationLabel = () => {
    if (!filters.duration) return 'זמן';
    const option = durationOptions.find(opt => opt.value === filters.duration);
    return option ? option.label : 'זמן';
  };

  return (
    <div className={`${className}`}>
      {/* Filter Controls */}
      <div className="flex gap-3">
        {/* Rating Filter Button */}
        <div className="relative" ref={ratingRef}>
          <Button
            variant="outline"
            onClick={() => {
              setRatingDropdownOpen(!ratingDropdownOpen);
              setDurationDropdownOpen(false);
              setDurationFocusIndex(-1);
              if (!ratingDropdownOpen) {
                setRatingFocusIndex(-1);
              }
            }}
            onKeyDown={(e) => handleKeyDown(e, 'rating')}
            className={`flex items-center gap-2 px-4 py-2 border-2 transition-all duration-200 ${
              filters.rating 
                ? 'border-purple-500 text-purple-600 bg-purple-50' 
                : 'border-gray-300 text-gray-700 hover:border-purple-300'
            }`}
          >
            <Star className="w-4 h-4" />
            <span>{getRatingLabel()}</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
              ratingDropdownOpen ? 'rotate-180' : ''
            }`} />
          </Button>

          {/* Rating Dropdown */}
          {ratingDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-[9999]">
              {ratingOptions.map((option, index) => (
                <button
                  key={option.value}
                  onClick={() => handleFilterChange('rating', option.value)}
                  onKeyDown={(e) => handleKeyDown(e, 'rating')}
                  onMouseEnter={() => setRatingFocusIndex(index)}
                  className={`w-full text-right px-4 py-2 transition-all duration-150 ${
                    filters.rating === option.value 
                      ? 'bg-purple-50 text-purple-600 font-medium' 
                      : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
                  } ${index === ratingFocusIndex ? 'bg-purple-100' : ''} ${
                    option.value === '' ? 'border-b border-gray-100' : ''
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Duration Filter Button */}
        <div className="relative" ref={durationRef}>
          <Button
            variant="outline"
            onClick={() => {
              setDurationDropdownOpen(!durationDropdownOpen);
              setRatingDropdownOpen(false);
              setRatingFocusIndex(-1);
              if (!durationDropdownOpen) {
                setDurationFocusIndex(-1);
              }
            }}
            onKeyDown={(e) => handleKeyDown(e, 'duration')}
            className={`flex items-center gap-2 px-4 py-2 border-2 transition-all duration-200 ${
              filters.duration 
                ? 'border-green-500 text-green-600 bg-green-50' 
                : 'border-gray-300 text-gray-700 hover:border-green-300'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>{getDurationLabel()}</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
              durationDropdownOpen ? 'rotate-180' : ''
            }`} />
          </Button>

          {/* Duration Dropdown */}
          {durationDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-[9999]">
              {durationOptions.map((option, index) => (
                <button
                  key={option.value}
                  onClick={() => handleFilterChange('duration', option.value)}
                  onKeyDown={(e) => handleKeyDown(e, 'duration')}
                  onMouseEnter={() => setDurationFocusIndex(index)}
                  className={`w-full text-right px-4 py-2 transition-all duration-150 ${
                    filters.duration === option.value 
                      ? 'bg-green-50 text-green-600 font-medium' 
                      : 'text-gray-700 hover:bg-green-50 hover:text-green-600'
                  } ${index === durationFocusIndex ? 'bg-green-100' : ''} ${
                    option.value === '' ? 'border-b border-gray-100' : ''
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Clear All Button */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={clearFilters}
            className="text-gray-500 hover:text-red-600 text-sm"
          >
            נקה הכל
          </Button>
        )}
      </div>
    </div>
  );
} 