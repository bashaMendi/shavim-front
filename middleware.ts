import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// הגדרת סוד ה-JWT (רצוי לשים ב-env)
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

// דפים שמוגנים לפי role
const protectedRoutes = [
  { path: '/admin', role: 'admin' },
  { path: '/lecturer', role: 'lecturer' },
  { path: '/user', role: 'user' },
];

// פונקציה עוזרת לבדוק אם path שייך ל-role
function getRequiredRole(pathname: string): string | null {
  for (const route of protectedRoutes) {
    if (pathname.startsWith(route.path)) {
      return route.role;
    }
  }
  return null;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const requiredRole = getRequiredRole(pathname);
  if (!requiredRole) {
    // לא דף מוגן – המשך רגיל
    return NextResponse.next();
  }

  // קרא את ה-token מה-cookie (נניח שהוא בשם 'token')
  const token = req.cookies.get('token')?.value;
  if (!token) {
    // אין token – הפנה ל-login
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  try {
    // אמת את ה-JWT
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET)
    );
    // בדוק role
    if (payload.role !== requiredRole) {
      // אין הרשאה – הפנה לדף הבית או שגיאה
      return NextResponse.redirect(new URL('/', req.url));
    }
    // הכל תקין – המשך
    return NextResponse.next();
  } catch (e) {
    // token לא תקין – הפנה ל-login
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }
}

// הגדר אילו נתיבים להפעיל עליהם את ה-middleware
export const config = {
  matcher: ['/admin/:path*', '/lecturer/:path*', '/user/:path*'],
}; 