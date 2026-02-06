'use client';

import { motion } from 'framer-motion';
import { useBlindfoldStore } from '@/lib/store';
import { Agent, AgentStatus } from '@/lib/types';

const statusColors: Record<AgentStatus, { bg: string; border: string; pulse: string }> = {
  active: { bg: 'from-neon-blue/20', border: 'border-neon-blue', pulse: 'bg-neon-blue' },
  idle: { bg: 'from-yellow-500/20', border: 'border-yellow-500', pulse: 'bg-yellow-500' },
  sleeping: { bg: 'from-gray-500/20', border: 'border-gray-500', pulse: 'bg-gray-500' },
  offline: { bg: 'from-red-500/20', border: 'border-red-500', pulse: 'bg-red-500' },
};

const statusLabels: Record<AgentStatus, string> = {
  active: 'Active',
  idle: 'Idle',
  sleeping: 'Sleeping',
  offline: 'Offline',
};

interface AgentCardProps {
  agent: Agent;
  index: number;
}

export function AgentCard({ agent, index }: AgentCardProps) {
  const { selectedView, setSelectedView } = useBlindfoldStore();
  const colors = statusColors[agent.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className={`agent-card relative overflow-hidden rounded-2xl bg-gradient-to-br ${colors.bg} to-transparent
                  border border-white/5 backdrop-blur-sm p-5 cursor-pointer
                  hover:border-white/10 hover:bg-white/5 transition-all duration-300`}
      onClick={() => setSelectedView('agents')}
    >
      {/* Status indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${colors.pulse} ${agent.status === 'active' ? 'animate-pulse' : ''}`} />
        <span className="text-xs text-gray-400 font-medium">{statusLabels[agent.status]}</span>
      </div>

      <div className="flex items-start gap-4">
        {/* Avatar */}
        <motion.div
          whileHover={{ rotate: 10 }}
          className="w-14 h-14 rounded-xl bg-gradient-to-br from-white/10 to-white/5 
                     flex items-center justify-center text-2xl shadow-lg"
          style={{ borderLeft: `3px solid ${agent.color}` }}
        >
          {agent.avatar}
        </motion.div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-white truncate">{agent.name}</h3>
          <p className="text-sm text-gray-400">{agent.role}</p>
        </div>
      </div>

      {/* Current task */}
      <div className="mt-4 p-3 rounded-lg bg-black/30">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
          <span>📝</span>
          <span>Current Task</span>
        </div>
        <p className="text-sm text-white font-medium truncate">
          {agent.currentTask || 'No active task'}
        </p>
      </div>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="text-center p-2 rounded-lg bg-white/5">
          <p className="text-lg font-bold gradient-text">{agent.stats.tasksCompleted}</p>
          <p className="text-xs text-gray-400">Tasks</p>
        </div>
        <div className="text-center p-2 rounded-lg bg-white/5">
          <p className="text-lg font-bold text-neon-blue">{agent.stats.successRate}%</p>
          <p className="text-xs text-gray-400">Success</p>
        </div>
        <div className="text-center p-2 rounded-lg bg-white/5">
          <p className="text-lg font-bold text-neon-red">{agent.stats.avgTime}</p>
          <p className="text-xs text-gray-400">Avg Time</p>
        </div>
      </div>

      {/* Hover glow effect */}
      <div 
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ 
          background: `radial-gradient(circle at 50% 0%, ${agent.color}10%, transparent 70%)` 
        }}
      />
    </motion.div>
  );
}
