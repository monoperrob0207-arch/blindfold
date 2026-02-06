'use client';

import { motion } from 'framer-motion';
import { useBlindfoldStore } from '@/lib/store';
import { AgentCard } from './AgentCard';
import { TaskColumn } from './TaskColumn';
import { ActivityItem } from './ActivityItem';

const taskColumns = [
  { id: 'inbox' as const, title: 'Inbox', icon: '📥', color: '#8b5cf6' },
  { id: 'assigned' as const, title: 'Assigned', icon: '👤', color: '#3b82f6' },
  { id: 'in_progress' as const, title: 'In Progress', icon: '🔄', color: '#f59e0b' },
  { id: 'review' as const, title: 'In Review', icon: '👀', color: '#10b981' },
  { id: 'done' as const, title: 'Done', icon: '✅', color: '#6b7280' },
];

export function Dashboard() {
  const { agents, tasks, activities, getTasksByStatus } = useBlindfoldStore();

  const stats = {
    totalTasks: tasks.length,
    inProgress: tasks.filter(t => t.status === 'in_progress').length,
    completed: tasks.filter(t => t.status === 'done').length,
    blocked: tasks.filter(t => t.status === 'blocked').length,
    activeAgents: agents.filter(a => a.status === 'active').length,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 lg:p-8 overflow-auto h-full"
    >
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <h1 className="text-3xl lg:text-4xl font-bold">
          <span className="gradient-text">Mission Control</span>
        </h1>
        <p className="text-gray-400 mt-1">Blindfold Multi-Agent Orchestration System</p>
      </motion.div>

      {/* Stats cards */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8"
      >
        <StatCard label="Total Tasks" value={stats.totalTasks} icon="📋" color="text-neon-blue" />
        <StatCard label="In Progress" value={stats.inProgress} icon="🔄" color="text-yellow-500" />
        <StatCard label="Completed" value={stats.completed} icon="✅" color="text-green-500" />
        <StatCard label="Blocked" value={stats.blocked} icon="⚠️" color="text-neon-red" />
        <StatCard label="Active Agents" value={stats.activeAgents} icon="🤖" color="text-purple-500" />
      </motion.div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Agents Section */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="xl:col-span-1"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">🤖</span>
            <h2 className="text-xl font-bold text-white">Agents Squad</h2>
          </div>
          <div className="grid gap-4">
            {agents.map((agent, index) => (
              <AgentCard key={agent.id} agent={agent} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Task Board */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="xl:col-span-2"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-lg">📋</span>
              <h2 className="text-xl font-bold text-white">Task Board</h2>
            </div>
            <div className="flex items-center gap-2">
              <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 
                                 text-sm text-gray-300 focus:outline-none focus:border-neon-blue">
                <option value="all">All</option>
                <option value="my">My Tasks</option>
                <option value="high">High Priority</option>
              </select>
            </div>
          </div>

          {/* Kanban board */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 overflow-x-auto pb-4">
            {taskColumns.map((column, index) => (
              <motion.div
                key={column.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="min-w-[160px]"
              >
                <TaskColumn
                  id={column.id}
                  title={column.title}
                  icon={column.icon}
                  color={column.color}
                  tasks={getTasksByStatus(column.id)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Activity Feed */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8"
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">📡</span>
          <h2 className="text-xl font-bold text-white">Activity Feed</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-onix-900/50 rounded-2xl border border-white/5 p-4">
            <div className="space-y-1 max-h-[400px] overflow-y-auto custom-scrollbar">
              {activities.slice(0, 8).map((activity, index) => (
                <ActivityItem key={activity.id} activity={activity} index={index} />
              ))}
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-onix-900/50 to-onix-800/50 rounded-2xl 
                        border border-white/5 p-6">
            <h3 className="text-lg font-bold text-white mb-4">⚡ Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <QuickActionButton icon="➕" label="New Task" color="neon-blue" />
              <QuickActionButton icon="🔔" label="Notify All" color="neon-red" />
              <QuickActionButton icon="📊" label="Generate Report" color="purple" />
              <QuickActionButton icon="⚙️" label="Configure" color="gray" />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function StatCard({ label, value, icon, color }: { label: string; value: number; icon: string; color: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className="bg-gradient-to-br from-onix-900/80 to-onix-800/80 rounded-xl border border-white/5 
                 p-4 backdrop-blur-sm hover:border-white/10 transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-2xl lg:text-3xl font-bold gradient-text">{value}</p>
          <p className="text-xs text-gray-400 mt-1">{label}</p>
        </div>
        <span className="text-2xl opacity-50">{icon}</span>
      </div>
    </motion.div>
  );
}

function QuickActionButton({ icon, label, color }: { icon: string; label: string; color: string }) {
  const colorClasses: Record<string, string> = {
    'neon-blue': 'hover:border-neon-blue hover:text-neon-blue',
    'neon-red': 'hover:border-neon-red hover:text-neon-red',
    'purple': 'hover:border-purple-500 hover:text-purple-400',
    'gray': 'hover:border-gray-400 hover:text-gray-300',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10
                 text-gray-300 transition-all duration-200 ${colorClasses[color]}`}
    >
      <span className="text-lg">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </motion.button>
  );
}
