'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axiosClient from '@/lib/axiosClient';
import { isAxiosError } from 'axios';
import { Input, Button, Card } from '@/components/ui';
import { ErrorMessage } from '@/components/common/ErrorMessage';

interface NewLectureForm {
  title: string;
  date: string;
  description: string;
}

export default function NewLecturePage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<NewLectureForm>();
  const [isSubmitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: NewLectureForm) => {
    setSubmitting(true);
    try {
      await axiosClient.post('/lecturer/lectures', data);
      router.push('/lecturer/myLectures');
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        setApiError(error.response?.data?.message ?? 'שגיאה ביצירת הרצאה');
      } else {
        setApiError('שגיאה ביצירת הרצאה');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">צור הרצאה חדשה</h1>
      {apiError && <ErrorMessage message={apiError} />}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="כותרת"
          {...register('title', { required: 'נא למלא כותרת' })}
          error={errors.title?.message as string}
        />
        <Input
          label="תאריך ושעה"
          type="datetime-local"
          {...register('date', { required: 'נא למלא תאריך ושעה' })}
          error={errors.date?.message as string}
        />
        <Input
          label="תיאור"
          {...register('description', { required: 'נא למלא תיאור' })}
          error={errors.description?.message as string}
        />
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? 'יוצר...' : 'צור'}
        </Button>
      </form>
    </Card>
  );
}
