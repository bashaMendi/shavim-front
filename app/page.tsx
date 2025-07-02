'use client';
import Image from 'next/image';
import { useState } from 'react';

const carouselImages = [
  'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1465101178521-c3a6088ed0c4?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1510936111840-6cef99faf2a9?auto=format&fit=crop&w=800&q=80',
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent((c) => (c + 1) % carouselImages.length);
  const prev = () => setCurrent((c) => (c - 1 + carouselImages.length) % carouselImages.length);

  return (
    <div className="space-y-10">
      {/* Hero section */}
      <section className="flex flex-col md:flex-row items-center justify-between bg-white/70 rounded-xl shadow p-6 mt-8 max-w-4xl mx-auto">
        {/* Text */}
        <div className="flex-1 md:pr-8 text-right">
          <h1 className="text-4xl font-bold mb-4 text-blue-800">שווים בהרצאה</h1>
          <p className="text-lg text-gray-700 mb-2">
            פלטפורמה המחברת בין מרצים איכותיים לקהל מגוון, עם חוויית הזמנה, ניהול ותמיכה קלה ונגישה.
          </p>
          <p className="text-md text-gray-500">
            מצאו את המרצה המושלם, הזמינו הרצאה, ותיהנו מתוכן מעשיר ומעורר השראה.
          </p>
        </div>
        {/* Image */}
        <div className="flex-1 flex justify-center md:justify-end mt-6 md:mt-0">
          <Image src="https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=600&q=80" alt="הרצאה" width={320} height={220} className="rounded-lg shadow-lg object-cover" />
        </div>
      </section>

      {/* Carousel */}
      <section className="max-w-3xl mx-auto">
        <div className="relative overflow-hidden rounded-xl shadow-lg bg-white/80">
          <div className="flex transition-transform duration-700" style={{ transform: `translateX(-${current * 100}%)` }}>
            {carouselImages.map((src, idx) => (
              <div key={src} className="min-w-full h-64 flex items-center justify-center bg-gradient-to-tr from-blue-100 to-blue-50">
                <Image src={src} alt={"תמונה " + (idx + 1)} width={600} height={256} className="object-cover rounded-xl h-full w-full" />
              </div>
            ))}
          </div>
          {/* Controls */}
          <button onClick={prev} className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/70 hover:bg-white shadow rounded-full p-2 z-10" aria-label="הקודם">
            <span className="text-2xl">&#8592;</span>
          </button>
          <button onClick={next} className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/70 hover:bg-white shadow rounded-full p-2 z-10" aria-label="הבא">
            <span className="text-2xl">&#8594;</span>
          </button>
          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {carouselImages.map((_, idx) => (
              <button
                key={idx}
                className={`w-3 h-3 rounded-full border border-blue-400 ${current === idx ? 'bg-blue-500' : 'bg-white'}`}
                onClick={() => setCurrent(idx)}
                aria-label={`מעבר לתמונה ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
