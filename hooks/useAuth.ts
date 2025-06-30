"use client"
import { useState, useEffect } from 'react';
import { User } from '@/types/User';
import axiosClient from '@/lib/axiosClient';

interface AuthState {
  user: User | null;
  isLoading: boolean;
}

export function useAuth(): AuthState {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient
      .get<User>('/auth/me')
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  return { user, isLoading };
}
