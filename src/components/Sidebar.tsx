import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  BarChart3,
  Users,
  Calendar,
  Settings,
  ChevronLeft,
  ChevronRight,
  Activity,
  Heart,
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/patients', icon: Users, label: 'Patients' },
  { to: '/appointments', icon: Calendar, label: 'Appointments' },
  { to: '/reports', icon: Activity, label: 'Reports' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="relative flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-gray-100 dark:border-gray-800">
        <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-glow">
          <Heart className="w-5 h-5 text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <span className="font-bold text-lg bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent whitespace-nowrap">
                HealthNexus
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 py-4 px-2 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-glow'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  className={`flex-shrink-0 w-5 h-5 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-white' : ''
                  }`}
                />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="text-sm font-medium whitespace-nowrap overflow-hidden"
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 z-10 flex items-center justify-center w-6 h-6 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md text-gray-500 hover:text-indigo-600 transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="w-3.5 h-3.5" />
        ) : (
          <ChevronLeft className="w-3.5 h-3.5" />
        )}
      </button>

      {/* Version */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-4 py-3 border-t border-gray-100 dark:border-gray-800"
          >
            <p className="text-xs text-gray-400 dark:text-gray-600">v1.0.0 — Enterprise</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
}
