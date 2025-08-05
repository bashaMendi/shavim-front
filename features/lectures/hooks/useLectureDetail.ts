'use client';

import { useState, useEffect } from 'react';
import { LectureDetail } from '../types';
import { fakeLectureDetails } from '../data/fakeLectures';

export function useLectureDetail(lectureId: string) {
  const [data, setData] = useState<LectureDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    // סימולציה של קריאת API
    setTimeout(() => {
      const lecture = fakeLectureDetails.find(l => l.id === lectureId);
      
      if (lecture) {
        setData(lecture);
      } else {
        setError('ההרצאה לא נמצאה');
      }
      
      setLoading(false);
    }, 300);
  }, [lectureId]);

  return { data, loading, error };
}