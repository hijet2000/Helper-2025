// components/hr/TeamRequests.tsx

import React, { useEffect, useMemo } from 'react';
import { useHrStore } from '../../store/useHrStore';
import { useAuth } from '../../hooks/useAuth';
import { MOCK_USERS } from '../../data/mockData';

const TeamRequests: React.FC = () => {
  const { currentUser } = useAuth();
  const { teamRequests, loadingTeamData, fetchTeamData, updateRequestStatus } = useHrStore();

  useEffect(() => {
    if (currentUser) {
        fetchTeamData(currentUser.id);
    }
  }, [fetchTeamData, currentUser]);
  
  const userMap = useMemo(() => 
    MOCK_USERS.reduce((acc, user) => {
        acc[user.id] = user.name;
        return acc;
    }, {} as Record<string, string>), 
  []);

  if (loadingTeamData) {
    return <p className="text-gray-500 dark:text-gray-400">Loading team requests...</p>;
  }
  
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Pending Team Requests</h2>
      {teamRequests.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No pending requests require your approval.</p>
      ) : (
        teamRequests.map((req) => (
          <div key={req.id} className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg border-l-4 border-yellow-500">
            <p className="font-bold">{userMap[req.userId] || 'Unknown User'}</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {req.type} Leave: {req.startDate} to {req.endDate} ({req.days} days)
            </p>
            <div className="mt-3 space-x-2">
              <button
                onClick={() => updateRequestStatus(req.id, 'Approved')}
                className="px-3 py-1 text-sm bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Approve
              </button>
              <button
                onClick={() => updateRequestStatus(req.id, 'Denied')}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Deny
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TeamRequests;