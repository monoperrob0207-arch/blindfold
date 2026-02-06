'use client';

import { motion } from 'framer-motion';
import { Activity } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';
import { useBlindfoldStore } from '@/lib/store';

const typeConfig: Record<Activity['type'], { icon: string; color: string; bg: string }> = {
  completion: { icon: '✅', color: 'text-neon-blue', bg: 'bg-neon-blue/10' },
  start: { icon: '🚀', color: 'text-neon-blue', bg: 'bg-neon-blue/10' },
  comment: { icon: '💬', color: 'text-purple-400', bg: 'bg-purple-400/10' },
  alert: { icon: '⚠️', color: 'text-neon-red', bg: 'bg-neon-red/10' },
  system: { icon: '🖥️', color: 'text-gray-400', bg: 'bg-gray-400/10' },
};

interface ActivityItemProps {
  activity: Activity;
  index: number;
}

export function ActivityItem({ activity, index }: ActivityItemProps) {
  const { getAgentByCode } = useBlindfoldStore();
  const agent = getAgentByCode(activity.agentCode);
  const config = typeConfig[activity.type];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="activity-item flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 
                 transition-colors duration-200 group"
    >
      {/* Avatar/Icon */}
      <div className={`w-9 h-9 rounded-lg ${config.bg} flex items-center justify-center 
                      text-sm flex-shrink-0 shadow-lg`}
           style={{ borderLeft: agent ? `2px solid ${agent.color}` : '2px solid #666' }}>
        {agent?.avatar || '🖥️'}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={`font-semibold text-sm ${agent ? 'text-white' : 'text-gray-400'}`}>
            {activity.agentName}
          </span>
          <span className="text-gray-500 text-xs">
            {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
          </span>
        </div>
        <p className="text-sm text-gray-300">
          <span className="text-gray-400">{activity.action}</span>
          {' '}
          <span className="text-neon-blue font-medium">{activity.target}</span>
        </p>
      </div>

      {/* Type indicator */}
      <div className={`w-6 h-6 rounded-full ${config.bg} flex items-center justify-center flex-shrink-0
                      opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
        <span className="text-xs">{config.icon}</span>
      </div>
    </motion.div>
  );
}
