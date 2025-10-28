// components/hr/CreateRequestModal.tsx

import React, { useState, useMemo } from 'react';
import { useHrStore } from '../../store/useHrStore';
import { useAuth } from '../../hooks/useAuth';
import { LeaveType } from '../../types';
import { calculateDaysBetween } from '../../services/hrService'; // Utility for calculation

interface CreateRequestModalProps {
  onClose: () => void;
}

const CreateRequestModal: React.FC<CreateRequestModalProps> = ({ onClose }) => {
  const { createRequest, getRemainingBalance } = useHrStore();
  const { currentUser } = useAuth();
  
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [type, setType] = useState<LeaveType>('Annual');
  const [error, setError] = useState('');
  
  const requestedDays = useMemo(() => calculateDaysBetween(startDate, endDate), [startDate, endDate]);
  const availableDays = getRemainingBalance(type);
  const isBalanceSufficient = requestedDays > 0 && requestedDays <= availableDays;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isBalanceSufficient) {
      setError('Error: Requested days exceed available balance.');
      return;
    }

    try {
      await createRequest({
        userId: currentUser.id,
        startDate,
        endDate,
        days: requestedDays,
        type,
      });
      onClose();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMessage);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md shadow-xl" onClick={e => e.stopPropagation()}>
        <h3 className="text-xl font-bold mb-4">Request Time Off</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
              <label className="block text-sm font-medium">Start Date:</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"/>
          </div>
          <div>
              <label className="block text-sm font-medium">End Date:</label>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"/>
          </div>
          <div>
              <label className="block text-sm font-medium">Leave Type:</label>
              <select value={type} onChange={(e) => setType(e.target.value as LeaveType)} className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                <option value="Annual">Annual</option>
                <option value="Sick">Sick</option>
              </select>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-sm space-y-1">
            <p>Requested Days: <span className="font-bold">{requestedDays}</span></p>
            <p>Available Balance ({type}): <span className="font-bold">{availableDays}</span></p>
          </div>
          
          {error && <p className="text-red-600 text-sm font-semibold">{error}</p>}
          {!isBalanceSufficient && requestedDays > 0 && <p className="text-yellow-600 text-sm font-semibold">Insufficient balance for this request.</p>}
          
          <div className="flex justify-end space-x-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500">Cancel</button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
              disabled={!isBalanceSufficient}
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRequestModal;