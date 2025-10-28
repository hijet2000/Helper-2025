import { create } from 'zustand';
import { Shift } from '../types';
import { rotaService } from '../services/rotaService';

interface RotaState {
  shifts: Shift[];
  loading: boolean;
  error: string | null;
  fetchShifts: () => Promise<void>;
  addShift: (shiftData: Omit<Shift, 'id'>) => Promise<void>;
  removeShift: (shiftId: string) => Promise<void>;
}

export const useRotaStore = create<RotaState>((set) => ({
  shifts: [],
  loading: false,
  error: null,

  fetchShifts: async () => {
    set({ loading: true, error: null });
    try {
      const fetchedShifts = await rotaService.fetchShifts();
      set({ shifts: fetchedShifts, loading: false });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch shifts';
      set({ error: errorMessage, loading: false });
      console.error(err);
    }
  },

  addShift: async (shiftData) => {
    try {
      const newShift = await rotaService.createShift(shiftData);
      set((state) => ({
        shifts: [...state.shifts, newShift],
      }));
    } catch (error) {
      console.error('Error creating shift:', error);
    }
  },

  removeShift: async (shiftId) => {
    // Optimistically remove from UI
    set((state) => ({
      shifts: state.shifts.filter((shift) => shift.id !== shiftId),
    }));
    try {
      await rotaService.deleteShift(shiftId);
    } catch (error) {
      console.error('Error deleting shift:', error);
      // In a real app, you would revert the state here by re-fetching.
      const store = useRotaStore.getState();
      store.fetchShifts();
    }
  },
}));
