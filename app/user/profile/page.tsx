'use client';
import { useAuth } from '@/hooks/useAuth';
import { Loader } from '@/components/common/Loader';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { Card } from '@/components/ui';

export default function UserProfilePage() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <Loader />;
  if (!user) return <ErrorMessage message="לא נמצאה גישה לפרטי המשתמש" />;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">הפרופיל שלי</h1>
      <Card className="space-y-2">
        <p>
          <strong>שם:</strong> {user.name}
        </p>
        <p>
          <strong>אימייל:</strong> {user.email}
        </p>
        <p>
          <strong>תפקיד:</strong> {user.role}
        </p>
      </Card>
    </div>
  );
}
