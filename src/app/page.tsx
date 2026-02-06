'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { MainContent } from '@/components/MainContent';
import { useBlindfoldStore } from '@/lib/store';
import { NotificationPanel } from '@/components/NotificationPanel';

export default function Home() {
  const { selectedView, notifications, unreadCount } = useBlindfoldStore();

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <MainContent />
      </div>

      {/* Right sidebar - Notifications (desktop only) */}
      <motion.aside
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden xl:block w-80 bg-onix-950/50 border-l border-white/5 overflow-hidden"
      >
        <div className="h-full p-4 overflow-y-auto">
          <NotificationPanel />
        </div>
      </motion.aside>
    </div>
  );
}
