// components/ui/Card.tsx
import React, { ReactNode } from 'react';

export interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return <div className={`bg-white rounded-lg shadow p-4 ${className}`}>{children}</div>;
}
