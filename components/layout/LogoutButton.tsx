// components/layout/LogoutButton.tsx
'use client';
import { useRouter } from 'next/navigation';
import axios from '@/lib/axiosClient';
import { useState } from 'react';
import Button from '../ui/Button';

export default function LogoutButton() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.post('/auth/logout');
      localStorage.removeItem('token');
      router.push('/auth/login');
    } catch (err) {
      console.error('Logout failed', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      disabled={isLoading}
      variant="danger"
      className="hover:underline focus:outline-none"
    >
      {isLoading ? 'Logging out…' : 'Logout'}
    </Button>
  );
}
