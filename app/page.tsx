'use client';
import { useState, useEffect, useRef } from 'react';
import { fakeLectures } from '@/features/lectures/data/fakeLectures';
import Card from '@/components/ui/Card';
import Link from 'next/link';
import Image from 'next/image';
import { LectureCardData } from '@/features/lectures/types';
import Banner from '@/components/ui/Banner';
import Testimonials from '@/components/ui/Testimonials';
import { Rating } from '@/components/ui';

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function Home() {
  const [lectures, setLectures] = useState<LectureCardData[]>(fakeLectures);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Duplicate lectures for infinite effect
  const infiniteLectures = lectures.length > 0 ? [...lectures, ...lectures] : [];

  useEffect(() => {
    if (fakeLectures.length > 0) {
      // Use all lectures instead of just 6 selected ones
      setLectures(fakeLectures);
    }
  }, [fakeLectures]);

  // Remove auto-scroll - only manual navigation with buttons
  useEffect(() => {
    if (!carouselRef.current || lectures.length === 0) {
      return;
    }
  }, [lectures]);

  // Manual navigation functions - smooth infinite scroll
  const handlePrev = () => {
    if (!carouselRef.current || lectures.length === 0) return;
    
    const carousel = carouselRef.current;
    const cardWidth = carousel.firstElementChild?.clientWidth || 320;
    const margin = 16; // mx-2 = 8px * 2
    const totalCardWidth = cardWidth + margin;
    
    // זז אחורה בדיוק כרטיס אחד
    const newScrollLeft = carousel.scrollLeft - totalCardWidth;
    
    // אם הגענו להתחלה, עבור לסוף בצורה חלקה
    if (newScrollLeft < 0) {
      // זז לסוף הקרוסלה
      carousel.scrollLeft = carousel.scrollWidth - carousel.clientWidth;
    } else {
      carousel.scrollLeft = newScrollLeft;
    }
  };

  const handleNext = () => {
    if (!carouselRef.current || lectures.length === 0) return;
    
    const carousel = carouselRef.current;
    const cardWidth = carousel.firstElementChild?.clientWidth || 320;
    const margin = 16; // mx-2 = 8px * 2
    const totalCardWidth = cardWidth + margin;
    
    // זז קדימה בדיוק כרטיס אחד
    const newScrollLeft = carousel.scrollLeft + totalCardWidth;
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    
    // אם הגענו לסוף, עבור להתחלה בצורה חלקה
    if (newScrollLeft > maxScroll) {
      carousel.scrollLeft = 0;
    } else {
      carousel.scrollLeft = newScrollLeft;
    }
  };

  return (
    <div className="space-y-10">
      {/* Banner Section */}
      <Banner />
      
      {/* Horizontal Carousel */}
      <section className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">ההרצאות שלנו</h2>
        <div className="relative">
          {/* Navigation Arrows - רק אם יש הרצאות */}
          {lectures.length > 0 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute top-1/2 right-4 -translate-y-1/2 z-50 bg-white hover:bg-gray-100 shadow-lg rounded-full p-3 transition-all duration-200 hover:scale-110 border border-gray-200"
                aria-label="הקודם"
              >
                <span className="text-2xl text-blue-600 font-bold">&#8594;</span>
              </button>
              <button
                onClick={handleNext}
                className="absolute top-1/2 left-4 -translate-y-1/2 z-50 bg-white hover:bg-gray-100 shadow-lg rounded-full p-3 transition-all duration-200 hover:scale-110 border border-gray-200"
                aria-label="הבא"
              >
                <span className="text-2xl text-blue-600 font-bold">&#8592;</span>
              </button>
            </>
          )}
          
          <div
            ref={carouselRef}
            className="flex overflow-x-auto no-scrollbar"
            style={{ 
              scrollBehavior: 'smooth',
              direction: 'ltr'
            }}
          >
            {infiniteLectures.map((lecture, idx) => (
              <Link
                key={lecture.id + '-' + idx}
                href={`/lectures/${lecture.id}`}
                className="group flex-shrink-0 w-80 mx-2 snap-center"
                tabIndex={0}
              >
                <Card className="flex flex-col items-center text-center cursor-pointer hover:shadow-xl transition-shadow h-full border border-blue-100 group-hover:border-blue-400">
                  <div className="relative w-full h-40 mb-3">
                    <Image
                      src={lecture.imageUrl}
                      alt={lecture.title}
                      fill
                      className="rounded-lg object-cover shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                  <h3 className="font-semibold text-lg mb-1 text-blue-900 group-hover:text-blue-700 transition-colors">{lecture.title}</h3>
                  <p className="text-sm text-gray-600 mb-1">מרצה: {lecture.lecturerName}</p>
                  <p className="text-xs text-gray-500">משך: {lecture.duration}</p>
                  {lecture.rating && (
                    <Rating rating={lecture.rating} size="sm" />
                  )}
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />
    </div>
  );
}
