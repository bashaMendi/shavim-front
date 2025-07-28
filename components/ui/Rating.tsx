'use client';
import { Star } from 'lucide-react';

interface RatingProps {
  rating: number;
  showNumber?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Rating({ 
  rating, 
  showNumber = true, 
  size = 'md',
  className = "" 
}: RatingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* כוכב גרדיאנט */}
      <div className="relative">
        <Star 
          className={`${sizeClasses[size]} text-gray-300`} 
          fill="currentColor" 
        />
        <div className="absolute inset-0">
          <Star 
            className={`${sizeClasses[size]} text-transparent`} 
            fill="url(#starGradient)" 
          />
        </div>
      </div>
      
      {/* מספר הרייטינג */}
      {showNumber && (
        <span className={`font-semibold ${textSizes[size]} bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent`}>
          {rating.toFixed(1)}
        </span>
      )}

      {/* SVG Gradient Definition */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#fbbf24', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#d97706', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
} 