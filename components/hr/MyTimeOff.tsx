// components/hr/MyTimeOff.tsx

import React, { useEffect, useState } from 'react';
import { useHrStore } from '../../store/useHrStore';
import { useAuth } from '../../hooks/useAuth';
import CreateRequestModal from './CreateRequestModal';

const MyTimeOff: React.FC = () => {
  const { currentUser } = useAuth();
  const { balances, myRequests, loadingMyData, fetchMyData } = useHrStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (currentUser) {
      fetchMyData(currentUser.id);
    }
  }, [fetchMyData, currentUser]);

  if (loadingMyData) {
    return <p className="text-gray-500 dark:text-gray-400">Loading personal time off data...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">My Leave Balances</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Request Time Off
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {balances.map((b) => (
          <div key={b.type} className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg border-l-4 border-teal-500">
            <p className="text-sm text-gray-500 dark:text-gray-400">{b.type} Leave</p>
            <p className="text-3xl font-bold mt-1">{b.days}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">days remaining</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mt-8">Request History</h2>
      <div className="space-y-3">
        {myRequests.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No past requests found.</p>
        ) : (
          myRequests.map((req) => (
            <div key={req.id} className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg flex justify-between items-center">
              <div>
                <p className="font-medium">{req.startDate} to {req.endDate} ({req.days} days)</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{req.type} Leave</p>
              </div>
              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  req.status === 'Approved' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 
                  req.status === 'Denied' ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' : 
                  'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
              }`}>
                {req.status}
              </span>
            </div>
          ))
        )}
      </div>

      {isModalOpen && <CreateRequestModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default MyTimeOff;