import { useState, useEffect, useCallback } from 'react';

export interface Lecturer {
  id: string;
  name: string;
  imageUrl?: string;
  topic?: string;
}

export interface LecturersResponse {
  lecturers: Lecturer[];
  currentPage: number;
  totalPages: number;
  totalCount?: number;
}

export function useLecturers(searchTerm: string) {
  const [data, setData] = useState<Lecturer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);

  const fetchLecturers = useCallback(async (pageToFetch: number, append = false) => {
    if (append) setIsFetchingNextPage(true);
    else setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/lecturers?q=${encodeURIComponent(searchTerm)}&page=${pageToFetch}&limit=12`);
      if (!res.ok) throw new Error('Failed to fetch');
      const json: LecturersResponse = await res.json();
      setHasNextPage(json.currentPage < json.totalPages);
      if (append) {
        setData((prev) => [...prev, ...json.lecturers]);
      } else {
        setData(json.lecturers);
      }
    } catch (e) {
      setError('שגיאה בטעינת המרצים');
      if (!append) setData([]);
    } finally {
      if (append) setIsFetchingNextPage(false);
      else setLoading(false);
    }
  }, [searchTerm]);

  // טען מחדש כשחיפוש משתנה
  useEffect(() => {
    setPage(1);
    fetchLecturers(1, false);
  }, [searchTerm, fetchLecturers]);

  // טען עמוד נוסף
  const fetchNextPage = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchLecturers(nextPage, true);
    }
  }, [hasNextPage, isFetchingNextPage, page, fetchLecturers]);

  return {
    data,
    loading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    page,
    setPage,
  };
} 