'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { LectureMedia } from '@/features/lectures/types';

interface MediaGalleryProps {
  media: LectureMedia[];
  className?: string;
}

export default function MediaGallery({ media, className = '' }: MediaGalleryProps) {
  const [selectedMedia, setSelectedMedia] = useState<LectureMedia | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (mediaItem: LectureMedia, index: number) => {
    setSelectedMedia(mediaItem);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedMedia(null);
  };

  const nextMedia = () => {
    const nextIndex = (currentIndex + 1) % media.length;
    setSelectedMedia(media[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  const prevMedia = () => {
    const prevIndex = currentIndex === 0 ? media.length - 1 : currentIndex - 1;
    setSelectedMedia(media[prevIndex]);
    setCurrentIndex(prevIndex);
  };

  if (media.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-2xl font-bold text-gray-800 mb-4">מדיה וסרטונים</h3>
      
      {/* גלריית תמונות */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {media.map((item, index) => (
          <div
            key={item.id}
            className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => openModal(item, index)}
          >
            <div className="relative aspect-video">
              <Image
                src={item.type === 'video' ? (item.thumbnail || item.url) : item.url}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {item.type === 'video' && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="bg-white/90 rounded-full p-3">
                    <Play className="w-6 h-6 text-gray-800" fill="currentColor" />
                  </div>
                </div>
              )}
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <h4 className="text-white font-semibold text-sm">{item.title}</h4>
              {item.description && (
                <p className="text-white/80 text-xs mt-1">{item.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal להצגת מדיה */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full w-full">
            {/* כפתור סגירה */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* כפתורי ניווט */}
            {media.length > 1 && (
              <>
                <button
                  onClick={prevMedia}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={nextMedia}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </>
            )}

            {/* תוכן המדיה */}
            <div className="bg-white rounded-lg overflow-hidden">
              {selectedMedia.type === 'video' ? (
                <div className="aspect-video">
                  <iframe
                    src={selectedMedia.url.replace('watch?v=', 'embed/')}
                    title={selectedMedia.title}
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="relative aspect-video">
                  <Image
                    src={selectedMedia.url}
                    alt={selectedMedia.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  />
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {selectedMedia.title}
                </h3>
                {selectedMedia.description && (
                  <p className="text-gray-600">{selectedMedia.description}</p>
                )}
                <div className="mt-4 text-sm text-gray-500">
                  {currentIndex + 1} מתוך {media.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}