import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, CheckCircle } from 'lucide-react';
import { useNotificationStore } from '../store/notificationStore';

export default function NotificationBanner() {
  const { swEnabled, notificationBannerDismissed, dismissBanner } = useNotificationStore();

  if (notificationBannerDismissed) return null;

  return (
    <AnimatePresence>
      {!swEnabled && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="relative flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm"
        >
          <Bell className="w-4 h-4 flex-shrink-0 animate-pulse" />
          <span className="flex-1">
            Enable push notifications to stay updated on critical patient alerts and appointments.
          </span>
          <button
            onClick={() => {
              if ('Notification' in window) {
                Notification.requestPermission().then((perm) => {
                  if (perm === 'granted') {
                    useNotificationStore.getState().setSwEnabled(true);
                  }
                });
              }
              dismissBanner();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors font-medium text-xs"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            Enable
          </button>
          <button
            onClick={dismissBanner}
            className="p-1 rounded hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
