// app/user/layout.tsx
// import { ReactNode } from "react";
// import { redirect } from "next/navigation";
// import UserNav from "@/components/layout/UserNav";
// import { useAuth } from "@/hooks/useAuth";

// export default function UserLayout({ children }: { children: ReactNode }) {
//   const { user, isLoading } = useAuth();

//   if (isLoading) return <div>טוען…</div>;
//   if (!user || user.role !== "user") {
//     redirect("/auth/login");
//   }

//   return (
//     <div>
//       <UserNav />
//       <main className="p-6">{children}</main>
//     </div>
//   );
// }
import { ReactNode } from 'react';
// import { redirect } from 'next/navigation';
// import { useAuth } from '@/hooks/useAuth';

export default function UserLayout({ children }: { children: ReactNode }) {
  // const { user, isLoading } = useAuth();
  // if (isLoading) return <div>טוען…</div>;
  // if (!user || user.role !== 'user') redirect('/auth/login');
  return <>{children}</>;
}