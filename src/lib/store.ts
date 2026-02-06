import { create } from 'zustand';
import { Agent, Task, Activity, Notification, AgentStatus } from './types';

const generateMockAgents = (): Agent[] => [
  {
    id: '1',
    name: 'Viper',
    code: 'VIPER',
    role: 'Senior Developer',
    description: 'Full-stack specialist with expertise in distributed systems and API design',
    status: 'active',
    currentTask: 'Implementing REST API endpoints',
    color: '#ff3366',
    avatar: '🐍',
    stats: { tasksCompleted: 47, successRate: 98, avgTime: '2.3h' },
  },
  {
    id: '2',
    name: 'Sentinel',
    code: 'SENTINEL',
    role: 'Security Expert',
    description: 'Penetration tester and security auditor with AWS certification',
    status: 'active',
    currentTask: 'Running AWS security scan',
    color: '#00d4ff',
    avatar: '🛡️',
    stats: { tasksCompleted: 32, successRate: 100, avgTime: '4.1h' },
  },
  {
    id: '3',
    name: 'Oracle',
    code: 'ORACLE',
    role: 'Research Analyst',
    description: 'Data researcher specialized in market analysis and competitive intelligence',
    status: 'idle',
    currentTask: null,
    color: '#a855f7',
    avatar: '🔮',
    stats: { tasksCompleted: 28, successRate: 95, avgTime: '1.8h' },
  },
  {
    id: '4',
    name: 'Navigator',
    code: 'NAVIGATOR',
    role: 'Data Scientist',
    description: 'Analytics specialist with expertise in metrics, trends, and reporting',
    status: 'sleeping',
    currentTask: null,
    color: '#10b981',
    avatar: '🧭',
    stats: { tasksCompleted: 24, successRate: 92, avgTime: '3.2h' },
  },
];

const generateMockTasks = (): Task[] => [
  {
    id: 't1',
    title: 'Create authentication API',
    description: 'Implement JWT-based authentication with refresh tokens',
    status: 'inbox',
    priority: 'high',
    assignee: null,
    createdAt: new Date(Date.now() - 3600000),
    updatedAt: new Date(Date.now() - 3600000),
    progress: 0,
    comments: 2,
  },
  {
    id: 't2',
    title: 'Research competitor pricing',
    description: 'Analyze pricing strategies of top 5 competitors in the market',
    status: 'inbox',
    priority: 'medium',
    assignee: null,
    createdAt: new Date(Date.now() - 7200000),
    updatedAt: new Date(Date.now() - 7200000),
    progress: 0,
    comments: 0,
  },
  {
    id: 't3',
    title: 'Fix security vulnerabilities',
    description: 'Address critical vulnerabilities found in AWS configuration',
    status: 'assigned',
    priority: 'high',
    assignee: 'SENTINEL',
    createdAt: new Date(Date.now() - 1800000),
    updatedAt: new Date(Date.now() - 1800000),
    progress: 0,
    comments: 5,
  },
  {
    id: 't4',
    title: 'Write unit tests',
    description: 'Create comprehensive unit tests for the API module',
    status: 'assigned',
    priority: 'low',
    assignee: 'VIPER',
    createdAt: new Date(Date.now() - 5400000),
    updatedAt: new Date(Date.now() - 5400000),
    progress: 0,
    comments: 1,
  },
  {
    id: 't5',
    title: 'Implement REST endpoints',
    description: 'Complete CRUD operations for all resource endpoints',
    status: 'in_progress',
    priority: 'high',
    assignee: 'VIPER',
    createdAt: new Date(Date.now() - 86400000),
    updatedAt: new Date(Date.now() - 900000),
    progress: 65,
    comments: 12,
  },
  {
    id: 't6',
    title: 'Database optimization',
    description: 'Optimize slow queries and add proper indexing',
    status: 'in_progress',
    priority: 'medium',
    assignee: 'NAVIGATOR',
    createdAt: new Date(Date.now() - 172800000),
    updatedAt: new Date(Date.now() - 1800000),
    progress: 30,
    comments: 8,
  },
  {
    id: 't7',
    title: 'API documentation review',
    description: 'Review and finalize OpenAPI documentation',
    status: 'review',
    priority: 'medium',
    assignee: 'VIPER',
    createdAt: new Date(Date.now() - 259200000),
    updatedAt: new Date(Date.now() - 3600000),
    progress: 95,
    comments: 6,
  },
  {
    id: 't8',
    title: 'Security scan report',
    description: 'Finalize and present the security audit findings',
    status: 'review',
    priority: 'high',
    assignee: 'SENTINEL',
    createdAt: new Date(Date.now() - 345600000),
    updatedAt: new Date(Date.now() - 7200000),
    progress: 85,
    comments: 15,
  },
  {
    id: 't9',
    title: 'Setup CI/CD pipeline',
    description: 'Configure GitHub Actions for automated deployment',
    status: 'done',
    priority: 'high',
    assignee: 'VIPER',
    createdAt: new Date(Date.now() - 604800000),
    updatedAt: new Date(Date.now() - 7200000),
    progress: 100,
    comments: 10,
  },
  {
    id: 't10',
    title: 'Auth module implementation',
    description: 'Complete user authentication and authorization module',
    status: 'done',
    priority: 'high',
    assignee: 'VIPER',
    createdAt: new Date(Date.now() - 691200000),
    updatedAt: new Date(Date.now() - 10800000),
    progress: 100,
    comments: 18,
  },
];

const generateMockActivities = (): Activity[] => [
  {
    id: 'a1',
    agentCode: 'VIPER',
    agentName: 'Viper',
    action: 'completed',
    target: 'REST API implementation',
    timestamp: new Date(Date.now() - 120000),
    type: 'completion',
  },
  {
    id: 'a2',
    agentCode: 'SENTINEL',
    agentName: 'Sentinel',
    action: 'found vulnerabilities',
    target: '3 critical issues in AWS config',
    timestamp: new Date(Date.now() - 300000),
    type: 'alert',
  },
  {
    id: 'a3',
    agentCode: 'ORACLE',
    agentName: 'Oracle',
    action: 'posted research',
    target: 'Market analysis report #45',
    timestamp: new Date(Date.now() - 720000),
    type: 'comment',
  },
  {
    id: 'a4',
    agentCode: 'NAVIGATOR',
    agentName: 'Navigator',
    action: 'generated',
    target: 'Weekly metrics report',
    timestamp: new Date(Date.now() - 3600000),
    type: 'completion',
  },
  {
    id: 'a5',
    agentCode: 'SYSTEM',
    agentName: 'System',
    action: 'compiled',
    target: 'Daily standup report',
    timestamp: new Date(Date.now() - 7200000),
    type: 'system',
  },
  {
    id: 'a6',
    agentCode: 'VIPER',
    agentName: 'Viper',
    action: 'pushed',
    target: '5 commits to main branch',
    timestamp: new Date(Date.now() - 900000),
    type: 'completion',
  },
  {
    id: 'a7',
    agentCode: 'SENTINEL',
    agentName: 'Sentinel',
    action: 'completed',
    target: 'Prowler security scan',
    timestamp: new Date(Date.now() - 5400000),
    type: 'completion',
  },
  {
    id: 'a8',
    agentCode: 'ORACLE',
    agentName: 'Oracle',
    action: 'analyzed',
    target: 'Competitor pricing data',
    timestamp: new Date(Date.now() - 10800000),
    type: 'completion',
  },
];

const generateMockNotifications = (): Notification[] => [
  {
    id: 'n1',
    agentCode: 'VIPER',
    agentName: 'Viper',
    message: 'Task #9 marked as complete',
    timestamp: new Date(Date.now() - 120000),
    read: false,
    type: 'success',
  },
  {
    id: 'n2',
    agentCode: 'SENTINEL',
    agentName: 'Sentinel',
    message: '3 critical vulnerabilities detected',
    timestamp: new Date(Date.now() - 300000),
    read: false,
    type: 'warning',
  },
  {
    id: 'n3',
    agentCode: 'ORACLE',
    agentName: 'Oracle',
    message: 'New research query pending',
    timestamp: new Date(Date.now() - 600000),
    read: false,
    type: 'info',
  },
];

interface BlindfoldStore {
  agents: Agent[];
  tasks: Task[];
  activities: Activity[];
  notifications: Notification[];
  selectedView: 'dashboard' | 'tasks' | 'agents' | 'activity';
  unreadCount: number;
  
  setSelectedView: (view: 'dashboard' | 'tasks' | 'agents' | 'activity') => void;
  
  updateAgentStatus: (agentCode: string, status: AgentStatus) => void;
  
  updateTaskStatus: (taskId: string, status: Task['status']) => void;
  
  assignTask: (taskId: string, agentCode: string) => void;
  
  updateTaskProgress: (taskId: string, progress: number) => void;
  
  addTask: (task: Task) => void;
  
  markNotificationRead: (notificationId: string) => void;
  
  markAllNotificationsRead: () => void;
  
  getTasksByStatus: (status: Task['status']) => Task[];
  
  getAgentByCode: (code: string) => Agent | undefined;
}

export const useBlindfoldStore = create<BlindfoldStore>((set, get) => ({
  agents: generateMockAgents(),
  tasks: generateMockTasks(),
  activities: generateMockActivities(),
  notifications: generateMockNotifications(),
  selectedView: 'dashboard',
  unreadCount: 3,

  setSelectedView: (view) => set({ selectedView: view }),

  updateAgentStatus: (agentCode, status) =>
    set((state) => ({
      agents: state.agents.map((agent) =>
        agent.code === agentCode ? { ...agent, status } : agent
      ),
    })),

  updateTaskStatus: (taskId, status) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, status, updatedAt: new Date() } : task
      ),
    })),

  assignTask: (taskId, agentCode) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? { ...task, assignee: agentCode, status: 'assigned', updatedAt: new Date() }
          : task
      ),
    })),

  updateTaskProgress: (taskId, progress) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, progress, updatedAt: new Date() } : task
      ),
    })),

  addTask: (task) =>
    set((state) => ({
      tasks: [task, ...state.tasks],
    })),

  markNotificationRead: (notificationId) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === notificationId ? { ...n, read: true } : n
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    })),

  markAllNotificationsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),

  getTasksByStatus: (status) => get().tasks.filter((task) => task.status === status),

  getAgentByCode: (code) => get().agents.find((agent) => agent.code === code),
}));
