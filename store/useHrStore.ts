// store/useHrStore.ts

import { create } from 'zustand';
import { LeaveBalance, LeaveRequest, LeaveType } from '../types';
import { hrService } from '../services/hrService';

interface HrState {
  balances: LeaveBalance[];
  myRequests: LeaveRequest[];
  teamRequests: LeaveRequest[];
  loadingMyData: boolean;
  loadingTeamData: boolean;
  
  // Selectors
  getRemainingBalance: (type: LeaveType) => number;

  // Actions
  fetchMyData: (userId: string) => Promise<void>;
  fetchTeamData: (managerId: string) => Promise<void>;
  createRequest: (request: Omit<LeaveRequest, 'id' | 'status'>) => Promise<void>;
  updateRequestStatus: (requestId: string, status: 'Approved' | 'Denied') => void;
}

export const useHrStore = create<HrState>((set, get) => ({
  balances: [],
  myRequests: [],
  teamRequests: [],
  loadingMyData: false,
  loadingTeamData: false,
  
  // Selector/Getter implementation
  getRemainingBalance: (type) => {
    const balance = get().balances.find(b => b.type === type);
    return balance ? balance.days : 0;
  },

  fetchMyData: async (userId) => {
    set({ loadingMyData: true });
    try {
      const { balances, requests } = await hrService.fetchUserLeaveData(userId);
      set({ balances, myRequests: requests, loadingMyData: false });
    } catch (err) {
      console.error('Failed to fetch personal HR data:', err);
      set({ loadingMyData: false });
    }
  },

  fetchTeamData: async (managerId) => {
    set({ loadingTeamData: true });
    try {
      const requests = await hrService.fetchTeamRequests(managerId);
      set({ teamRequests: requests, loadingTeamData: false });
    } catch (err) {
      console.error('Failed to fetch team requests:', err);
      set({ loadingTeamData: false });
    }
  },

  createRequest: async (request) => {
    const requestedDays = request.days;
    const availableDays = get().getRemainingBalance(request.type);

    // CRUCIAL VALIDATION: Check balance client-side
    if (requestedDays > availableDays) {
      throw new Error(
        `Insufficient balance. Requested ${requestedDays} days, but only ${availableDays} days are available.`
      );
    }

    // Call service if validation passes
    const newRequest = await hrService.createLeaveRequest(request);

    // Optimistically update myRequests array
    set((state) => ({
      myRequests: [newRequest, ...state.myRequests],
    }));
  },

  updateRequestStatus: (requestId, status) => {
    // 1. Optimistically update the teamRequests status by removing the item
    set((state) => ({
      teamRequests: state.teamRequests.filter(r => r.id !== requestId), 
    }));

    // 2. Persist the change asynchronously
    hrService.updateRequestStatus(requestId, status).catch(error => {
        console.error('Failed to persist status update:', error);
        // NOTE: Error handling would involve re-fetching data or showing a toast
    });
  },
}));