import Link from "next/link";
import LogoutButton from "../../../components/layout/LogoutButton";

export default function AdminNav() {
  return (
    <nav className="w-60 bg-gray-100 h-screen p-4">
      <ul className="space-y-2">
        <li><Link href="/admin/dashboard">Dashboard</Link></li>
        <li><Link href="/admin/users">Users</Link></li>
        <li><Link href="/admin/lectures">Lectures</Link></li>
        <li><LogoutButton /></li>
      </ul>
    </nav>
  );
} 