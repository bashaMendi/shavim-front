'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { Card, Button, Rating } from '@/components/ui';
import Image from 'next/image';
import { fakeLecturers } from '@/features/lectures/data/fakeLecturers';
import { fakeLectures } from '@/features/lectures/data/fakeLectures';
import { Calendar, Clock, MapPin, ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { use, useState, useRef } from 'react';

interface LecturerPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function LecturerDetailPage({ params }: LecturerPageProps) {
  const { id } = use(params);
  const lecturer = fakeLecturers.find((l) => l.id === id);
  const [imageError, setImageError] = useState(false);
  if (!lecturer) notFound();

  // מצא את ההרצאות של המרצה
  const lecturerLectures = fakeLectures.filter((lecture) => 
    lecturer.lectures.includes(lecture.id)
  );

  // State for showing more lectures
  const [showAllLectures, setShowAllLectures] = useState(false);
  const initialLecturesCount = 4;
  const displayedLectures = showAllLectures ? lecturerLectures : lecturerLectures.slice(0, initialLecturesCount);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-red-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back Button */}
        <Link
          href="/catalog"
          className="inline-flex items-center text-gray-600 hover:text-purple-600 transition-colors duration-200 mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 ml-2 group-hover:-translate-x-1 transition-transform duration-200" />
          חזרה לקטלוג המרצים
        </Link>

        {/* Main Card - All Content */}
        <Card className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
          {/* Hero Section */}
          <div className="p-8 border-b border-gray-200/50">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
              {/* Lecturer Image */}
              <div className="relative w-48 h-48 lg:w-64 lg:h-64 flex-shrink-0">
                {!imageError ? (
                  <Image
                    src={lecturer.imageUrl}
                    alt={`תמונה של ${lecturer.name}`}
                    fill
                    className="rounded-full object-cover shadow-2xl border-4 border-white"
                    sizes="(max-width: 1024px) 192px, 256px"
                    priority={true}
                    onError={() => {
                      setImageError(true);
                    }}
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-6xl font-bold shadow-2xl border-4 border-white">
                    {lecturer.name.charAt(0)}
                  </div>
                )}
              </div>

              {/* Lecturer Details */}
              <div className="flex-1 text-center lg:text-right">
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-br from-purple-600 via-blue-600 to-red-600 bg-clip-text text-transparent mb-4">
                  {lecturer.name}
                </h1>
                
                <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                  <span className="px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 rounded-full font-semibold text-lg">
                    {lecturer.topic}
                  </span>
                  <Rating rating={lecturer.rating} size="lg" />
                </div>

                <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-gray-600 mb-8">
                  <div className="flex items-center">
                    <Calendar size={20} className="ml-2 text-blue-500" />
                    <span>זמין להרצאות</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={20} className="ml-2 text-green-500" />
                    <span>45-90 דקות</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={20} className="ml-2 text-red-500" />
                    <span>{lecturer.location}</span>
                  </div>
                </div>

                {/* Lecturer Bio */}
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-8">
                  <p className="text-lg leading-relaxed">
                    {lecturer.bio}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Lectures Section */}
          <div className="p-8">
            {lecturerLectures.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {displayedLectures.map((lecture) => (
                    <Link key={lecture.id} href={`/lectures/${lecture.id}`} passHref>
                      <div className="h-full p-4 group hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer bg-white/60 backdrop-blur-sm border border-white/20 rounded-xl">
                        <div className="relative w-full h-32 mb-3">
                          <Image
                            src={lecture.imageUrl}
                            alt={lecture.title}
                            fill
                            className="rounded-lg object-cover shadow-md group-hover:shadow-lg transition-shadow duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          />
                        </div>
                        <h3 className="font-semibold text-base mb-2 text-gray-800 group-hover:text-purple-600 transition-colors duration-200 line-clamp-2">
                          {lecture.title}
                        </h3>
                        <p className="text-xs text-gray-600 mb-2">משך: {lecture.duration}</p>
                        {lecture.rating && (
                          <Rating rating={lecture.rating} size="sm" />
                        )}
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Show More/Less Button */}
                {lecturerLectures.length > initialLecturesCount && (
                  <div className="text-center mt-8">
                    <Button
                      variant="outline"
                      onClick={() => setShowAllLectures(!showAllLectures)}
                      className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-6 py-2 rounded-full transition-all duration-300 flex items-center gap-2 mx-auto"
                    >
                      {showAllLectures ? (
                        <>
                          <ChevronUp className="w-4 h-4" />
                          הצג פחות הרצאות
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4" />
                          הצג עוד הרצאות ({lecturerLectures.length - initialLecturesCount} נוספות)
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
                  <p className="text-lg text-gray-600 mb-4">אין הרצאות זמינות כרגע</p>
                  <p className="text-gray-500">המרצה זמין להרצאות מותאמות אישית</p>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Contact Section - Outside the main card */}
        <div className="mt-8">
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-8 text-center shadow-xl border border-white/20">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">רוצה להזמין הרצאה?</h3>
            <p className="text-gray-700 mb-6">
              צור קשר איתנו ונעזור לך לארגן הרצאה מעוררת השראה עם {lecturer.name}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => {
                  // כאן יהיה הלוגיקה ליצירת קשר
                  console.log('יצירת קשר עבור', lecturer.name);
                }}
              >
                צור קשר עכשיו
              </Button>
              <Link href="/support/contact">
                <Button 
                  variant="outline"
                  className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-3 rounded-full transition-all duration-300"
                >
                  דף יצירת קשר
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}