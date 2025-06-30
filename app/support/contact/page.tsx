'use client';
import { useForm } from 'react-hook-form';
import axios from '@/lib/axiosClient';
import { useState } from 'react';
import { Input, Button, Card } from '@/components/ui';
import { ErrorMessage } from '@/components/common/ErrorMessage';

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>();

  const [isSubmitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = async (data: ContactForm) => {
    setSubmitting(true);
    setApiError(null);
    setSuccessMessage(null);

    try {
      await axios.post('/contact', data);
      setSuccessMessage('הודעתך נשלחה בהצלחה!');
      reset();
    } catch {
      setApiError('שגיאה בשליחת ההודעה. נסה שוב מאוחר יותר.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="max-w-lg mx-auto space-y-4">
      <h1 className="text-2xl font-bold mb-2">צור קשר</h1>

      {apiError && <ErrorMessage message={apiError} />}
      {successMessage && (
        <div className="text-green-600 py-2">{successMessage}</div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="שם"
          {...register('name', { required: 'נא למלא שם' })}
          error={errors.name?.message as string}
        />
        <Input
          label="אימייל"
          type="email"
          {...register('email', {
            required: 'נא למלא אימייל',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'אימייל לא חוקי',
            },
          })}
          error={errors.email?.message as string}
        />
        <Input
          label="הודעה"
          {...register('message', { required: 'נא למלא הודעה' })}
          error={errors.message?.message as string}
        />

        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? 'שולח...' : 'שלח הודעה'}
        </Button>
      </form>
    </Card>
  );
}
