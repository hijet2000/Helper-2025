import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import MyTimeOff from '../components/hr/MyTimeOff';
import TeamRequests from '../components/hr/TeamRequests';

type HrTab = 'My Time Off' | 'Team Requests';

const HrPage: React.FC = () => {
  const { hasPermission } = useAuth();
  
  const canApprove = hasPermission('hr.approve');
  
  const [activeTab, setActiveTab] = useState<HrTab>('My Time Off');

  const tabs: HrTab[] = ['My Time Off'];
  if (canApprove) {
    tabs.push('Team Requests');
  }

  return (
    <div className="p-6 h-full flex flex-col">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">HR & Time Off</h1>

      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
            {tabs.map((tab) => (
            <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-200 dark:hover:border-gray-600'
                }`}
            >
                {tab}
            </button>
            ))}
        </nav>
      </div>

      <div className="flex-1 overflow-y-auto">
        {activeTab === 'My Time Off' && <MyTimeOff />}
        {activeTab === 'Team Requests' && canApprove && <TeamRequests />}
      </div>
    </div>
  );
};

export default HrPage;