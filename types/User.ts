export type UserRole = 'admin' | 'user' | 'lecturer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}