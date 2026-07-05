/**
 * Future Scope Platform (FSP)
 * User, Role, and Profile Entity Definitions
 */

export type Role = 'Student' | 'Faculty' | 'Developer' | 'Recruiter' | 'HR Manager' | 'Admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  avatarUrl?: string;
  createdAt: string;
}

export interface Profile {
  id: string;
  userId: string;
  bio?: string;
  department?: string;
  skills?: string[];
  phoneNumber?: string;
  experience?: string;
  education?: string;
  updatedAt?: string;
}
