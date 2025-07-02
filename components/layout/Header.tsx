// 'use client';
// import Link from 'next/link';
// import { Menu, X } from 'lucide-react';
// import { useAuth } from '@/hooks/useAuth';
// import { useGlobalUI } from '@/lib/zustand';

// export default function Header() {
//   const { user } = useAuth();
//   const isOpen = useGlobalUI(s => s.isSidebarOpen);
//   const toggle = useGlobalUI(s => s.toggleSidebar);

//   return (
//     <header className="bg-white shadow">
//       <div className="flex items-center justify-between px-4 py-4 max-w-screen-2xl mx-auto">
//         <div className="flex items-center gap-3">
//           <button
//             className="md:hidden"
//             onClick={toggle}
//             aria-label={isOpen ? 'Close menu' : 'Open menu'}
//           >
//             {isOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//           <nav className="md:flex   justify-right">
//             {user ? (
//               <Link href={`/${user.role}/dashboard`}>Dashboard</Link>
//             ) : (
//               <Link href="/auth/login">Login</Link>
//             )}
//           </nav>
//         </div>
//         <Link href="/">
//           <h1 className="text-xl font-bold">שווים בהרצאה</h1>
//         </Link>
//       </div>
//     </header>
//   );
// }
// components/layout/Header.tsx
'use client';
import Link from 'next/link';
import { Menu, X, User } from 'lucide-react';
import { useGlobalUI } from '@/lib/zustand';
import MobileNav from './MobileNav';
import DesktopNav from './DesktopNav';
import Button from '../ui/Button';

export default function Header() {
  const isOpen = useGlobalUI((s) => s.isSidebarOpen);
  const toggle = useGlobalUI((s) => s.toggleSidebar);

  return (
    <header className="bg-white shadow">
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
            <h1 className="text-xl font-bold">שווים בהרצאה</h1>
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
