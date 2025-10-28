// services/hrService.ts
import { LeaveBalance, LeaveRequest } from '../types';
import { MOCK_LEAVE_BALANCES, MOCK_LEAVE_REQUESTS } from '../data/mockData';

const NETWORK_DELAY = 300; // ms
const PERSIST_DELAY = 200; // ms

interface UserLeaveData {
    balances: LeaveBalance[];
    requests: LeaveRequest[];
}

export const hrService = {
  fetchUserLeaveData(userId: string): Promise<UserLeaveData> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const balances = MOCK_LEAVE_BALANCES[userId] || [];
        const requests = MOCK_LEAVE_REQUESTS.filter(r => r.userId === userId);
        console.log(`HR Service: Fetched data for user ${userId}.`);
        resolve({ balances, requests });
      }, NETWORK_DELAY);
    });
  },

  fetchTeamRequests(managerId: string): Promise<LeaveRequest[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real app, this would check manager-employee relationships.
        // For this demo, we'll return all pending requests not made by the manager.
        const requests = MOCK_LEAVE_REQUESTS.filter(r => r.status === 'Pending' && r.userId !== managerId);
        console.log(`HR Service: Fetched team requests for manager ${managerId}.`);
        resolve(requests);
      }, NETWORK_DELAY);
    });
  },
  
  createLeaveRequest(request: Omit<LeaveRequest, 'id' | 'status'>): Promise<LeaveRequest> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newRequest: LeaveRequest = {
                ...request,
                id: `lr${Date.now()}`,
                status: 'Pending',
            };
            MOCK_LEAVE_REQUESTS.unshift(newRequest);
            console.log(`HR Service: Created new leave request ${newRequest.id}`);
            resolve(newRequest);
        }, PERSIST_DELAY);
    });
  },

  updateRequestStatus(requestId: string, status: 'Approved' | 'Denied'): Promise<void> {
    return new Promise(resolve => {
        setTimeout(() => {
            const request = MOCK_LEAVE_REQUESTS.find(r => r.id === requestId);
            if (request) {
                request.status = status;
                console.log(`HR Service: Updated request ${requestId} to ${status}`);
            }
            resolve();
        }, PERSIST_DELAY);
    });
  },
};

/**
 * Utility to calculate business days between two dates.
 * Simple implementation for demo purposes.
 */
export const calculateDaysBetween = (start: string, end: string): number => {
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    if (endDate < startDate) return 0;
    
    // Add 1 to include the end date
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
};
