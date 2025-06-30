import { Card } from '@/components/ui';

async function getLectures() {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/admin/lectures', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export default async function AdminLecturesPage() {
  let lectures = [];
  try {
    lectures = await getLectures();
  } catch {
    return <div className="text-red-600 font-bold text-center mt-8">שגיאה בטעינת ההרצאות</div>;
  }
  if (!lectures.length) return <div className="text-center mt-8 text-gray-500">לא נמצאו הרצאות</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">ניהול הרצאות</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lectures.map((lec: any) => (
          <Card key={lec.id}>
            <h2 className="font-semibold text-lg">{lec.title}</h2>
            <p className="text-sm text-gray-500">
              {lec.lecturerName} – {new Date(lec.date).toLocaleDateString('he-IL')}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
