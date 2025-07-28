'use client';
import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { useLecturers, Lecturer } from '@/features/lectures/hooks/useLecturers';
import { Loader } from '@/components/common/Loader';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { Card, Button, GoogleStyleSearchBar, Rating, SmartFilter, FilterState } from '@/components/ui';
import Link from 'next/link';
import { MapPin } from 'lucide-react';

export default function CatalogPage() {
  const [search, setSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({ rating: '', location: '' });

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
  } = useLecturers(searchQuery);

  const allLecturers: Lecturer[] = Array.isArray(data) ? data : [];

  // יצירת רשימת מיקומים ייחודיים
  const uniqueLocations = useMemo(() => {
    const locations = allLecturers.map(lecturer => lecturer.location).filter(Boolean);
    return [...new Set(locations)];
  }, [allLecturers]);

  // סינון המרצים לפי חיפוש ומסננים
  const filteredLecturers = useMemo(() => {
    return allLecturers.filter(lecturer => {
      // סינון לפי חיפוש טקסט
      const matchesSearch = searchQuery === '' || 
        lecturer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lecturer.topic.toLowerCase().includes(searchQuery.toLowerCase());

      // סינון לפי דירוג
      const matchesRating = filters.rating === '' || 
        lecturer.rating >= parseFloat(filters.rating);

      // סינון לפי מיקום
      const matchesLocation = filters.location === '' || 
        lecturer.location === filters.location;

      return matchesSearch && matchesRating && matchesLocation;
    });
  }, [allLecturers, searchQuery, filters]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setSearch(newValue);
    },
    []
  );

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
  }, []);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  // אינפיניטי סקרול: טען עוד כשמגיעים לסוף
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

  // טיפול בשגיאות משופר
  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">מרצים</h1>
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
          מרצים
        </h1>
        
        <GoogleStyleSearchBar
          value={search}
          onChange={handleSearchChange}
          onSearch={handleSearch}
          placeholder="חפש מרצה לפי שם או תחום..."
          className="mb-8"
        />
      </div>

      {/* Smart Filter */}
      <div className="flex justify-center">
        <SmartFilter
          locations={uniqueLocations}
          onFilterChange={handleFilterChange}
          className="mb-6"
        />
      </div>

      {/* Loader רק לטעינה ראשונית */}
      {loading && <Loader />}

      {/* הצגת תוכן רק אם לא בטעינה */}
      {!loading && (
        <>
          {/* Grid של המרצים */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredLecturers.map((lecturer) => (
              <Link key={lecturer.id} href={`/catalog/${lecturer.id}`} style={{ textDecoration: 'none' }}>
                <Card className="hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center cursor-pointer h-full p-6 group hover:scale-105">
                  {lecturer.imageUrl && (
                    <div className="relative mb-4">
                      <img 
                        src={lecturer.imageUrl} 
                        alt={lecturer.name} 
                        className="w-24 h-24 rounded-full object-cover shadow-lg group-hover:shadow-xl transition-shadow duration-300" 
                      />
                    </div>
                  )}
                  <h2 className="font-semibold text-lg mb-2 text-gray-800">{lecturer.name}</h2>
                  <div className="flex items-center justify-center gap-4 text-sm text-gray-600 mb-3">
                    {lecturer.topic && (
                      <span>{lecturer.topic}</span>
                    )}
                    {lecturer.location && (
                      <div className="flex items-center gap-1 text-gray-500">
                        <MapPin className="w-3 h-3" />
                        <span>{lecturer.location}</span>
                      </div>
                    )}
                  </div>
                  {lecturer.rating && (
                    <Rating rating={lecturer.rating} size="md" />
                  )}
                </Card>
              </Link>
            ))}
          </div>

          {/* הודעה אם אין תוצאות */}
          {filteredLecturers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">לא נמצאו מרצים</p>
            </div>
          )}

          {/* כפתור "טען עוד" */}
          <div ref={loaderRef} className="text-center min-h-[40px]">
            {isFetchingNextPage && <Loader />}
          </div>
        </>
      )}
    </div>
  );
}
