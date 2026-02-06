'use client';

import { motion } from 'framer-motion';
import { useBlindfoldStore } from '@/lib/store';
import { Task } from '@/lib/types';
import { TaskCard } from './TaskCard';

interface TaskColumnProps {
  id: Task['status'];
  title: string;
  icon: string;
  color: string;
  tasks: Task[];
}

const columnConfig: Record<Task['status'], { color: string; gradient: string }> = {
  inbox: { color: '#8b5cf6', gradient: 'from-violet-500/20' },
  assigned: { color: '#3b82f6', gradient: 'from-blue-500/20' },
  in_progress: { color: '#f59e0b', gradient: 'from-amber-500/20' },
  review: { color: '#10b981', gradient: 'from-emerald-500/20' },
  done: { color: '#6b7280', gradient: 'from-gray-500/20' },
  blocked: { color: '#ef4444', gradient: 'from-red-500/20' },
};

export function TaskColumn({ id, title, icon, color, tasks }: TaskColumnProps) {
  const config = columnConfig[id];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col h-full min-h-[400px]"
    >
      {/* Column header */}
      <div className="sticky top-0 z-10 bg-onix-950/95 backdrop-blur-sm pb-3 mb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">{icon}</span>
            <h3 className="font-semibold text-white">{title}</h3>
            <span 
              className="px-2 py-0.5 rounded-full text-xs font-bold"
              style={{ 
                backgroundColor: `${color}20`, 
                color: color,
                border: `1px solid ${color}40`
              }}
            >
              {tasks.length}
            </span>
          </div>
        </div>
        <div 
          className="h-0.5 rounded-full mt-3" 
          style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
        />
      </div>

      {/* Tasks list */}
      <div className="flex-1 overflow-y-auto space-y-3 px-1 custom-scrollbar">
        {tasks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center h-40 text-gray-500 text-sm"
          >
            No tasks
          </motion.div>
        ) : (
          tasks.map((task, index) => (
            <TaskCard key={task.id} task={task} columnId={id} />
          ))
        )}
      </div>
    </motion.div>
  );
}
