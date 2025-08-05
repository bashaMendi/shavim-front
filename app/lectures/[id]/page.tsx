'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, Button, Rating, MediaGallery, ExternalLinks, SimilarLectures } from '@/components/ui';
import { fakeLectures } from '@/features/lectures/data/fakeLectures';
import { useLectureDetail } from '@/features/lectures/hooks/useLectureDetail';
import { Loader } from '@/components/common/Loader';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { fakeLecturers } from '@/features/lectures/data/fakeLecturers';
import { Calendar, Clock, MapPin, Users, Tag, CreditCard, Video, Globe } from 'lucide-react';
import Link from 'next/link';

interface LecturePageProps {
  params: Promise<{ id: string }>;
}

export default function LectureDetailPage({ params }: LecturePageProps) {
  const { id } = use(params);
  const { data: lecture, loading, error } = useLectureDetail(id);
  
  // מציאת המרצה
  const lecturer = lecture ? fakeLecturers.find(l => l.id === lecture.lecturerId) : null;
  
  // מציאת הרצאות דומות של אותו מרצה
  const similarLectures = lecturer 
    ? fakeLectures.filter(l => lecturer.lectures.includes(l.id))
    : [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error || !lecture) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4">
          <ErrorMessage message={error || 'ההרצאה לא נמצאה'} />
          <Link href="/lectures">
            <Button variant="primary">חזרה לכל ההרצאות</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* תמונת כותרת - רוחב מלא */}
      <div className="relative w-full h-96 md:h-[500px]">
        <Image
          src={lecture.imageUrl}
          alt={lecture.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="container mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {lecture.title}
            </h1>
            <div className="flex items-center gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{lecture.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                <span>₪{lecture.price}</span>
              </div>
              {lecture.rating && (
                <Rating rating={lecture.rating} size="md" />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* תוכן ראשי */}
          <div className="lg:col-span-2 space-y-8">
            {/* פרטי המרצה */}
            {lecturer && (
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={lecturer.imageUrl}
                      alt={lecturer.name}
                      fill
                      className="rounded-full object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {lecturer.name}
                    </h2>
                    <p className="text-gray-600 mb-2">{lecturer.topic}</p>
                    {lecturer.rating && (
                      <div className="flex items-center gap-2 mb-3">
                        <Rating rating={lecturer.rating} size="sm" />
                        <span className="text-sm text-gray-600">({lecturer.rating})</span>
                      </div>
                    )}
                    <p className="text-gray-700 leading-relaxed">{lecturer.bio}</p>
                  </div>
                </div>
              </Card>
            )}

            {/* תיאור ההרצאה */}
            <Card className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">תיאור ההרצאה</h3>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {lecture.description}
                </p>
              </div>
            </Card>

            {/* מדיה וסרטונים */}
            <MediaGallery media={lecture.media} />

            {/* קישורים חיצוניים */}
            <ExternalLinks links={lecture.externalLinks} />

            {/* הרצאות דומות */}
            <SimilarLectures 
              lectures={similarLectures} 
              currentLectureId={lecture.id} 
            />
          </div>

          {/* סיידבר - פרטי הזמנה */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-800 mb-4">פרטי ההרצאה</h3>
              
              <div className="space-y-4">
                {/* מחיר */}
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="font-semibold text-gray-800">מחיר</span>
                  <span className="text-2xl font-bold text-blue-600">₪{lecture.price}</span>
                </div>

                {/* פרטי ההרצאה */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">תאריך</p>
                      <p className="font-medium">{lecture.date || 'לפי תיאום'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">משך</p>
                      <p className="font-medium">{lecture.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {lecture.isOnline ? (
                      <Video className="w-5 h-5 text-gray-500" />
                    ) : (
                      <MapPin className="w-5 h-5 text-gray-500" />
                    )}
                    <div>
                      <p className="text-sm text-gray-600">מיקום</p>
                      <p className="font-medium">
                        {lecture.isOnline ? 'אונליין' : lecture.location}
                      </p>
                    </div>
                  </div>

                  {lecture.maxAttendees && (
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">מספר משתתפים מקסימלי</p>
                        <p className="font-medium">{lecture.maxAttendees}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* תגיות */}
                {lecture.tags.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">תגיות</p>
                    <div className="flex flex-wrap gap-2">
                      {lecture.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* כפתור הזמנה */}
                <Button 
                  variant="primary" 
                  className="w-full py-3 text-lg font-semibold"
                  onClick={() => {
                    // כאן יהיה הלוגיקה להזמנת ההרצאה
                    alert('פונקציונליות הזמנה תתווסף בקרוב!');
                  }}
                >
                  הזמן הרצאה
                </Button>

                {/* כפתור חזרה */}
                <Link href="/lectures">
                  <Button 
                    variant="outline" 
                    className="w-full"
                  >
                    חזרה לכל ההרצאות
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 