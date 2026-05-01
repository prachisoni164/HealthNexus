import type { PatientStatus } from '../types';

interface StatusBadgeProps {
  status: PatientStatus;
  size?: 'sm' | 'md';
}

const statusConfig: Record<PatientStatus, { bg: string; text: string; dot: string }> = {
  Active: {
    bg: 'bg-emerald-100 dark:bg-emerald-900/30',
    text: 'text-emerald-700 dark:text-emerald-400',
    dot: 'bg-emerald-500',
  },
  Critical: {
    bg: 'bg-red-100 dark:bg-red-900/30',
    text: 'text-red-700 dark:text-red-400',
    dot: 'bg-red-500',
  },
  Recovered: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-700 dark:text-blue-400',
    dot: 'bg-blue-500',
  },
  Pending: {
    bg: 'bg-amber-100 dark:bg-amber-900/30',
    text: 'text-amber-700 dark:text-amber-400',
    dot: 'bg-amber-500',
  },
};

export default function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const config = statusConfig[status];
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs font-medium';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full ${sizeClasses} ${config.bg} ${config.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot} ${status === 'Critical' ? 'animate-pulse' : ''}`} />
      {status}
    </span>
  );
}
