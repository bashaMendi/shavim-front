import Link from "next/link";
import LogoutButton from "../../../components/layout/LogoutButton";

export default function LecturerNav() {
  return (
    <nav className="bg-white shadow mb-6">
      <ul className="flex space-x-4 p-4 rtl:space-x-reverse">
        <li><Link href="/lecturer/dashboard">Dashboard</Link></li>
        <li><Link href="/lecturer/myLectures">My Lectures</Link></li>
        <li><Link href="/lecturer/newLecture">New Lecture</Link></li>
        <li><LogoutButton /></li>
      </ul>
    </nav>
  );
} 