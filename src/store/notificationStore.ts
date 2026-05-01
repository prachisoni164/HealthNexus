import { create } from 'zustand';
import type { Notification } from '../types';
import { mockNotifications } from '../utils/mockData';

interface NotificationState {
  notifications: Notification[];
  swEnabled: boolean;
  notificationBannerDismissed: boolean;
  addNotification: (n: Notification) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  dismissBanner: () => void;
  setSwEnabled: (val: boolean) => void;
  unreadCount: () => number;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: mockNotifications,
  swEnabled: false,
  notificationBannerDismissed: false,

  addNotification: (n) =>
    set((state) => ({ notifications: [n, ...state.notifications] })),

  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),

  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),

  dismissBanner: () => set({ notificationBannerDismissed: true }),

  setSwEnabled: (val) => set({ swEnabled: val }),

  unreadCount: () => get().notifications.filter((n) => !n.read).length,
}));
