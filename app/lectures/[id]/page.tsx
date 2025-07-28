import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card } from '@/components/ui';
import { LectureCardData } from '@/features/lectures/types';
import Link from 'next/link';
import { fakeLectures } from '@/features/lectures/data/fakeLectures';

interface LecturePageProps {
  params: { id: string };
}

export default function LectureDetailPage({ params }: LecturePageProps) {
  const lecture = fakeLectures.find((l) => l.id === params.id);
  if (!lecture) notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto space-y-6">
        <div className="relative w-full h-64">
          <Image
            src={lecture.imageUrl}
            alt={lecture.title}
            fill
            className="rounded-lg object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        </div>
        <h1 className="text-3xl font-bold mt-4">{lecture.title}</h1>
        <p className="text-lg text-gray-600">מרצה: {lecture.lecturerName}</p>
        <p className="text-md text-gray-500">משך ההרצאה: {lecture.duration}</p>
        <div className="pt-4 border-t">
          <Link
            href="/lectures"
            className="inline-flex items-center text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
          >
            ← חזרה לכל ההרצאות
          </Link>
        </div>
      </Card>
    </div>
  );
} 