// pages/AuditLogPage.tsx
import React, { useEffect } from 'react';
import { useGlobalStore } from '../store/useGlobalStore';

const AuditLogPage: React.FC = () => {
    const { auditLogs, fetchLogs } = useGlobalStore();

    useEffect(() => {
        fetchLogs();
    }, [fetchLogs]);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Audit Log</h1>
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Timestamp</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">User</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {auditLogs.map(log => (
                            <tr key={log.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                    {new Date(log.timestamp).toLocaleString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                    {log.user}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                    {log.action}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {auditLogs.length === 0 && <p className="p-4 text-center text-gray-500">No audit logs found.</p>}
            </div>
        </div>
    );
};

export default AuditLogPage;
