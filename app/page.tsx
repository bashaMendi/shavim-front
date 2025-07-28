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
  const animationRef = useRef<number | undefined>(undefined);
  const lastTimestampRef = useRef<number | null>(null);

  // Duplicate lectures for infinite effect
  const infiniteLectures = lectures.length > 0 ? [...lectures, ...lectures] : [];

  useEffect(() => {
    console.log('Setting lectures, fakeLectures length:', fakeLectures.length);
    if (fakeLectures.length > 0) {
      // Use all lectures instead of just 6 selected ones
      setLectures(fakeLectures);
    }
  }, [fakeLectures]);

  // Smooth continuous auto-scroll מימין לשמאל
  useEffect(() => {
    if (!carouselRef.current || lectures.length === 0) {
      console.log('Carousel not ready:', { carouselRef: !!carouselRef.current, lecturesLength: lectures.length });
      return;
    }
    
    console.log('Starting carousel animation');
    
    let animationId: number;
    let lastTime = 0;
    const speed = 100; // פיקסלים לשנייה - מהירות גבוהה יותר
    let isPaused = false;
    
    function animate(currentTime: number) {
      if (!carouselRef.current) return;
      
      if (isPaused) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      
      if (lastTime === 0) {
        lastTime = currentTime;
      }
      
      const deltaTime = currentTime - lastTime;
      const scrollAmount = (speed * deltaTime) / 1000; // חישוב נכון יותר
      
      carouselRef.current.scrollLeft += scrollAmount;
      
      // בדיקה אם הגענו לסוף - עם margin
      const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
      if (carouselRef.current.scrollLeft >= maxScroll) {
        carouselRef.current.scrollLeft = 0;
      }
      
      // Debug - הדפס כל 60 פריימים (כל שנייה)
      if (Math.floor(currentTime / 1000) % 2 === 0 && Math.floor(currentTime / 16.67) % 60 === 0) {
        console.log('Animation running - scrollLeft:', carouselRef.current.scrollLeft);
      }
      
      lastTime = currentTime;
      animationId = requestAnimationFrame(animate);
    }
    
    // בדיקה שהאנימציה לא רצה כבר
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    // התחל את האנימציה מיד
    console.log('Starting animation with speed:', speed);
    console.log('Carousel dimensions:', {
      scrollWidth: carouselRef.current.scrollWidth,
      clientWidth: carouselRef.current.clientWidth,
      scrollLeft: carouselRef.current.scrollLeft
    });
    
    // וודא שהקרוסלה מוכנה לפני שמתחילים
    if (carouselRef.current.scrollWidth > carouselRef.current.clientWidth) {
      animationId = requestAnimationFrame(animate);
      animationRef.current = animationId;
    } else {
      console.log('Carousel not ready yet, waiting...');
    }
    
    // Pause on hover
    const carousel = carouselRef.current;
    const handleMouseEnter = () => { 
      console.log('Mouse enter - pausing');
      isPaused = true; 
    };
    const handleMouseLeave = () => { 
      console.log('Mouse leave - resuming');
      isPaused = false; 
      // לא מאפסים את ה-timer כדי שהמהירות תישאר קבועה
    };
    
    carousel?.addEventListener('mouseenter', handleMouseEnter);
    carousel?.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      carousel?.removeEventListener('mouseenter', handleMouseEnter);
      carousel?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [lectures]);

  // Manual navigation functions
  const handlePrev = () => {
    console.log('Prev button clicked');
    if (!carouselRef.current) {
      console.log('No carousel ref');
      return;
    }
    if (lectures.length === 0) {
      console.log('No lectures');
      return;
    }
    
    const carousel = carouselRef.current;
    const cardWidth = carousel.firstElementChild?.clientWidth || 320; // ברירת מחדל 320px
    const margin = 16; // mx-2 = 8px * 2
    const totalCardWidth = cardWidth + margin;
    
    console.log('Card width:', cardWidth, 'Total width:', totalCardWidth, 'Current scrollLeft:', carousel.scrollLeft);
    
    // זז אחורה - אם הגענו להתחלה, עבור לסוף
    const newScrollLeft = carousel.scrollLeft - (totalCardWidth * 2);
    if (newScrollLeft < 0) {
      carousel.scrollLeft = carousel.scrollWidth - carousel.clientWidth;
      console.log('Wrapped to end - new scrollLeft:', carousel.scrollLeft);
    } else {
      carousel.scrollLeft = newScrollLeft;
      console.log('Moved back - new scrollLeft:', carousel.scrollLeft);
    }
  };

  const handleNext = () => {
    console.log('Next button clicked');
    if (!carouselRef.current) {
      console.log('No carousel ref');
      return;
    }
    if (lectures.length === 0) {
      console.log('No lectures');
      return;
    }
    
    const carousel = carouselRef.current;
    const cardWidth = carousel.firstElementChild?.clientWidth || 320; // ברירת מחדל 320px
    const margin = 16; // mx-2 = 8px * 2
    const totalCardWidth = cardWidth + margin;
    
    console.log('Card width:', cardWidth, 'Total width:', totalCardWidth, 'Current scrollLeft:', carousel.scrollLeft);
    
    // זז קדימה - אם הגענו לסוף, עבור להתחלה
    const newScrollLeft = carousel.scrollLeft + (totalCardWidth * 2);
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    
    if (newScrollLeft > maxScroll) {
      carousel.scrollLeft = 0;
      console.log('Wrapped to start - new scrollLeft:', carousel.scrollLeft);
    } else {
      carousel.scrollLeft = newScrollLeft;
      console.log('Moved forward - new scrollLeft:', carousel.scrollLeft);
    }
  };

  return (
    <div className="space-y-10">
      {/* Banner Section */}
      <Banner />
      
      {/* Horizontal Carousel */}
      <section className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">ההרצאות שלנו</h2>
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
