// app/lecturer/layout.tsx
// import { ReactNode } from "react";
// import { redirect } from "next/navigation";
// import LecturerNav from "@/components/layout/LecturerNav";
// import { useAuth } from "@/hooks/useAuth";

// export default function LecturerLayout({ children }: { children: ReactNode }) {
  // const { user, isLoading } = useAuth();

  // if (isLoading) return <div>טוען…</div>;
  // if (!user || user.role !== "lecturer") {
  //   redirect("/auth/login");
  // }

//   return (
//     <div className="flex flex-col">
//       <LecturerNav />
//       <section className="p-6">{children}</section>
//     </div>
//   );
// }
import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function LecturerLayout({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();
  if (isLoading) return <div>טוען…</div>;
  if (!user || user.role !== 'lecturer') redirect('/auth/login');
  return <>{children}</>;
}