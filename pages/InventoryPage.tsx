import React, { useEffect, useState } from 'react';
import { useInventoryStore } from '../store/useInventoryStore';
import { useAuth } from '../hooks/useAuth';
import { InventoryItem } from '../types';
import InventoryItemCard from '../components/inventory/InventoryItemCard';
import ReceiveStockModal from '../components/inventory/ReceiveStockModal';
import AdjustStockModal from '../components/inventory/AdjustStockModal';
import AddItemModal from '../components/inventory/AddItemModal';
import UpdateItemModal from '../components/inventory/UpdateItemModal';

const InventoryPage: React.FC = () => {
  const { items, loading, error, fetchItems } = useInventoryStore();
  const { hasPermission } = useAuth();
  
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [receiveModalItem, setReceiveModalItem] = useState<InventoryItem | null>(null);
  const [adjustModalItem, setAdjustModalItem] = useState<InventoryItem | null>(null);
  const [updateModalItem, setUpdateModalItem] = useState<InventoryItem | null>(null);

  const canCreateItem = hasPermission('inventory.create');

  useEffect(() => {
    // Only fetch if items are not already loaded
    if (items.length === 0) {
      fetchItems();
    }
  }, [fetchItems, items.length]);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center h-full">
        <div className="flex items-center space-x-2 text-blue-500">
           <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Loading Inventory...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="p-8 text-red-500 text-center">Error: {error}</div>;
  }

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Inventory Management</h1>
        {canCreateItem && (
          <button
            onClick={() => setIsAddItemModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            <span>Add New Item</span>
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto pr-2">
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item) => (
                <InventoryItemCard 
                    key={item.id} 
                    item={item}
                    onReceive={setReceiveModalItem}
                    onAdjust={setAdjustModalItem}
                    onUpdate={setUpdateModalItem}
                />
            ))}
        </div>
      </div>
      
      {isAddItemModalOpen && <AddItemModal onClose={() => setIsAddItemModalOpen(false)} />}
      {receiveModalItem && <ReceiveStockModal item={receiveModalItem} onClose={() => setReceiveModalItem(null)} />}
      {adjustModalItem && <AdjustStockModal item={adjustModalItem} onClose={() => setAdjustModalItem(null)} />}
      {updateModalItem && <UpdateItemModal item={updateModalItem} onClose={() => setUpdateModalItem(null)} />}

    </div>
  );
};

export default InventoryPage;
