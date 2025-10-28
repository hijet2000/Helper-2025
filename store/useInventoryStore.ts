import { create } from 'zustand';
import { InventoryItem } from '../types';
import { inventoryService } from '../services/inventoryService';
import { withAsyncStateHandling } from '../utils/zustandUtils';

interface InventoryState {
  items: InventoryItem[];
  loadingInventory: boolean;
  errorInventory: string | null;
  fetchItems: () => Promise<void>;
  addItem: (itemData: Omit<InventoryItem, 'id' | 'lastUpdated'>) => Promise<void>;
  updateItem: (itemId: string, itemData: Partial<Omit<InventoryItem, 'id' | 'quantity' | 'lastUpdated'>>) => Promise<void>;
  receiveItemStock: (itemId: string, amount: number) => Promise<void>;
  adjustItemStock: (itemId: string, newQuantity: number) => Promise<void>;
}

export const useInventoryStore = create<InventoryState>((set) => ({
  items: [],
  loadingInventory: false,
  errorInventory: null,

  fetchItems: () => 
    withAsyncStateHandling(set, 'loadingInventory', 'errorInventory', async () => {
      const fetchedItems = await inventoryService.fetchItems();
      set({ items: fetchedItems });
    }),

  addItem: async (itemData) => {
    try {
      const newItem = await inventoryService.createItem(itemData);
      set((state) => ({
        items: [newItem, ...state.items],
      }));
    } catch (error) {
      console.error('Error creating item:', error);
    }
  },

  updateItem: async (itemId, itemData) => {
     try {
      const updatedItem = await inventoryService.updateItem(itemId, itemData);
      set((state) => ({
        items: state.items.map((item) =>
          item.id === itemId ? updatedItem : item
        ),
      }));
    } catch (error) {
      console.error('Error updating item:', error);
    }
  },

  receiveItemStock: async (itemId, amount) => {
    try {
      const updatedItem = await inventoryService.receiveStock(itemId, amount);
       set((state) => ({
        items: state.items.map((item) =>
          item.id === itemId ? { ...item, quantity: updatedItem.quantity, lastUpdated: updatedItem.lastUpdated } : item
        ),
      }));
    } catch (error) {
      console.error('Error receiving stock:', error);
    }
  },
  
  adjustItemStock: async (itemId, newQuantity) => {
    try {
        const updatedItem = await inventoryService.adjustStock(itemId, newQuantity);
        set((state) => ({
            items: state.items.map((item) =>
            item.id === itemId ? { ...item, quantity: updatedItem.quantity, lastUpdated: updatedItem.lastUpdated } : item
            ),
        }));
    } catch (error) {
        console.error('Error adjusting stock:', error);
    }
  },
}));
