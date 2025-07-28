'use client';

import { useState, useEffect, useRef } from 'react';
import Button from './Button';
import { X, Filter, ChevronDown, Star, MapPin } from 'lucide-react';

interface SmartFilterProps {
  locations: string[];
  onFilterChange: (filters: FilterState) => void;
  className?: string;
}

export interface FilterState {
  rating: string;
  location: string;
}

export default function SmartFilter({ locations, onFilterChange, className = "" }: SmartFilterProps) {
  const [filters, setFilters] = useState<FilterState>({
    rating: '',
    location: ''
  });
  const [ratingDropdownOpen, setRatingDropdownOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [ratingFocusIndex, setRatingFocusIndex] = useState(-1);
  const [locationFocusIndex, setLocationFocusIndex] = useState(-1);
  const ratingRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  const ratingOptions = [
    { value: '', label: 'כל הדירוגים' },
    { value: '4.5', label: '4.5 ומעלה' },
    { value: '4.0', label: '4.0 ומעלה' },
    { value: '3.5', label: '3.5 ומעלה' },
    { value: '3.0', label: '3.0 ומעלה' }
  ];

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
    
    // סגור את ה-dropdown אחרי בחירה
    if (key === 'rating') {
      setRatingDropdownOpen(false);
      setRatingFocusIndex(-1);
    }
    if (key === 'location') {
      setLocationDropdownOpen(false);
      setLocationFocusIndex(-1);
    }
  };

  const clearFilters = () => {
    const clearedFilters = { rating: '', location: '' };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = filters.rating !== '' || filters.location !== '';

  // סגור dropdowns כשלוחצים מחוץ להם
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ratingRef.current && !ratingRef.current.contains(event.target as Node)) {
        setRatingDropdownOpen(false);
        setRatingFocusIndex(-1);
      }
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setLocationDropdownOpen(false);
        setLocationFocusIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ניווט במקלדת
  const handleKeyDown = (event: React.KeyboardEvent, type: 'rating' | 'location') => {
    const isRating = type === 'rating';
    const options = isRating ? ratingOptions : [{ value: '', label: 'כל המיקומים' }, ...locations.map(loc => ({ value: loc, label: loc }))];
    const focusIndex = isRating ? ratingFocusIndex : locationFocusIndex;
    const setFocusIndex = isRating ? setRatingFocusIndex : setLocationFocusIndex;
    const isOpen = isRating ? ratingDropdownOpen : locationDropdownOpen;

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
          setLocationDropdownOpen(false);
          setLocationFocusIndex(-1);
        }
        break;
    }
  };

  const getRatingLabel = () => {
    if (!filters.rating) return 'דירוג';
    const option = ratingOptions.find(opt => opt.value === filters.rating);
    return option ? option.label : 'דירוג';
  };

  const getLocationLabel = () => {
    if (!filters.location) return 'מיקום';
    return filters.location;
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
              setLocationDropdownOpen(false);
              setLocationFocusIndex(-1);
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

        {/* Location Filter Button */}
        <div className="relative" ref={locationRef}>
          <Button
            variant="outline"
            onClick={() => {
              setLocationDropdownOpen(!locationDropdownOpen);
              setRatingDropdownOpen(false);
              setRatingFocusIndex(-1);
              if (!locationDropdownOpen) {
                setLocationFocusIndex(-1);
              }
            }}
            onKeyDown={(e) => handleKeyDown(e, 'location')}
            className={`flex items-center gap-2 px-4 py-2 border-2 transition-all duration-200 ${
              filters.location 
                ? 'border-blue-500 text-blue-600 bg-blue-50' 
                : 'border-gray-300 text-gray-700 hover:border-blue-300'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>{getLocationLabel()}</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
              locationDropdownOpen ? 'rotate-180' : ''
            }`} />
          </Button>

          {/* Location Dropdown */}
          {locationDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-[9999]">
              <button
                onClick={() => handleFilterChange('location', '')}
                onKeyDown={(e) => handleKeyDown(e, 'location')}
                onMouseEnter={() => setLocationFocusIndex(0)}
                className={`w-full text-right px-4 py-2 transition-all duration-150 ${
                  filters.location === '' 
                    ? 'bg-blue-50 text-blue-600 font-medium' 
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                } ${locationFocusIndex === 0 ? 'bg-blue-100' : ''} border-b border-gray-100`}
              >
                כל המיקומים
              </button>
              {locations.map((location, index) => (
                <button
                  key={location}
                  onClick={() => handleFilterChange('location', location)}
                  onKeyDown={(e) => handleKeyDown(e, 'location')}
                  onMouseEnter={() => setLocationFocusIndex(index + 1)}
                  className={`w-full text-right px-4 py-2 transition-all duration-150 ${
                    filters.location === location 
                      ? 'bg-blue-50 text-blue-600 font-medium' 
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  } ${locationFocusIndex === index + 1 ? 'bg-blue-100' : ''}`}
                >
                  {location}
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