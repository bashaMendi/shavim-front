import { Card } from '@/components/ui';

async function getLecturerStats() {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/lecturer/stats', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export default async function LecturerDashboardPage() {
  let data;
  try {
    data = await getLecturerStats();
  } catch {
    return <div className="text-red-600 font-bold text-center mt-8">שגיאה בטעינת הסטטיסטיקות</div>;
  }
  if (!data) return <div className="text-center mt-8 text-gray-500">לא נמצאו נתונים</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard להרצאה</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="flex flex-col items-center">
          <p className="text-sm text-gray-500">סך כל ההרצאות</p>
          <p className="text-2xl font-semibold">{data.totalLectures}</p>
        </Card>
        <Card className="flex flex-col items-center">
          <p className="text-sm text-gray-500">סך כל ההזמנות על ההרצאות שלך</p>
          <p className="text-2xl font-semibold">{data.totalBookings}</p>
        </Card>
      </div>
    </div>
  );
}
