import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, Heart } from 'lucide-react';
import {
  admissionsData,
  departmentData,
  demographicsData,
  revenueData,
} from '../utils/mockData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const kpis = [
  {
    title: 'Avg Length of Stay',
    value: '4.2 days',
    change: -8.3,
    icon: Activity,
    color: 'text-indigo-600 dark:text-indigo-400',
    bg: 'bg-indigo-50 dark:bg-indigo-900/20',
  },
  {
    title: 'Patient Satisfaction',
    value: '94.7%',
    change: 2.1,
    icon: Heart,
    color: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-50 dark:bg-violet-900/20',
  },
  {
    title: 'Bed Occupancy Rate',
    value: '78.3%',
    change: 5.4,
    icon: Users,
    color: 'text-cyan-600 dark:text-cyan-400',
    bg: 'bg-cyan-50 dark:bg-cyan-900/20',
  },
  {
    title: 'Revenue per Patient',
    value: '$4,940',
    change: 11.2,
    icon: DollarSign,
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
  },
];

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ color: string; name: string; value: number }>;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-3 shadow-lg">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">{label}</p>
        {payload.map((entry, i) => (
          <p key={i} className="text-xs" style={{ color: entry.color }}>
            {entry.name}: {typeof entry.value === 'number' && entry.value > 1000
              ? `$${(entry.value / 1000).toFixed(0)}K`
              : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Analytics() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 space-y-6 max-w-7xl mx-auto"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Performance metrics and insights — Last 6 months
        </p>
      </motion.div>

      {/* KPI Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          const isPositive = kpi.change >= 0;
          return (
            <motion.div
              key={kpi.title}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${kpi.bg}`}>
                  <Icon className={`w-5 h-5 ${kpi.color}`} />
                </div>
                <span
                  className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                    isPositive
                      ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400'
                      : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                  }`}
                >
                  {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {Math.abs(kpi.change)}%
                </span>
              </div>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{kpi.value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{kpi.title}</p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart: Patient Admissions */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <div className="mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Patient Admissions</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Monthly admissions over last 6 months</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={admissionsData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" className="dark:stroke-gray-700" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="value"
                name="Admissions"
                stroke="url(#lineGrad)"
                strokeWidth={3}
                dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#8b5cf6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Bar Chart: Department Distribution */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <div className="mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Department Distribution</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Patients per department</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={departmentData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
              <defs>
                {departmentData.map((d) => (
                  <linearGradient key={d.name} id={`barGrad-${d.name}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={d.fill} stopOpacity={1} />
                    <stop offset="100%" stopColor={d.fill} stopOpacity={0.5} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" className="dark:stroke-gray-700" />
              <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} interval={0} angle={-25} textAnchor="end" height={45} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="patients" name="Patients" radius={[6, 6, 0, 0]}>
                {departmentData.map((entry) => (
                  <Cell key={entry.name} fill={`url(#barGrad-${entry.name})`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pie Chart: Demographics */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <div className="mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Patient Demographics</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Age group distribution</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <defs>
                {demographicsData.map((d) => (
                  <linearGradient key={d.name} id={`pieGrad-${d.name}`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={d.fill} />
                    <stop offset="100%" stopColor={d.fill} stopOpacity={0.6} />
                  </linearGradient>
                ))}
              </defs>
              <Pie
                data={demographicsData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {demographicsData.map((entry) => (
                  <Cell key={entry.name} fill={`url(#pieGrad-${entry.name})`} stroke="none" />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) =>
                  active && payload && payload.length ? (
                    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-2 shadow-lg text-xs">
                      <p className="text-gray-700 dark:text-gray-200">{payload[0].name}: {payload[0].value}</p>
                    </div>
                  ) : null
                }
              />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Area Chart: Revenue Trend */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <div className="mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Revenue vs Expenses</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Monthly financial performance</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={revenueData} margin={{ top: 5, right: 5, bottom: 5, left: -10 }}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" className="dark:stroke-gray-700" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}K`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px' }} />
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#6366f1" strokeWidth={2} fill="url(#revenueGrad)" />
              <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#ef4444" strokeWidth={2} fill="url(#expenseGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Summary Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Readmission Rate', value: '4.2%', good: true },
          { label: 'Mortality Rate', value: '1.8%', good: true },
          { label: 'Emergency Cases', value: '127', good: false },
          { label: 'Surgeries This Month', value: '89', good: true },
        ].map(({ label, value, good }) => (
          <div key={label} className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
            <p className={`text-xl font-bold ${good ? 'text-indigo-600 dark:text-indigo-400' : 'text-amber-600 dark:text-amber-400'}`}>
              {value}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{label}</p>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
