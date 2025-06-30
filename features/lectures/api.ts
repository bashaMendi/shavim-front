export type Lecture = {
  id: string;
  title: string;
  date: string;
  status: string;
};

export async function getLecturerLectures(): Promise<Lecture[]> {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + '/lecturer/lectures',
    {
      // אפשר להוסיף headers אם צריך auth
      cache: 'no-store', // תמיד יביא נתונים עדכניים
    }
  );
  if (!res.ok) throw new Error('Failed to fetch lectures');
  return res.json();
} 