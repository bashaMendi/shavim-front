// app/admin/layout.tsx
// import { ReactNode } from "react";
// import { redirect } from "next/navigation";
// import AdminNav from "@/components/layout/AdminNav";
// import { useAuth } from "@/hooks/useAuth";

// export default function AdminLayout({ children }: { children: ReactNode }) {
//   const { user, isLoading } = useAuth();

//   if (isLoading) return <div>טוען…</div>;
//   if (!user || user.role !== "admin") {
//     redirect("/auth/login");
//   }

//   return (
//     <div className="flex">
//       <AdminNav />
//       <div className="flex-1 p-6">{children}</div>
//     </div>
//   );
// }

import { ReactNode } from 'react';
// import { redirect } from 'next/navigation';
// import { useAuth } from '@/hooks/useAuth';

export default function AdminLayout({ children }: { children: ReactNode }) {
  // const { user, isLoading } = useAuth();
  // if (isLoading) return <div>טוען…</div>;
  // if (!user || user.role !== 'admin') redirect('/auth/login');
  return <>{children}</>;
}