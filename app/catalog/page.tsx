'use client';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { useLecturers, Lecturer } from '@/features/lectures/hooks/useLecturers';
import { Loader } from '@/components/common/Loader';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { Card, Button } from '@/components/ui';
import SearchBar from '@/components/ui/SearchBar';

export default function CatalogPage() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce: עדכן את debouncedSearch רק אחרי 400ms מהקלדה אחרונה
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(handler);
  }, [search]);

  const {
    data,
    loading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    page,
    setPage,
  } = useLecturers(debouncedSearch);

  // שימוש ב-useMemo כדי למנוע חישוב מחדש מיותר
  // const allLecturers: Lecturer[] = useMemo(() => {
  //   return data ? data.pages.flatMap((page) => page.lecturers) : [];
  // }, [data]);
  const allLecturers: Lecturer[] = Array.isArray(data) ? data : [];

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setSearch(newValue);
    },
    []
  );

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

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
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">מרצים</h1>

      <SearchBar
        value={search}
        onChange={handleSearchChange}
        placeholder="חפש מרצה..."
        className="max-w-md"
      />

      {/* Loader רק לטעינה ראשונית */}
      {loading && <Loader />}

      {/* הצגת תוכן רק אם לא בטעינה */}
      {!loading && (
        <>
          {/* Grid של המרצים */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.isArray(allLecturers) && allLecturers.map((lecturer) => (
              <Card key={lecturer.id} className="hover:shadow-lg transition-shadow">
                <h2 className="font-semibold">{lecturer.name}</h2>
                {lecturer.topic && (
                  <p className="text-sm text-gray-500 mt-1">{lecturer.topic}</p>
                )}
                <a
                  href={`/catalog/${lecturer.id}`}
                  className="mt-2 inline-block text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                  aria-label={`צפה בפרטים של ${lecturer.name}`}
                >
                  פרטים נוספים
                </a>
              </Card>
            ))}
          </div>

          {/* הודעה אם אין תוצאות */}
          {allLecturers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">לא נמצאו מרצים</p>
            </div>
          )}

          {/* כפתור "טען עוד" */}
          <div className="text-center">
            {hasNextPage && (
              <Button 
                variant="primary" 
                onClick={handleLoadMore}
                disabled={isFetchingNextPage}
                className="relative"
              >
                {isFetchingNextPage ? 'טוען...' : 'טען עוד'}
              </Button>
            )}
            {isFetchingNextPage && (
              <div className="mt-2">
                <Loader />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
