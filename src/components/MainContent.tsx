'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useBlindfoldStore } from '@/lib/store';
import { NotificationPanel } from './NotificationPanel';
import { Dashboard } from './Dashboard';

export function MainContent() {
  const { selectedView } = useBlindfoldStore();

  return (
    <main className="flex-1 flex overflow-hidden">
      {/* Main content area */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {selectedView === 'dashboard' && <Dashboard key="dashboard" />}
          {selectedView === 'tasks' && <TasksView key="tasks" />}
          {selectedView === 'agents' && <AgentsView key="agents" />}
          {selectedView === 'activity' && <ActivityView key="activity" />}
        </AnimatePresence>
      </div>

      {/* Right sidebar - Notifications */}
      <motion.aside
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden 2xl:block w-80 bg-onix-950/50 border-l border-white/5 overflow-hidden"
      >
        <div className="h-full p-4">
          <NotificationPanel />
        </div>
      </motion.aside>
    </main>
  );
}

function TasksView() {
  const { tasks, getTasksByStatus } = useBlindfoldStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 lg:p-8 overflow-auto h-full"
    >
      <h1 className="text-3xl font-bold mb-6">
        <span className="gradient-text">Task Board</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tasks.map((task) => (
          <div key={task.id} className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className={`px-2 py-0.5 rounded text-xs font-bold
                             ${task.priority === 'high' ? 'bg-neon-red/20 text-neon-red' : 
                               task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-500' : 
                               'bg-gray-500/20 text-gray-400'}`}>
                {task.priority.toUpperCase()}
              </span>
              <span className="text-xs text-gray-500">{task.status}</span>
            </div>
            <h3 className="font-semibold text-white mb-2">{task.title}</h3>
            <p className="text-sm text-gray-400">{task.description}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function AgentsView() {
  const { agents } = useBlindfoldStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 lg:p-8 overflow-auto h-full"
    >
      <h1 className="text-3xl font-bold mb-6">
        <span className="gradient-text">Agents</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {agents.map((agent) => (
          <div 
            key={agent.id} 
            className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10"
          >
            <div className="flex items-start gap-4">
              <div 
                className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl"
                style={{ backgroundColor: `${agent.color}20`, borderLeft: `4px solid ${agent.color}` }}
              >
                {agent.avatar}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white">{agent.name}</h3>
                <p className="text-gray-400">{agent.role}</p>
                <p className="text-sm text-gray-500 mt-2">{agent.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <span className={`px-2 py-0.5 rounded text-xs font-bold
                             ${agent.status === 'active' ? 'bg-neon-blue/20 text-neon-blue' : 
                               agent.status === 'idle' ? 'bg-yellow-500/20 text-yellow-500' : 
                               'bg-gray-500/20 text-gray-400'}`}>
                {agent.status.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ActivityView() {
  const { activities } = useBlindfoldStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 lg:p-8 overflow-auto h-full"
    >
      <h1 className="text-3xl font-bold mb-6">
        <span className="gradient-text">Activity Stream</span>
      </h1>
      <div className="space-y-4 max-w-3xl">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-4 rounded-xl bg-white/5 border border-white/10"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{activity.agentName === 'System' ? '🖥️' : '🤖'}</span>
              <div>
                <p className="text-white">
                  <span className="font-semibold">{activity.agentName}</span>
                  {' '}{activity.action}{' '}
                  <span className="text-neon-blue">{activity.target}</span>
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(activity.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export { TasksView, AgentsView, ActivityView };
