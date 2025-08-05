'use client';

import { Card, Rating } from '@/components/ui';
import Link from 'next/link';
import Image from 'next/image';
import { LectureCardData } from '@/features/lectures/types';

interface SimilarLecturesProps {
  lectures: LectureCardData[];
  currentLectureId: string;
  className?: string;
}

export default function SimilarLectures({ lectures, currentLectureId, className = '' }: SimilarLecturesProps) {
  // מסנן את ההרצאה הנוכחית מהרשימה
  const filteredLectures = lectures.filter(lecture => lecture.id !== currentLectureId);
  
  if (filteredLectures.length === 0) {
    return null;
  }

  // מציג רק 4 הרצאות דומות
  const similarLectures = filteredLectures.slice(0, 4);

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-2xl font-bold text-gray-800 mb-4">הרצאות דומות</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {similarLectures.map((lecture) => (
          <Link key={lecture.id} href={`/lectures/${lecture.id}`}>
            <Card className="group hover:shadow-xl transition-all duration-300 h-full cursor-pointer hover:scale-105">
              <div className="relative w-full h-32 mb-3">
                <Image
                  src={lecture.imageUrl}
                  alt={lecture.title}
                  fill
                  className="rounded-t-lg object-cover group-hover:brightness-110 transition-all duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              
              <div className="p-3">
                <h4 className="font-semibold text-sm text-gray-800 mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {lecture.title}
                </h4>
                
                <p className="text-xs text-gray-600 mb-2">
                  מרצה: {lecture.lecturerName}
                </p>
                
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">
                    {lecture.duration}
                  </p>
                  {lecture.rating && (
                    <Rating rating={lecture.rating} size="sm" />
                  )}
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}