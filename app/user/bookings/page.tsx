'use client';
import { useEffect, useState } from 'react';
import { Loader } from '@/components/common/Loader';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { Table } from '@/components/ui';

type Booking = {
  id: string;
  lectureTitle: string;
  date: string;
  status: string;
};

export default function UserBookingsPage() {
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
  if (!data?.length) return <div className="text-center mt-8 text-gray-500">לא נמצאו הזמנות</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">כל ההזמנות שלי</h1>
      <Table>
        <Table.Head>
          <tr>
            <Table.HeaderCell>הרצאה</Table.HeaderCell>
            <Table.HeaderCell>תאריך</Table.HeaderCell>
            <Table.HeaderCell>סטטוס</Table.HeaderCell>
          </tr>
        </Table.Head>
        <Table.Body>
          {data.map((b) => (
            <Table.Row key={b.id}>
              <Table.Cell>{b.lectureTitle}</Table.Cell>
              <Table.Cell>{new Date(b.date).toLocaleDateString('he-IL')}</Table.Cell>
              <Table.Cell>{b.status}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
