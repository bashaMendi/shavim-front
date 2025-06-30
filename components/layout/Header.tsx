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
import { Menu, X } from 'lucide-react';
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
      <div className="flex items-center justify-between px-4 py-4 max-w-screen-xl mx-auto">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <Button
            className="md:hidden"
            onClick={toggle}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            variant="icon"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>

          <Link href="/">
            <h1 className="text-xl font-bold">שווים בהרצאה</h1>
          </Link>
        </div>

        {/* ניווט Desktop במרכז (md ומעלה) */}
        <DesktopNav />

        {/* כפתור Login בצד שמאל (תמיד גלוי) */}
        <div className="flex items-center">
          <Link href="/auth/login" className="hover:underline focus:outline-none ml-2">
            Login
          </Link>
        </div>
      </div>

      {/* ניווט מובייל (drawer הופך fixed overlay) */}
      <MobileNav />
    </header>
  );
}
