'use client';

import { motion } from 'framer-motion';
import { Task, TaskPriority } from '@/lib/types';
import { useBlindfoldStore } from '@/lib/store';
import { formatDistanceToNow } from 'date-fns';

const priorityConfig: Record<TaskPriority, { label: string; bg: string; text: string }> = {
  critical: { label: 'CRIT', bg: 'bg-neon-red/30', text: 'text-neon-red' },
  high: { label: 'HIGH', bg: 'bg-neon-red/20', text: 'text-neon-red' },
  medium: { label: 'MED', bg: 'bg-yellow-500/20', text: 'text-yellow-500' },
  low: { label: 'LOW', bg: 'bg-gray-500/20', text: 'text-gray-400' },
};

interface TaskCardProps {
  task: Task;
  columnId: string;
}

export function TaskCard({ task, columnId }: TaskCardProps) {
  const { getAgentByCode, assignTask, updateTaskStatus } = useBlindfoldStore();
  const assignee = task.assignee ? getAgentByCode(task.assignee) : null;
  const priority = priorityConfig[task.priority];

  const handleDragEnd = (result: any) => {
    if (result.destination && result.destination.id !== columnId) {
      updateTaskStatus(task.id, result.destination.id as Task['status']);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4 }}
      draggable
      onDragEnd={handleDragEnd}
      className="task-card group relative overflow-hidden rounded-xl bg-gradient-to-br from-white/5 to-white/0
                 border border-white/10 p-4 cursor-grab active:cursor-grabbing
                 hover:border-neon-blue/30 hover:bg-white/10 transition-all duration-300"
    >
      {/* Priority badge */}
      <div className="flex items-center justify-between mb-3">
        <span className={`px-2 py-0.5 rounded text-xs font-bold ${priority.bg} ${priority.text}`}>
          {priority.label}
        </span>
        <span className="text-xs text-gray-500">
          {formatDistanceToNow(new Date(task.updatedAt || task.createdAt || new Date()), { addSuffix: true })}
        </span>
      </div>

      {/* Title */}
      <h4 className="text-sm font-semibold text-white mb-2 line-clamp-2 group-hover:text-neon-blue transition-colors">
        {task.title}
      </h4>

      {/* Description */}
      <p className="text-xs text-gray-400 mb-3 line-clamp-2">
        {task.description}
      </p>

      {/* Progress bar */}
      {task.status === 'in_progress' && (
        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Progress</span>
            <span>{task.progress}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${task.progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="h-full rounded-full bg-gradient-to-r from-neon-blue to-neon-white"
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between">
        {/* Assignee */}
        <div className="flex items-center gap-2">
          {assignee ? (
            <>
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ backgroundColor: assignee.color, color: '#000' }}
              >
                {assignee.code?.[0] || assignee.name[0]}
              </div>
              <span className="text-xs text-gray-400">{assignee.name}</span>
            </>
          ) : (
            <span className="text-xs text-gray-500">Unassigned</span>
          )}
        </div>

        {/* Comments count */}
        <div className="flex items-center gap-1 text-gray-500">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="text-xs">{task.comments}</span>
        </div>
      </div>

      {/* Status indicator line */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
        style={{ 
          background: task.status === 'done' 
            ? 'linear-gradient(180deg, #10b981, #059669)' 
            : task.status === 'blocked'
            ? 'linear-gradient(180deg, #ef4444, #dc2626)'
            : 'linear-gradient(180deg, #00d4ff, #3b82f6)'
        }}
      />
    </motion.div>
  );
}
