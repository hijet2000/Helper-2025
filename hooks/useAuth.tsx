// hooks/useAuth.tsx
import React, { createContext, useContext, useState, useMemo } from 'react';
import { User, Permission } from '../types';
import { MOCK_USERS } from '../data/mockData';

interface AuthContextType {
  currentUser: User;
  users: User[];
  login: (userId: string) => void;
  hasPermission: (permission: Permission) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUserId, setCurrentUserId] = useState<string>(MOCK_USERS[0].id);

  const currentUser = useMemo(() => 
    MOCK_USERS.find(u => u.id === currentUserId) || MOCK_USERS[0], 
    [currentUserId]
  );

  const hasPermission = (permission: Permission): boolean => {
    return currentUser.permissions.includes(permission);
  };

  const login = (userId: string) => {
    if (MOCK_USERS.some(u => u.id === userId)) {
        setCurrentUserId(userId);
    }
  };

  const value = {
    currentUser,
    users: MOCK_USERS,
    login,
    hasPermission,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
