import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Sun, Moon, LogOut, ChevronDown, X, Check } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import { useNotificationStore } from '../store/notificationStore';

const notificationColors: Record<string, string> = {
  error: 'text-red-500',
  warning: 'text-amber-500',
  success: 'text-emerald-500',
  info: 'text-blue-500',
};

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const { isDark, toggleTheme } = useThemeStore();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotificationStore();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  const count = unreadCount();
  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Admin';
  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-sm z-20">
      <div>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
          Healthcare Management
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          className="p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </motion.button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Bell className="w-5 h-5" />
            {count > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                {count > 9 ? '9+' : count}
              </span>
            )}
          </motion.button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-12 w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                  <span className="font-semibold text-gray-900 dark:text-white">Notifications</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      Mark all read
                    </button>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-gray-50 dark:divide-gray-800">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markAsRead(n.id)}
                      className={`flex gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                        !n.read ? 'bg-indigo-50/40 dark:bg-indigo-900/10' : ''
                      }`}
                    >
                      <div className={`mt-0.5 flex-shrink-0 ${notificationColors[n.type]}`}>
                        {n.read ? (
                          <Check className="w-4 h-4 text-gray-300 dark:text-gray-600" />
                        ) : (
                          <span className="block w-2 h-2 rounded-full bg-current mt-1" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${n.read ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                          {n.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{n.message}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-600 mt-0.5">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Menu */}
        <div className="relative" ref={userRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white text-sm font-semibold shadow-glow">
              {initials}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-gray-900 dark:text-white leading-tight">{displayName}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>

          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-12 w-48 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50"
              >
                <button
                  onClick={() => { logout(); setShowUserMenu(false); }}
                  className="flex items-center gap-2 w-full px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
