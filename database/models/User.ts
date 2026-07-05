/**
 * Relational Model for Users
 * Stores login credentials, role (Admin, Student, Faculty, etc.), and reference profiles.
 */

export interface UserModel {
  id: string;
  email: string;
  passwordHash: string;
  role: 'Student' | 'Faculty' | 'Developer' | 'Recruiter' | 'HR Manager' | 'Admin';
  createdAt: string;
}
