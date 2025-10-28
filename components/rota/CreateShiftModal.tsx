import React, { useState } from 'react';
import { useRotaStore } from '../../store/useRotaStore';
import { ShiftType } from '../../types';
import { MOCK_USERS } from '../../data/mockData';

interface CreateShiftModalProps {
  onClose: () => void;
  date: string; // The date for which the shift is being created
}

const CreateShiftModal: React.FC<CreateShiftModalProps> = ({ onClose, date }) => {
  const { addShift } = useRotaStore();
  
  const [userId, setUserId] = useState(MOCK_USERS[0]?.id || '');
  const [type, setType] = useState<ShiftType>('Morning');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !type || !date) return;

    await addShift({ userId, date, type });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-xl font-bold mb-4">Add Shift for {date}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="shift-user" className="block text-sm font-medium text-gray-700 dark:text-gray-300">User</label>
            <select
              id="shift-user"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              required
            >
              <option value="" disabled>Select a user</option>
              {MOCK_USERS.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="shift-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Shift Type</label>
            <select
              id="shift-type"
              value={type}
              onChange={(e) => setType(e.target.value as ShiftType)}
              className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              required
            >
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
              <option value="Night">Night</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Shift
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateShiftModal;
