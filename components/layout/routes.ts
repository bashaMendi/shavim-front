// components/layout/routes.ts
export interface Route {
  label: string;
  path: string;
}

// קישורים קבועים לכולם
export const staticRoutes: Route[] = [
  { label: 'בית', path: '/' },
  { label: 'מרצים', path: '/catalog' },
  { label: 'אודות', path: '/about' },
  { label: 'צור קשר', path: '/support/contact' },
];

// קישורים ייעודיים ל-Admin (מוצגים אם user.role === 'admin')
export const adminRoutes: Route[] = [
  { label: 'Dashboard Admin', path: '/admin/dashboard' },
  { label: 'משתמשים', path: '/admin/users' },
  { label: 'Lectures Admin', path: '/admin/lectures' },
];

// קישורים ייעודיים ל-Lecturer (מוצגים אם user.role === 'lecturer')
export const lecturerRoutes: Route[] = [
  { label: 'Dashboard Lecturer', path: '/lecturer/dashboard' },
  { label: 'My Lectures', path: '/lecturer/myLectures' },
  { label: 'New Lecture', path: '/lecturer/newLecture' },
];
