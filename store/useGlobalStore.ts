// store/useGlobalStore.ts
import { create } from 'zustand';
import { Notification, AuditLog } from '../types';
import { MOCK_AUDIT_LOGS } from '../data/mockData';

interface GlobalState {
  notifications: Notification[];
  auditLogs: AuditLog[];
  fetchLogs: () => void;
  markNotificationAsRead: (id: string) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'read'>) => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  notifications: [
    { id: 'n1', message: 'Q3 budget review is due next week.', type: 'info', read: false },
    { id: 'n2', message: 'New inventory items received successfully.', type: 'success', read: true },
    { id: 'n3', message: 'Team request from Bob Staff needs approval.', type: 'warning', read: false },
  ],
  auditLogs: [],

  fetchLogs: () => {
    console.log('Global Store: Fetching audit logs.');
    // Simulate API call
    setTimeout(() => {
        set({ auditLogs: MOCK_AUDIT_LOGS });
    }, 500);
  },
  
  markNotificationAsRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map(n => 
        n.id === id ? { ...n, read: true } : n
      ),
    }));
  },

  addNotification: (notification) => {
    set((state) => ({
        notifications: [
            { ...notification, id: `n${Date.now()}`, read: false},
            ...state.notifications,
        ],
    }));
  },
}));
