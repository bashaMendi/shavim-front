'use client';

import { useState, useEffect, useCallback } from 'react';
import { fakeLecturers } from '../data/fakeLecturers';

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
  // פייק דאטה
  const [data, setData] = useState<Lecturer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);

  // page size
  const PAGE_SIZE = 8;

  // חיפוש וסינון
  useEffect(() => {
    setLoading(true);
    setError(null);
    setPage(1);
    setTimeout(() => {
      let filtered = fakeLecturers;
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = fakeLecturers.filter(l =>
          l.name.toLowerCase().includes(term) ||
          (l.topic && l.topic.toLowerCase().includes(term))
        );
      }
      setHasNextPage(filtered.length > PAGE_SIZE);
      setData(filtered.slice(0, PAGE_SIZE));
      setLoading(false);
    }, 300);
  }, [searchTerm]);

  // טען עמוד נוסף
  const fetchNextPage = useCallback(() => {
    setIsFetchingNextPage(true);
    setTimeout(() => {
      let filtered = fakeLecturers;
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = fakeLecturers.filter(l =>
          l.name.toLowerCase().includes(term) ||
          (l.topic && l.topic.toLowerCase().includes(term))
        );
      }
      const nextPage = page + 1;
      const nextData = filtered.slice(0, nextPage * PAGE_SIZE);
      setData(nextData);
      setPage(nextPage);
      setHasNextPage(filtered.length > nextPage * PAGE_SIZE);
      setIsFetchingNextPage(false);
    }, 300);
  }, [searchTerm, page]);

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