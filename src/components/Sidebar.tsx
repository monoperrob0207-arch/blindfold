'use client';

import { motion } from 'framer-motion';
import { useBlindfoldStore } from '@/lib/store';

const viewConfig = {
  dashboard: { icon: '📊', label: 'Dashboard' },
  tasks: { icon: '📋', label: 'Tasks' },
  agents: { icon: '🤖', label: 'Agents' },
  activity: { icon: '📡', label: 'Activity' },
} as const;

export function Sidebar() {
  const { selectedView, setSelectedView, notifications, unreadCount } = useBlindfoldStore();

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-20 lg:w-64 h-screen flex flex-col bg-onix-950/50 border-r border-white/5"
    >
      {/* Logo */}
      <div className="p-4 lg:p-6 border-b border-white/5">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-red to-neon-blue 
                         flex items-center justify-center text-xl shadow-lg shadow-neon-blue/20">
            👁️
          </div>
          <div className="hidden lg:block">
            <h1 className="font-bold text-white text-lg">Blindfold</h1>
            <p className="text-xs text-gray-500">Mission Control</p>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 lg:p-4 space-y-2">
        {(Object.keys(viewConfig) as Array<keyof typeof viewConfig>).map((view) => {
          const config = viewConfig[view];
          const isSelected = selectedView === view;
          
          return (
            <motion.button
              key={view}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedView(view)}
              className={`w-full flex items-center gap-3 px-3 lg:px-4 py-3 rounded-xl
                         transition-all duration-200 group
                         ${isSelected 
                           ? 'bg-gradient-to-r from-neon-blue/20 to-transparent border border-neon-blue/30' 
                           : 'hover:bg-white/5 border border-transparent'
                         }`}
            >
              <span className={`text-xl transition-transform duration-200 
                              ${isSelected ? 'scale-110' : 'group-hover:scale-110'}`}>
                {config.icon}
              </span>
              <span className={`hidden lg:block font-medium transition-colors
                             ${isSelected ? 'text-neon-blue' : 'text-gray-400 group-hover:text-white'}`}>
                {config.label}
              </span>
              {isSelected && (
                <motion.div
                  layoutId="activeIndicator"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-neon-blue hidden lg:block"
                />
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Stats summary */}
      <div className="p-4 border-t border-white/5">
        <div className="hidden lg:block p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm">⚡</span>
            <span className="text-xs text-gray-400">System Status</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-center">
            <div>
              <p className="text-lg font-bold text-neon-blue">4</p>
              <p className="text-xs text-gray-500">Agents</p>
            </div>
            <div>
              <p className="text-lg font-bold text-neon-red">3</p>
              <p className="text-xs text-gray-500">Active</p>
            </div>
          </div>
        </div>

        {/* Notification bell (mobile) */}
        <div className="lg:hidden flex items-center justify-center gap-2 mt-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10"
          >
            <span className="relative">
              <span className="text-xl">🔔</span>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-neon-red text-white 
                               text-[10px] flex items-center justify-center font-bold">
                  {unreadCount}
                </span>
              )}
            </span>
          </motion.button>
        </div>
      </div>
    </motion.aside>
  );
}
