// Blindfold v3 Types

export interface Agent {
  id: string;
  name: string;
  role: string;
  code?: string;
  description?: string;
  status: 'idle' | 'active' | 'thinking' | 'collaborating';
  color: string;
  capabilities: string[];
  currentTask: string | null;
  lastActive: string;
  suggestionCount: number;
  avatar?: string;
}

export interface Proposal {
  id: string;
  agent: string;
  agentId: string;
  task: string;
  reason: string;
  expectedOutcome: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  createdAt: string;
  approvedBy?: string;
  approvedAt?: string;
  votes: AgentVote[];
  dependencies: string[];
}

export interface AgentVote {
  agent: string;
  vote: 'support' | 'oppose' | 'abstain';
  comment?: string;
  timestamp: string;
}

export interface Task {
  id: string;
  proposalId?: string;
  agent: string;
  task: string;
  title?: string;
  description?: string;
  reason: string;
  expectedOutcome: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'in_progress' | 'completed' | 'failed' | 'blocked' | 'inbox' | 'assigned' | 'review' | 'done';
  createdAt?: string;
  startedAt?: string;
  completedAt?: string;
  result?: string;
  updatedAt?: string;
  progress?: number;
  comments?: number;
  assignee?: string;
}

export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';

export interface AgentMessage {
  id: string;
  from: string;
  to?: string;
  type: 'proposal' | 'collaboration_request' | 'feedback' | 'task_assigned' | 'task_completed' | 'system';
  content: string;
  timestamp: string;
  proposalId?: string;
  taskId?: string;
  rating?: number;
}

export interface AgentFeedback {
  id: string;
  from: string;
  to: string;
  aboutTask: string;
  feedback: string;
  rating: number;
  timestamp: string;
}

export interface AgentCommunication {
  messages: AgentMessage[];
  feedbacks: AgentFeedback[];
  updatedAt: string;
}

export interface SystemStats {
  totalAgents: number;
  activeAgents: number;
  pendingProposals: number;
  completedTasks: number;
  successRate: number;
  uptime: string;
}

export interface Activity {
  id: string;
  agentCode?: string;
  agentName: string;
  action: string;
  target: string;
  timestamp: string;
  type: 'completion' | 'start' | 'comment' | 'alert' | 'system';
}

export interface Notification {
  id: string;
  agentName: string;
  agentCode?: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  timestamp: string;
}

export type { Agent, Proposal, Task, AgentMessage, AgentFeedback, AgentCommunication, AgentVote, TaskPriority, Activity, Notification };
