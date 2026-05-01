import { motion } from 'framer-motion';
import { Construction } from 'lucide-react';

export default function Placeholder({ title }: { title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center h-full p-12 text-center"
    >
      <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white mb-6 shadow-glow">
        <Construction className="w-10 h-10" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{title}</h2>
      <p className="text-gray-500 dark:text-gray-400 max-w-sm">
        This section is coming soon. Check back later for updates.
      </p>
    </motion.div>
  );
}
