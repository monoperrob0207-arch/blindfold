'use client';

import { motion } from 'framer-motion';
import { useBlindfoldStore } from '@/lib/store';

export function Header() {
  const { notifications, unreadCount } = useBlindfoldStore();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="h-16 bg-onix-950/80 backdrop-blur-md border-b border-white/5 
                 flex items-center justify-between px-6 lg:px-8 sticky top-0 z-50"
    >
      {/* Search */}
      <div className="hidden md:flex items-center gap-4 flex-1 max-w-md">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search tasks, agents, files..."
            className="w-full px-4 py-2 pl-10 rounded-xl bg-white/5 border border-white/10 
                       text-white placeholder-gray-500 text-sm focus:outline-none 
                       focus:border-neon-blue/50 focus:bg-white/10 transition-all duration-200"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Quick actions */}
      <div className="flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r 
                     from-neon-blue/20 to-neon-red/20 border border-white/10
                     text-neon-blue text-sm font-medium hover:border-neon-blue/50 transition-all"
        >
          <span>➕</span>
          <span className="hidden lg:inline">New Task</span>
        </motion.button>

        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
        >
          <span className="text-lg">🔔</span>
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-neon-red 
                       text-white text-[10px] flex items-center justify-center font-bold"
            >
              {unreadCount}
            </motion.span>
          )}
        </motion.button>

        {/* Settings */}
        <motion.button
          whileHover={{ scale: 1.05, rotate: 90 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
        >
          <span className="text-lg">⚙️</span>
        </motion.button>

        {/* User */}
        <div className="hidden lg:flex items-center gap-3 ml-2 pl-4 border-l border-white/10">
          <div className="text-right">
            <p className="text-sm font-medium text-white">Dr.IA</p>
            <p className="text-xs text-gray-500">Owner</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-red to-neon-blue 
                         flex items-center justify-center text-white font-bold">
            D
          </div>
        </div>
      </div>
    </motion.header>
  );
}
