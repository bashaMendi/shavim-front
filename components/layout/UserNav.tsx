import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function UserNav() {
  return (
    <nav className="bg-white shadow mb-6">
      <ul className="flex space-x-4 p-4 rtl:space-x-reverse">
        <li><Link href="/user/dashboard">Dashboard</Link></li>
        <li><Link href="/user/bookings">My Bookings</Link></li>
        <li><Link href="/user/profile">Profile</Link></li>
        <li><LogoutButton /></li>
      </ul>
    </nav>
  );
}