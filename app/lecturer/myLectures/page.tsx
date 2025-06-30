import { Card } from '@/components/ui';
import { getLecturerLectures } from '@/features/lectures/api';

export default async function MyLecturesPage() {
  let lectures = [];
  try {
    lectures = await getLecturerLectures();
  } catch (e) {
    return (
      <div className="text-red-600 font-bold text-center mt-8">
        שגיאה בטעינת ההרצאות שלי
      </div>
    );
  }

  if (!lectures.length) {
    return (
      <div className="text-center mt-8 text-gray-500">לא נמצאו הרצאות</div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">ההרצאות שלי</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lectures.map((lec) => (
          <Card key={lec.id} className="flex flex-col justify-between">
            <div>
              <h2 className="font-semibold text-lg">{lec.title}</h2>
              <p className="text-sm text-gray-500">
                {new Date(lec.date).toLocaleDateString('he-IL')}
              </p>
            </div>
            <p className="mt-2 text-xs text-gray-600">סטטוס: {lec.status}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}