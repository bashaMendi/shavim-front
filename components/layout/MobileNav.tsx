// components/layout/MobileNav.tsx
'use client';
import React, { useEffect, useRef } from 'react';
import { staticRoutes, adminRoutes, lecturerRoutes } from './routes';
import NavLink from './NavLink';
import { useAuth } from '@/hooks/useAuth';
import { useGlobalUI } from '@/lib/zustand';
import LogoutButton from './LogoutButton';
import Modal from '@/components/ui/Modal';
import Button from '../ui/Button';

export default function MobileNav() {
  const { user } = useAuth();
  const isOpen = useGlobalUI((s) => s.isSidebarOpen);
  const toggle = useGlobalUI((s) => s.toggleSidebar);
  const drawerRef = useRef<HTMLDivElement>(null);
  // אנימציה: נשתמש ב-state פנימי כדי לשלוט על transition
  const [visible, setVisible] = React.useState(false);
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setVisible(true), 10);
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  // סגירה בלחיצה מחוץ ל-drawer
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (isOpen && drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        toggle();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [isOpen, toggle]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex rtl:direction-rtl">
      {/* רקע שקוף בצד שמאל */}
      <div className="flex-1" />
      {/* Drawer צדדי עם אנימציה */}
      <div
        ref={drawerRef}
        className={`w-1/2 max-w-xs h-full bg-white shadow-lg p-4 rtl:border-l ltr:border-r fixed right-0 top-0 z-50 transition-transform duration-300 transform ${visible ? 'translate-x-0' : 'translate-x-full'} rtl:direction-rtl`}
        style={{ minWidth: 240 }}
      >
        <Button
          onClick={toggle}
          className="absolute top-4 left-4"
          aria-label="סגור תפריט"
          variant="icon"
        >
          <span aria-hidden="true">×</span>
        </Button>
        <nav className="flex flex-col items-end space-y-4 w-full mt-8 rtl:text-right">
          {staticRoutes.map((route) => (
            <NavLink key={route.path} href={route.path} onClick={toggle} className="transition-colors duration-200 hover:bg-blue-100 hover:text-blue-700 rounded px-3 py-2 w-full text-right" >
              {route.label}
            </NavLink>
          ))}

          {user?.role === 'admin' &&
            adminRoutes.map((route) => (
              <NavLink key={route.path} href={route.path} onClick={toggle} className="transition-colors duration-200 hover:bg-blue-100 hover:text-blue-700 rounded px-3 py-2 w-full text-right" >
                {route.label}
              </NavLink>
            ))}

          {user?.role === 'lecturer' &&
            lecturerRoutes.map((route) => (
              <NavLink key={route.path} href={route.path} onClick={toggle} className="transition-colors duration-200 hover:bg-blue-100 hover:text-blue-700 rounded px-3 py-2 w-full text-right" >
                {route.label}
              </NavLink>
            ))}

          {user ? (
            <LogoutButton />
          ) : (
            <NavLink href="/auth/login" onClick={toggle} className="transition-colors duration-200 hover:bg-blue-100 hover:text-blue-700 rounded px-3 py-2 w-full text-right" >
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </div>
  );
}
