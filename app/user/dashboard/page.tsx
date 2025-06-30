'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Loader } from '@/components/common/Loader';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { Card, Button } from '@/components/ui';

type Booking = {
  id: string;
  lectureTitle: string;
  date: string;
  status: string;
};

export default function UserDashboardPage() {
  const [data, setData] = useState<Booking[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch('/api/user/bookings')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(setData)
      .catch(() => setError('שגיאה בטעינת ההזמנות'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">הדשבורד שלי</h1>
      <Card className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">סך כל ההזמנות</p>
          <p className="text-2xl font-semibold">{data ? data.length : 0}</p>
        </div>
        <Link href="/user/bookings" passHref>
          <Button variant="primary">הצג את כל ההזמנות</Button>
        </Link>
      </Card>
    </div>
  );
}
