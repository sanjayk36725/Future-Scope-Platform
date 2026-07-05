/**
 * Relational Model for Agent Chats & Logs History
 */

export interface AgentHistoryModel {
  id: string;
  userId: string;
  agentId: string; // Education: Tutor, HR: Leave...
  role: 'user' | 'model';
  message: string;
  timestamp: string;
}
