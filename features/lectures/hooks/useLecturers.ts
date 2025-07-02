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
  // פייק דאטה
  const fakeLecturers: Lecturer[] = [
    { id: '1', name: 'ד"ר יוסי כהן', topic: 'פיזיקה', imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: '2', name: 'פרופ׳ מיכל לוי', topic: 'מתמטיקה', imageUrl: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { id: '3', name: 'ד"ר רון מזרחי', topic: 'כימיה', imageUrl: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { id: '4', name: 'ד"ר ענת ברק', topic: 'ביולוגיה', imageUrl: 'https://randomuser.me/api/portraits/women/4.jpg' },
    { id: '5', name: 'ד"ר דני לוי', topic: 'היסטוריה', imageUrl: 'https://randomuser.me/api/portraits/men/5.jpg' },
    { id: '6', name: 'ד"ר רותי כהן', topic: 'ספרות', imageUrl: 'https://randomuser.me/api/portraits/women/6.jpg' },
    { id: '7', name: 'ד"ר גדי פרידמן', topic: 'מדעי המחשב', imageUrl: 'https://randomuser.me/api/portraits/men/7.jpg' },
    { id: '8', name: 'ד"ר יעל רון', topic: 'גיאוגרפיה', imageUrl: 'https://randomuser.me/api/portraits/women/8.jpg' },
    { id: '9', name: 'ד"ר אורי בן-דוד', topic: 'פילוסופיה', imageUrl: 'https://randomuser.me/api/portraits/men/9.jpg' },
    { id: '10', name: 'ד"ר תמר שלו', topic: 'פסיכולוגיה', imageUrl: 'https://randomuser.me/api/portraits/women/10.jpg' },
    { id: '11', name: 'ד"ר רוני לוי', topic: 'סוציולוגיה', imageUrl: 'https://randomuser.me/api/portraits/men/11.jpg' },
    { id: '12', name: 'ד"ר מיכל בר', topic: 'אמנות', imageUrl: 'https://randomuser.me/api/portraits/women/12.jpg' },
    { id: '13', name: 'ד"ר יואב כהן', topic: 'כלכלה', imageUrl: 'https://randomuser.me/api/portraits/men/13.jpg' },
    { id: '14', name: 'ד"ר רות בן-צבי', topic: 'מדעי המדינה', imageUrl: 'https://randomuser.me/api/portraits/women/14.jpg' },
    { id: '15', name: 'ד"ר דן רוזן', topic: 'משפטים', imageUrl: 'https://randomuser.me/api/portraits/men/15.jpg' },
    { id: '16', name: 'ד"ר עדי לוי', topic: 'חינוך', imageUrl: 'https://randomuser.me/api/portraits/women/16.jpg' },
  ];

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