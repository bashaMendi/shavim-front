// components/layout/NavLink.tsx
'use client';
import Link, { LinkProps } from 'next/link';
import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

interface NavLinkProps extends LinkProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

// קומפוננטה אחידה לניווט, עם focus:outline-none כדי שלא יהיה מסגרת כשנלחצים
export default function NavLink({ children, onClick, className = '', ...linkProps }: NavLinkProps) {
  const pathname = usePathname();
  // התאמה חלקית: אם ה-path של ה-link הוא תחילת ה-path הנוכחי (למשל /catalog יתפוס גם /catalog/123)
  const isActive = pathname === linkProps.href || (typeof linkProps.href === 'string' && pathname.startsWith(linkProps.href) && linkProps.href !== '/');
  return (
    <Link
      {...linkProps}
      className={`block md:inline-block px-3 py-1 rounded-full focus:outline-none transition-colors duration-200
        hover:bg-blue-100 hover:text-blue-700
        ${isActive ? 'bg-blue-100 text-blue-700 font-bold' : ''}
        ${className}`}
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </Link>
  );
}
