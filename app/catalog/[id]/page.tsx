import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import axiosClient from '@/lib/axiosClient';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { Card } from '@/components/ui';
import Image from 'next/image';

interface LecturerDetail {
  id: string;
  name: string;
  imageUrl?: string;
  topic?: string;
  bio?: string;
}

interface LecturerPageProps {
  params: {
    id: string;
  };
}

// פונקציה נפרדת לטעינת המרצה
async function fetchLecturer(id: string): Promise<LecturerDetail | null> {
  try {
    const res = await axiosClient.get(`/lecturers/${id}`);
    return res.data as LecturerDetail;
  } catch (error: unknown) {
    // אם זה 404, נחזיר null
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { status?: number } };
      if (axiosError.response?.status === 404) {
        return null;
      }
    }
    // אחרת נזרוק את השגיאה
    throw error;
  }
}

export async function generateMetadata({
  params,
}: LecturerPageProps): Promise<Metadata> {
  try {
    const lecturer = await fetchLecturer(params.id);
    
    if (!lecturer) {
      return {
        title: 'מרצה לא נמצא',
      };
    }

    return {
      title: `מרצה: ${lecturer.name}`,
      description: lecturer.topic || lecturer.bio?.substring(0, 160),
    };
  } catch {
    return {
      title: 'פרטי מרצה',
    };
  }
}

export default async function LecturerDetailPage({ params }: LecturerPageProps) {
  try {
    const lecturer = await fetchLecturer(params.id);
    
    if (!lecturer) {
      notFound(); // Next.js built-in 404 handling
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto space-y-6">
          <header>
            <h1 className="text-3xl font-bold">{lecturer.name}</h1>
            {lecturer.topic && (
              <p className="text-lg text-gray-600 mt-2">{lecturer.topic}</p>
            )}
          </header>

          {lecturer.imageUrl && (
            <div className="relative">
              <Image
                src={lecturer.imageUrl}
                alt={`תמונה של ${lecturer.name}`}
                fill
                className="rounded-lg object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={false}
              />
            </div>
          )}

          {lecturer.bio && (
            <section>
              <h2 className="text-xl font-semibold mb-3">אודות</h2>
              <p className="whitespace-pre-line leading-relaxed text-gray-700">
                {lecturer.bio}
              </p>
            </section>
          )}

          {/* ניתן להוסיף כאן פרטים נוספים */}
          <div className="pt-4 border-t">
            <Link
              href="/catalog"
              className="inline-flex items-center text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
            >
              ← חזרה לקטלוג
            </Link>
          </div>
        </Card>
      </div>
    );
  } catch (error: unknown) {
    console.error('Error fetching lecturer:', error);
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4">
          <ErrorMessage message="שגיאה בטעינת פרטי המרצה" />
          <Link
            href="/catalog"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            חזרה לקטלוג
          </Link>
        </div>
      </div>
    );
  }
}