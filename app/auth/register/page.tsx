'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login page with register mode
    router.push('/auth/login?mode=register');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">מעביר לדף ההרשמה...</p>
      </div>
    </div>
  );
}
