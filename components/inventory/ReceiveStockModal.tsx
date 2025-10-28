import React, { useState } from 'react';
import { useInventoryStore } from '../../store/useInventoryStore';
import { InventoryItem } from '../../types';

interface ReceiveStockModalProps {
  item: InventoryItem;
  onClose: () => void;
}

const ReceiveStockModal: React.FC<ReceiveStockModalProps> = ({ item, onClose }) => {
  const { receiveItemStock } = useInventoryStore();
  const [amount, setAmount] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) return;
    await receiveItemStock(item.id, amount);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-xl font-bold mb-2">Receive Stock for:</h3>
        <p className="text-md mb-4 text-gray-700 dark:text-gray-300">{item.name}</p>
        <p className="text-sm mb-4">Current Quantity: {item.quantity}</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="receive-amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Amount to Add</label>
            <input
              id="receive-amount"
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              required
            />
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
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              disabled={amount <= 0}
            >
              Receive
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReceiveStockModal;
