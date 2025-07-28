'use client';

import { useState, useEffect, useCallback } from 'react';
import { LectureCardData } from '../types';
import { fakeLectures } from '../data/fakeLectures';

const PAGE_SIZE = 8;

export function useLectures(searchTerm: string) {
  const [data, setData] = useState<LectureCardData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setPage(1);
    setTimeout(() => {
      let filtered = fakeLectures;
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = fakeLectures.filter(l =>
          l.title.toLowerCase().includes(term) ||
          l.lecturerName.toLowerCase().includes(term)
        );
      }
      setHasNextPage(filtered.length > PAGE_SIZE);
      setData(filtered.slice(0, PAGE_SIZE));
      setLoading(false);
    }, 300);
  }, [searchTerm]);

  const fetchNextPage = useCallback(() => {
    setIsFetchingNextPage(true);
    setTimeout(() => {
      let filtered = fakeLectures;
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = fakeLectures.filter(l =>
          l.title.toLowerCase().includes(term) ||
          l.lecturerName.toLowerCase().includes(term)
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