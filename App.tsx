// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import CrmPage from './pages/CrmPage';
import TaskPage from './pages/TaskPage';
import InventoryPage from './pages/InventoryPage';
import HrPage from './pages/HrPage';
import RotaPage from './pages/RotaPage';
import AuditLogPage from './pages/AuditLogPage';
import NotificationsPanel from './components/global/NotificationsPanel';

const AppContent: React.FC = () => {
    const { users, currentUser, login } = useAuth();

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <Sidebar />
            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
                    <h1 className="text-xl font-semibold">BizNexus ERP</h1>
                    <div className="flex items-center space-x-4">
                        <NotificationsPanel />
                        <div className="relative">
                             <select
                                value={currentUser.id}
                                onChange={(e) => login(e.target.value)}
                                className="p-2 rounded-md bg-gray-200 dark:bg-gray-700"
                            >
                                {users.map(user => (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                ))}
                            </select>
                            <div className="text-xs text-right text-gray-500">Switch User</div>
                        </div>
                    </div>
                </header>
                <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/crm" element={<CrmPage />} />
                        <Route path="/tasks" element={<TaskPage />} />
                        <Route path="/inventory" element={<InventoryPage />} />
                        <Route path="/hr" element={<HrPage />} />
                        <Route path="/rota" element={<RotaPage />} />
                        <Route path="/audit" element={<AuditLogPage />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </div>
            </main>
        </div>
    );
};


const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
          <AppContent />
      </AuthProvider>
    </Router>
  );
};

export default App;
