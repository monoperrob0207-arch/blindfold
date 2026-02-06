'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useBlindfoldStore } from '@/lib/store';
import { formatDistanceToNow } from 'date-fns';

const typeConfig = {
  info: { icon: 'ℹ️', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
  warning: { icon: '⚠️', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' },
  success: { icon: '✅', bg: 'bg-green-500/10', border: 'border-green-500/30' },
  error: { icon: '❌', bg: 'bg-red-500/10', border: 'border-red-500/30' },
};

export function NotificationPanel() {
  const { notifications, unreadCount, markNotificationRead, markAllNotificationsRead } = useBlindfoldStore();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="h-full flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="text-lg">🔔</span>
          <h3 className="font-semibold text-white">Notifications</h3>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-neon-red text-white">
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllNotificationsRead}
            className="text-xs text-neon-blue hover:text-neon-white transition-colors"
          >
            Mark all read
          </button>
        )}
      </div>

      {/* Notifications list */}
      <div className="flex-1 overflow-y-auto space-y-2 mt-4 custom-scrollbar">
        <AnimatePresence mode="popLayout">
          {notifications.map((notification, index) => {
            const config = typeConfig[notification.type];
            return (
              <motion.div
                key={notification.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                onClick={() => markNotificationRead(notification.id)}
                className={`p-3 rounded-xl border cursor-pointer transition-all duration-200
                           ${config.bg} ${config.border}
                           ${notification.read ? 'opacity-60' : 'opacity-100'}
                           hover:bg-white/10`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-lg">{config.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm text-white">
                        {notification.agentName}
                      </span>
                      {!notification.read && (
                        <span className="w-2 h-2 rounded-full bg-neon-blue" />
                      )}
                    </div>
                    <p className="text-sm text-gray-300">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
