// components/layout/DesktopNav.tsx
'use client';
import React from 'react';
import { staticRoutes, adminRoutes, lecturerRoutes } from './routes';
import NavLink from './NavLink';
import { useAuth } from '@/hooks/useAuth';

export default function DesktopNav() {
  const { user } = useAuth();

  return (
    <nav className="hidden md:flex items-center gap-6 rtl:gap-reverse focus:outline-none" role="navigation" aria-label="ניווט ראשי">
      {staticRoutes.slice(0, 2).map((route) => (
        <NavLink key={route.path} href={route.path}>
          {route.label}
        </NavLink>
      ))}
      <NavLink href="/lectures">ההרצאות שלנו</NavLink>
      {staticRoutes.slice(2).map((route) => (
        <NavLink key={route.path} href={route.path}>
          {route.label}
        </NavLink>
      ))}

      {user?.role === 'admin' &&
        adminRoutes.map((route) => (
          <NavLink key={route.path} href={route.path}>
            {route.label}
          </NavLink>
        ))}

      {user?.role === 'lecturer' &&
        lecturerRoutes.map((route) => (
          <NavLink key={route.path} href={route.path}>
            {route.label}
          </NavLink>
        ))}
    </nav>
  );
}
