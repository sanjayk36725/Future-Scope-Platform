/**
 * Future Scope Platform (FSP)
 * Global Type Definitions
 */

export type UserRole = 'Student' | 'Faculty' | 'Developer' | 'Recruiter' | 'HR Manager' | 'Admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: string;
  details: string;
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  agentId: string; // e.g., 'tutor', 'mentor', 'screener', 'routing'
  text: string;
  timestamp: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
}
