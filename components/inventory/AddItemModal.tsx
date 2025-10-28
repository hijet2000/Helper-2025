import React, { useState } from 'react';
import { useInventoryStore } from '../../store/useInventoryStore';

interface AddItemModalProps {
  onClose: () => void;
}

const AddItemModal: React.FC<AddItemModalProps> = ({ onClose }) => {
  const { addItem } = useInventoryStore();
  
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [location, setLocation] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !sku || !location || quantity < 0) return;

    await addItem({ name, sku, quantity, location });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-xl font-bold mb-4">Add New Inventory Item</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="item-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Item Name</label>
            <input
              id="item-name" type="text" value={name} onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" required
            />
          </div>
          <div>
            <label htmlFor="item-sku" className="block text-sm font-medium text-gray-700 dark:text-gray-300">SKU</label>
            <input
              id="item-sku" type="text" value={sku} onChange={(e) => setSku(e.target.value)}
              className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" required
            />
          </div>
          <div>
            <label htmlFor="item-quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Initial Quantity</label>
            <input
              id="item-quantity" type="number" min="0" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}
              className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" required
            />
          </div>
           <div>
            <label htmlFor="item-location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
            <input
              id="item-location" type="text" value={location} onChange={(e) => setLocation(e.target.value)}
              className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" required
            />
          </div>
          <div className="flex justify-end space-x-3 pt-2">
            <button type="button" onClick={onClose}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              disabled={!name || !sku || !location || quantity < 0}>
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemModal;
