'use client';

import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { Card, Button, GoogleStyleSearchBar, Rating, LectureSmartFilter, LectureFilterState } from '@/components/ui';
import Link from 'next/link';
import Image from 'next/image';
import { LectureCardData } from '@/features/lectures/types';
import { Loader } from '@/components/common/Loader';
import { useLectures } from '@/features/lectures/hooks/useLectures';
import { ErrorMessage } from '@/components/common/ErrorMessage';

export default function LecturesPage() {
  const [search, setSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<LectureFilterState>({ rating: '', duration: '' });

  const handleSearch = (searchValue: string) => {
    setSearchQuery(searchValue);
  };

  const {
    data,
    loading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    page,
    setPage,
  } = useLectures(searchQuery);

  const allLectures = Array.isArray(data) ? data : [];

  // פונקציה לחילוץ דקות מהמחרוזת
  const extractDurationMinutes = (duration: string): number => {
    const match = duration.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  // סינון ההרצאות לפי חיפוש ומסננים
  const filteredLectures = useMemo(() => {
    return allLectures.filter(lecture => {
      // סינון לפי חיפוש טקסט
      const matchesSearch = searchQuery === '' || 
        lecture.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lecture.lecturerName.toLowerCase().includes(searchQuery.toLowerCase());

      // סינון לפי דירוג
      const matchesRating = filters.rating === '' || 
        lecture.rating >= parseFloat(filters.rating);

      // סינון לפי זמן
      const matchesDuration = filters.duration === '' || 
        extractDurationMinutes(lecture.duration) <= parseFloat(filters.duration);

      return matchesSearch && matchesRating && matchesDuration;
    });
  }, [allLectures, searchQuery, filters, extractDurationMinutes]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  const handleFilterChange = useCallback((newFilters: LectureFilterState) => {
    setFilters(newFilters);
  }, []);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    const handleScroll = () => {
      if (!loaderRef.current) return;
      const rect = loaderRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight + 100) {
        fetchNextPage();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // טיפול בשגיאות
  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-center mb-8">ההרצאות שלנו</h1>
        <div className="text-center space-y-4">
          <ErrorMessage message={error} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-br from-purple-600 via-blue-600 to-red-600 bg-clip-text text-transparent mb-8">
          ההרצאות שלנו
        </h1>
        
        <GoogleStyleSearchBar
          value={search}
          onChange={handleSearchChange}
          onSearch={handleSearch}
          placeholder="חפש הרצאה או מרצה..."
          className="mb-8"
        />
      </div>

      {/* Smart Filter */}
      <div className="flex justify-center">
        <LectureSmartFilter
          onFilterChange={handleFilterChange}
          className="mb-6"
        />
      </div>

      {/* Loader רק לטעינה ראשונית */}
      {loading && <Loader />}

      {/* הצגת תוכן רק אם לא בטעינה */}
      {!loading && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredLectures.map((lecture) => (
              <Link key={lecture.id} href={`/lectures/${lecture.id}`} passHref>
                <Card className="flex flex-col items-center text-center cursor-pointer hover:shadow-xl transition-all duration-300 h-full p-6 group hover:scale-105">
                  <div className="relative w-full h-40 mb-4">
                    <Image
                      src={lecture.imageUrl}
                      alt={lecture.title}
                      fill
                      className="rounded-lg object-cover shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={false}
                    />
                  </div>
                  <h2 className="font-semibold text-lg mb-2 text-gray-800">{lecture.title}</h2>
                  <p className="text-sm text-gray-600 mb-1">מרצה: {lecture.lecturerName}</p>
                  <p className="text-xs text-gray-500 mb-3">משך: {lecture.duration}</p>
                  {lecture.rating && (
                    <Rating rating={lecture.rating} size="md" />
                  )}
                </Card>
              </Link>
            ))}
          </div>
          {/* הודעה אם אין תוצאות */}
          {filteredLectures.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">לא נמצאו הרצאות</p>
            </div>
          )}
          {/* Loader של אינפיניטי סקרול */}
          <div ref={loaderRef} className="text-center min-h-[40px]">
            {isFetchingNextPage && <Loader />}
          </div>
        </>
      )}
    </div>
  );
} 