import { InventoryItem } from '../types';
import { MOCK_INVENTORY_ITEMS } from '../data/mockData';

const NETWORK_DELAY = 400; // ms
const PERSIST_DELAY = 250; // ms

export const inventoryService = {
  fetchItems(): Promise<InventoryItem[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Inventory Service: Items fetched.');
        resolve(JSON.parse(JSON.stringify(MOCK_INVENTORY_ITEMS)));
      }, NETWORK_DELAY);
    });
  },

  createItem(itemData: Omit<InventoryItem, 'id' | 'lastUpdated'>): Promise<InventoryItem> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newItem: InventoryItem = {
          ...itemData,
          id: `inv${Date.now()}`,
          lastUpdated: new Date().toISOString(),
        };
        MOCK_INVENTORY_ITEMS.unshift(newItem);
        console.log(`Inventory Service: New item created: ${newItem.name}`);
        resolve(newItem);
      }, PERSIST_DELAY);
    });
  },

  updateItem(itemId: string, itemData: Partial<Omit<InventoryItem, 'id' | 'quantity' | 'lastUpdated'>>): Promise<InventoryItem> {
     return new Promise((resolve, reject) => {
      setTimeout(() => {
        const itemIndex = MOCK_INVENTORY_ITEMS.findIndex(i => i.id === itemId);
        if (itemIndex === -1) {
            return reject(new Error("Item not found"));
        }
        const updatedItem = {
            ...MOCK_INVENTORY_ITEMS[itemIndex],
            ...itemData,
            lastUpdated: new Date().toISOString(),
        };
        MOCK_INVENTORY_ITEMS[itemIndex] = updatedItem;
        console.log(`Inventory Service: Item updated: ${updatedItem.name}`);
        resolve(updatedItem);
      }, PERSIST_DELAY);
    });
  },
  
  receiveStock(itemId: string, amount: number): Promise<InventoryItem> {
     return new Promise((resolve, reject) => {
        setTimeout(() => {
            const item = MOCK_INVENTORY_ITEMS.find(i => i.id === itemId);
            if (!item) return reject(new Error('Item not found'));
            item.quantity += amount;
            item.lastUpdated = new Date().toISOString();
            console.log(`Inventory Service: Received ${amount} for ${item.name}. New quantity: ${item.quantity}`);
            resolve({...item});
        }, PERSIST_DELAY);
     });
  },

  adjustStock(itemId: string, newQuantity: number): Promise<InventoryItem> {
     return new Promise((resolve, reject) => {
        setTimeout(() => {
            const item = MOCK_INVENTORY_ITEMS.find(i => i.id === itemId);
            if (!item) return reject(new Error('Item not found'));
            item.quantity = newQuantity;
            item.lastUpdated = new Date().toISOString();
            console.log(`Inventory Service: Adjusted stock for ${item.name}. New quantity: ${item.quantity}`);
            resolve({...item});
        }, PERSIST_DELAY);
     });
  }
};
