import { Shift } from '../types';
import { MOCK_SHIFTS } from '../data/mockData';

const NETWORK_DELAY = 300; // ms
const PERSIST_DELAY = 200; // ms

export const rotaService = {
  /**
   * Simulates fetching shifts for a given date range (e.g., a week).
   * For simplicity, we'll just return all shifts.
   */
  fetchShifts(): Promise<Shift[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Rota Service: Shifts fetched.');
        // Return a copy to prevent direct mutation of mock data
        resolve(JSON.parse(JSON.stringify(MOCK_SHIFTS)));
      }, NETWORK_DELAY);
    });
  },

  /**
   * Simulates creating a new shift.
   */
  createShift(shiftData: Omit<Shift, 'id'>): Promise<Shift> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newShift: Shift = {
          ...shiftData,
          id: `s${Date.now()}`,
        };
        MOCK_SHIFTS.unshift(newShift);
        console.log(`Rota Service: New shift created for user ${shiftData.userId} on ${shiftData.date}.`);
        resolve(newShift);
      }, PERSIST_DELAY);
    });
  },

  /**
   * Simulates deleting a shift.
   */
  deleteShift(shiftId: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = MOCK_SHIFTS.findIndex(s => s.id === shiftId);
        if (index > -1) {
          MOCK_SHIFTS.splice(index, 1);
        }
        console.log(`Rota Service: Shift ${shiftId} deleted.`);
        resolve();
      }, PERSIST_DELAY);
    });
  },
};
