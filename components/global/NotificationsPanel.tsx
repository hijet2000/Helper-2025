// components/global/NotificationsPanel.tsx
import React, { useState } from 'react';
import { useGlobalStore } from '../../store/useGlobalStore';

const BellIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
);

const NotificationsPanel: React.FC = () => {
  const { notifications, markNotificationAsRead } = useGlobalStore();
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
        <BellIcon className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-xl z-20">
          <div className="p-3 font-semibold border-b dark:border-gray-700">Notifications</div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
                notifications.map(n => (
                    <div 
                        key={n.id} 
                        className={`p-3 border-b dark:border-gray-700/50 cursor-pointer ${n.read ? 'opacity-60' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                        onClick={() => !n.read && markNotificationAsRead(n.id)}
                    >
                        <p className="text-sm">{n.message}</p>
                    </div>
                ))
            ) : (
                <p className="p-4 text-sm text-gray-500">No new notifications.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsPanel;
