export type AgentStatus = 'active' | 'idle' | 'sleeping' | 'offline';

export interface Agent {
  id: string;
  name: string;
  code: string;
  role: string;
  description: string;
  status: AgentStatus;
  currentTask: string | null;
  color: string;
  avatar: string;
  stats: {
    tasksCompleted: number;
    successRate: number;
    avgTime: string;
  };
}

export type TaskStatus = 'inbox' | 'assigned' | 'in_progress' | 'review' | 'done' | 'blocked';
export type TaskPriority = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: string | null;
  createdAt: Date;
  updatedAt: Date;
  progress: number;
  comments: number;
}

export interface Activity {
  id: string;
  agentCode: string;
  agentName: string;
  action: string;
  target: string;
  timestamp: Date;
  type: 'completion' | 'start' | 'comment' | 'alert' | 'system';
}

export interface Notification {
  id: string;
  agentCode: string;
  agentName: string;
  message: string;
  timestamp: Date;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
}

export interface BlindfoldState {
  agents: Agent[];
  tasks: Task[];
  activities: Activity[];
  notifications: Notification[];
  selectedAgent: string | null;
  selectedView: 'dashboard' | 'tasks' | 'agents' | 'activity';
}
