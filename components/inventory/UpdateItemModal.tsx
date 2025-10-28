import React, { useState } from 'react';
import { useInventoryStore } from '../../store/useInventoryStore';
import { InventoryItem } from '../../types';

interface UpdateItemModalProps {
  item: InventoryItem;
  onClose: () => void;
}

const UpdateItemModal: React.FC<UpdateItemModalProps> = ({ item, onClose }) => {
  const { updateItem } = useInventoryStore();
  
  const [name, setName] = useState(item.name);
  const [sku, setSku] = useState(item.sku);
  const [location, setLocation] = useState(item.location);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !sku || !location) return;
    
    // Only send fields that have changed
    const updatedData: Partial<Omit<InventoryItem, 'id' | 'quantity' | 'lastUpdated'>> = {};
    if (name !== item.name) updatedData.name = name;
    if (sku !== item.sku) updatedData.sku = sku;
    if (location !== item.location) updatedData.location = location;

    if (Object.keys(updatedData).length > 0) {
        await updateItem(item.id, updatedData);
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-xl font-bold mb-4">Update Item Details</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="update-item-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Item Name</label>
            <input
              id="update-item-name" type="text" value={name} onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" required
            />
          </div>
          <div>
            <label htmlFor="update-item-sku" className="block text-sm font-medium text-gray-700 dark:text-gray-300">SKU</label>
            <input
              id="update-item-sku" type="text" value={sku} onChange={(e) => setSku(e.target.value)}
              className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" required
            />
          </div>
           <div>
            <label htmlFor="update-item-location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
            <input
              id="update-item-location" type="text" value={location} onChange={(e) => setLocation(e.target.value)}
              className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" required
            />
          </div>
          <div className="flex justify-end space-x-3 pt-2">
            <button type="button" onClick={onClose}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              disabled={!name || !sku || !location || (name === item.name && sku === item.sku && location === item.location)}>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateItemModal;
