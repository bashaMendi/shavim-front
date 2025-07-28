'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface BannerItem {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  date?: string;
  type: 'video' | 'image';
}

// נתונים פייק זמניים - יוחלפו מהבאק
const bannerItems: BannerItem[] = [
  {
    id: 1,
    title: "סרטון הדגמה - איך שווים בהרצאה עובד",
    description: "צפו בסרטון הדגמה קצר שמסביר איך הפלטפורמה שלנו מחברת בין מרצים לקהל",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    type: 'video'
  },
  {
    id: 2,
    title: "שווים בהרצאה מגיעים ל-10,000 משתמשים!",
    description: "הפלטפורמה שלנו צומחת במהירות ומגיעה לקהל רחב יותר מאי פעם",
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    date: "2024-01-15",
    type: 'image'
  },
  {
    id: 3,
    title: "הרצאה חדשה: 'העתיד של הבינה המלאכותית'",
    description: "ד\"ר יוסי כהן מציג הרצאה מרתקת על התפתחויות חדשות בתחום ה-AI",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    date: "2024-01-12",
    type: 'image'
  },
  {
    id: 4,
    title: "שיתוף פעולה חדש עם אוניברסיטת תל אביב",
    description: "הרחבת שיתוף הפעולה עם מרצים מובילים מהאקדמיה",
    imageUrl: "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    date: "2024-01-10",
    type: 'image'
  },
  {
    id: 5,
    title: "פיצ'ר חדש: הזמנות קבוצתיות",
    description: "כעת ניתן להזמין הרצאות לקבוצות גדולות עם הנחות מיוחדות",
    imageUrl: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    date: "2024-01-08",
    type: 'image'
  }
];

interface BannerProps {
  items?: BannerItem[];
  autoPlay?: boolean;
  interval?: number;
}

export default function Banner({ 
  items = bannerItems, 
  autoPlay = true, 
  interval = 5000 
}: BannerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoSlide, setIsVideoSlide] = useState(false);
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set());

  // Preload all images and video
  useEffect(() => {
    const imageItems = items.filter(item => item.type === 'image' && item.imageUrl);
    const videoItems = items.filter(item => item.type === 'video' && item.videoUrl);
    
    // Preload images
    imageItems.forEach(item => {
      if (item.imageUrl && !preloadedImages.has(item.imageUrl)) {
        const img = new window.Image();
        img.onload = () => {
          setPreloadedImages(prev => new Set(prev).add(item.imageUrl!));
        };
        img.src = item.imageUrl;
      }
    });
    
    // Preload video metadata and images as videos
    videoItems.forEach(item => {
      if (item.videoUrl) {
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.src = item.videoUrl;
      }
    });
    
    // Preload images
    imageItems.forEach(item => {
      if (item.imageUrl && !preloadedImages.has(item.imageUrl)) {
        const img = new window.Image();
        img.onload = () => {
          setPreloadedImages(prev => new Set(prev).add(item.imageUrl!));
        };
        img.src = item.imageUrl;
      }
    });
  }, [items, preloadedImages]);

  useEffect(() => {
    if (!autoPlay) return;
    
    // אם השקופית הנוכחית היא סרטון, לא נעביר אוטומטית
    if (items[currentSlide].type === 'video') return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % items.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [items.length, autoPlay, interval, currentSlide]);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
    
    // אם עוברים לסרטון, נאפס אותו להתחלה
    if (items[index].type === 'video' && videoRef.current) {
      videoRef.current.currentTime = 0;
      setIsVideoSlide(true);
    } else {
      setIsVideoSlide(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const currentItem = items[currentSlide];

  return (
    <section className="relative w-full h-96 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl overflow-hidden shadow-2xl mb-10">
      {/* Container אחיד לכל השקופיות */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full">
          
          {/* Background Layer - אחיד לכל השקופיות */}
          <div className="absolute inset-0 transition-all duration-700 ease-in-out" style={{ minHeight: '100%', minWidth: '100%' }}>
            
            {/* Video Background */}
            {currentItem.type === 'video' && (
              <video 
                ref={videoRef}
                className="w-full h-full object-cover"
                controls
                playsInline
                autoPlay
                muted
                style={{ willChange: 'transform' }}
                onLoadedMetadata={() => setIsVideoSlide(true)}
                onEnded={() => {
                  // כשהסרטון נגמר, עוברים לשקופית הבאה
                  setCurrentSlide((prev) => (prev + 1) % items.length);
                }}
              >
                <source src={currentItem.videoUrl} type="video/mp4" />
                הדפדפן שלך לא תומך בסרטונים.
              </video>
            )}

            {/* Image Background */}
            {currentItem.type === 'image' && currentItem.imageUrl && (
              <img 
                src={currentItem.imageUrl}
                alt={currentItem.title}
                className="w-full h-full object-cover transition-all duration-700 ease-in-out"
                style={{
                  opacity: preloadedImages.has(currentItem.imageUrl!) ? 1 : 0.9,
                  transform: preloadedImages.has(currentItem.imageUrl!) ? 'scale(1)' : 'scale(1.02)',
                  willChange: 'transform, opacity'
                }}
              />
            )}
          </div>

          {/* Content Layer - אחיד לכל השקופיות */}
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            
            {/* Image Content */}
            {currentItem.type === 'image' && (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10"></div>
                <div className="text-white text-center p-8 max-w-3xl mx-auto relative z-20">
                  <h2 className="text-3xl font-bold mb-6 leading-tight" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                    {currentItem.title}
                  </h2>
                  <p className="text-xl mb-6 text-gray-100 leading-relaxed max-w-2xl mx-auto" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
                    {currentItem.description}
                  </p>
                  {currentItem.date && (
                    <div className="text-base text-gray-200 font-medium mb-6" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.6)' }}>
                      {formatDate(currentItem.date)}
                    </div>
                  )}
                  
                  {/* כפתור "צפה בסרטון" אם השקופית הבאה היא סרטון ולא השקופית האחרונה */}
                  {items[(currentSlide + 1) % items.length].type === 'video' && currentSlide !== items.length - 1 && (
                    <button 
                      onClick={() => handleSlideChange((currentSlide + 1) % items.length)}
                      className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:scale-105"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                      צפה בסרטון הבא
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
          
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex gap-3">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`עבור לשקופית ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => handleSlideChange((currentSlide - 1 + items.length) % items.length)}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 z-30 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors shadow-lg"
        aria-label="שקופית קודמת"
      >
        <span className="text-xl">&#8594;</span>
      </button>
      <button
        onClick={() => handleSlideChange((currentSlide + 1) % items.length)}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 z-30 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors shadow-lg"
        aria-label="שקופית הבאה"
      >
        <span className="text-xl">&#8592;</span>
      </button>
    </section>
  );
} 