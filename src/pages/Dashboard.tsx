import { motion } from 'framer-motion';
import {
  Users,
  Activity,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  AlertTriangle,
  UserPlus,
  FileText,
  Zap,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { recentActivity, mockPatients } from '../utils/mockData';
import StatusBadge from '../components/StatusBadge';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const stats = [
  {
    title: 'Total Patients',
    value: '1,284',
    change: 12.5,
    changeLabel: 'vs last month',
    icon: Users,
    gradient: 'from-indigo-500 to-indigo-600',
    bg: 'bg-indigo-50 dark:bg-indigo-900/20',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
  },
  {
    title: 'Active Cases',
    value: '342',
    change: 3.2,
    changeLabel: 'vs last week',
    icon: Activity,
    gradient: 'from-violet-500 to-violet-600',
    bg: 'bg-violet-50 dark:bg-violet-900/20',
    iconColor: 'text-violet-600 dark:text-violet-400',
  },
  {
    title: 'Appointments Today',
    value: '48',
    change: -5.1,
    changeLabel: 'vs yesterday',
    icon: Calendar,
    gradient: 'from-cyan-500 to-cyan-600',
    bg: 'bg-cyan-50 dark:bg-cyan-900/20',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
  },
  {
    title: 'Monthly Revenue',
    value: '$635K',
    change: 9.3,
    changeLabel: 'vs last month',
    icon: DollarSign,
    gradient: 'from-emerald-500 to-emerald-600',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
  },
];

const quickActions = [
  { label: 'Add Patient', icon: UserPlus, color: 'from-indigo-500 to-violet-600', path: '/patients' },
  { label: 'Schedule', icon: Calendar, color: 'from-cyan-500 to-blue-600', path: '/appointments' },
  { label: 'Reports', icon: FileText, color: 'from-amber-500 to-orange-600', path: '/reports' },
  { label: 'Analytics', icon: Zap, color: 'from-emerald-500 to-teal-600', path: '/analytics' },
];

const activityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  admission: UserPlus,
  discharge: ArrowRight,
  appointment: Calendar,
  alert: AlertTriangle,
  report: FileText,
};

const activityColors: Record<string, string> = {
  info: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
  warning: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
  error: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
  success: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
};

export default function Dashboard() {
  const navigate = useNavigate();
  const criticalPatients = mockPatients.filter((p) => p.status === 'Critical');

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 space-y-6 max-w-7xl mx-auto"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Monitor your healthcare operations in real-time
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const isPositive = stat.change >= 0;
          return (
            <motion.div
              key={stat.title}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`flex items-center justify-center w-11 h-11 rounded-xl ${stat.bg}`}>
                  <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
                <span
                  className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                    isPositive
                      ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400'
                      : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                  }`}
                >
                  {isPositive ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {Math.abs(stat.change)}%
                </span>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{stat.title}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{stat.changeLabel}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
            <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
              Live
            </span>
          </div>
          <div className="divide-y divide-gray-50 dark:divide-gray-700">
            {recentActivity.map((item, i) => {
              const Icon = activityIcons[item.type] || Activity;
              const colorClass = activityColors[item.severity || 'info'];
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                >
                  <div className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg ${colorClass}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-800 dark:text-gray-200">{item.message}</p>
                    {item.patient && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.patient}</p>
                    )}
                  </div>
                  <span className="flex-shrink-0 text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">
                    {item.time}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map(({ label, icon: Icon, color, path }) => (
                <motion.button
                  key={label}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate(path)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br ${color} text-white shadow-sm hover:shadow-md transition-shadow`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Critical Patients */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white">Critical Patients</h3>
              <button
                onClick={() => navigate('/patients')}
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                View all <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="divide-y divide-gray-50 dark:divide-gray-700">
              {criticalPatients.map((patient, i) => (
                <motion.div
                  key={patient.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-red-600 text-white text-xs font-semibold flex-shrink-0">
                    {patient.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{patient.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{patient.condition}</p>
                  </div>
                  <StatusBadge status={patient.status} size="sm" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Row - Department summary */}
      <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-gray-900 dark:text-white">Department Summary</h3>
          <button
            onClick={() => navigate('/analytics')}
            className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            Full analytics <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { dept: 'Cardiology', count: 8, color: 'bg-indigo-500' },
            { dept: 'Neurology', count: 5, color: 'bg-violet-500' },
            { dept: 'Orthopedics', count: 4, color: 'bg-cyan-500' },
            { dept: 'Oncology', count: 3, color: 'bg-amber-500' },
            { dept: 'General', count: 9, color: 'bg-blue-500' },
          ].map(({ dept, count, color }) => (
            <div key={dept} className="text-center">
              <div className="relative mx-auto w-12 h-12 mb-2">
                <svg viewBox="0 0 36 36" className="w-12 h-12 -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="currentColor" strokeWidth="3" className="text-gray-100 dark:text-gray-700" />
                  <circle
                    cx="18" cy="18" r="15.9" fill="none"
                    stroke="currentColor" strokeWidth="3"
                    strokeDasharray={`${(count / 30) * 100} 100`}
                    strokeLinecap="round"
                    className={color.replace('bg-', 'text-')}
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-900 dark:text-white">
                  {count}
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">{dept}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
