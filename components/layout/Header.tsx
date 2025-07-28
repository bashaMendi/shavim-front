'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, User } from 'lucide-react';
import { useGlobalUI } from '@/lib/zustand';
import MobileNav from './MobileNav';
import DesktopNav from './DesktopNav';
import Button from '../ui/Button';

export default function Header() {
  const isOpen = useGlobalUI((s) => s.isSidebarOpen);
  const toggle = useGlobalUI((s) => s.toggleSidebar);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-white/30' 
        : 'bg-white/10 backdrop-blur-md shadow-lg border-b border-white/20'
    }`}>
      {/* חלק עליון: המבורגר + לוגו + ניווט Desktop + כפתור Login */}
      <div className="flex items-center justify-between max-w-screen-2xl mx-auto px-4 py-4">
        {/* לוגו + כפתור המבורגר */}
        <div className="flex items-center gap-4 rtl:gap-reverse">
          <Button
            className="md:hidden"
            onClick={toggle}
            aria-label={isOpen ? 'סגור תפריט' : 'פתח תפריט'}
            variant="icon"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
          <Link href="/" aria-label="מעבר לדף הבית">
            <div className="flex items-center gap-2">
              <div className="relative w-12 h-12 mr-3">
                <Image
                  src="/assets/logo-shavim.jpg"
                  alt="שווים בהרצאה לוגו"
                  fill
                  className="object-contain rounded-lg shadow-lg"
                  priority
                />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-br from-purple-600 via-blue-600 to-red-600 bg-clip-text text-transparent">
                שווים בהרצאה
              </h1>
            </div>
          </Link>
        </div>
        {/* ניווט דסקטופ */}
        <DesktopNav />
        {/* כפתור Login */}
        <div className="flex items-center" role="navigation" aria-label="כניסה">
          <Link href="/auth/login" tabIndex={0} aria-label="התחברות">
            <Button variant="primary" className="px-2 py-1 text-sm h-8 min-w-0 flex items-center gap-2 rtl:gap-reverse">
              <User size={16} />
              <span className="block md:hidden">התחברות</span>
              <span className="hidden md:block">התחברות / הרשמה</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* ניווט מובייל (drawer הופך fixed overlay) */}
      <MobileNav />
    </header>
  );
}
