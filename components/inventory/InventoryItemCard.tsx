import React from 'react';
import { InventoryItem } from '../../types';
import { useAuth } from '../../hooks/useAuth';

interface InventoryItemCardProps {
  item: InventoryItem;
  onReceive: (item: InventoryItem) => void;
  onAdjust: (item: InventoryItem) => void;
  onUpdate: (item: InventoryItem) => void;
}

const InventoryItemCard: React.FC<InventoryItemCardProps> = ({ item, onReceive, onAdjust, onUpdate }) => {
  const { hasPermission } = useAuth();
  const canUpdateStock = hasPermission('inventory.stock');
  const canUpdateItem = hasPermission('inventory.update');

  const getQuantityColor = (quantity: number) => {
    if (quantity < 20) return 'text-red-500 dark:text-red-400';
    if (quantity < 100) return 'text-yellow-500 dark:text-yellow-400';
    return 'text-green-500 dark:text-green-400';
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 border dark:border-gray-700 rounded-lg shadow-sm transition-all hover:shadow-md">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold text-lg text-gray-800 dark:text-white">{item.name}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">SKU: {item.sku}</p>
        </div>
        <div className="text-right shrink-0 ml-2">
          <p className={`font-bold text-2xl ${getQuantityColor(item.quantity)}`}>{item.quantity}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">in stock</p>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t dark:border-gray-700 text-sm text-gray-600 dark:text-gray-300">
        <p><strong>Location:</strong> {item.location}</p>
        <p className="text-xs mt-1 text-gray-400">Last Updated: {new Date(item.lastUpdated).toLocaleString()}</p>
      </div>
      <div className="flex justify-end space-x-2 mt-4">
        {canUpdateStock && (
            <>
                <button 
                    onClick={() => onReceive(item)}
                    className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-700"
                >
                    Receive
                </button>
                <button 
                    onClick={() => onAdjust(item)}
                    className="px-3 py-1 text-xs font-medium text-white bg-yellow-500 rounded hover:bg-yellow-600"
                >
                    Adjust
                </button>
            </>
        )}
        {canUpdateItem && (
             <button 
                onClick={() => onUpdate(item)}
                className="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
            >
                Edit
            </button>
        )}
      </div>
    </div>
  );
};

export default InventoryItemCard;
