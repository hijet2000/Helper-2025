// data/mockData.ts
import { User, Task, Contact, Company, InventoryItem, LeaveBalance, LeaveRequest, Shift, AuditLog } from '../types';

// --- Users ---
export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Alice Manager', email: 'alice@example.com', permissions: ['tasks.create', 'crm.create', 'inventory.create', 'inventory.update', 'inventory.stock', 'hr.approve', 'rota.manage'] },
  { id: 'u2', name: 'Bob Staff', email: 'bob@example.com', permissions: ['tasks.create'] },
  { id: 'u3', name: 'Charlie HR', email: 'charlie@example.com', permissions: ['hr.approve'] },
  { id: 'u4', name: 'David Warehouse', email: 'david@example.com', permissions: ['inventory.stock'] },
];

// --- Tasks ---
export let MOCK_TASKS: Task[] = [
  { id: 't1', title: 'Review Q3 budget proposals', status: 'To Do' },
  { id: 't2', title: 'Develop new marketing campaign', status: 'In Progress' },
  { id: 't3', title: 'Onboard new junior developer', status: 'In Progress' },
  { id: 't4', title: 'Finalize project documentation', status: 'Done' },
  { id: 't5', title: 'Plan team offsite event', status: 'To Do' },
];

// --- CRM ---
export const MOCK_COMPANIES: Company[] = [
  { id: 'c1', name: 'Innovate Corp', industry: 'Technology', city: 'San Francisco' },
  { id: 'c2', name: 'Data Solutions Ltd', industry: 'Analytics', city: 'New York' },
  { id: 'c3', name: 'Creative Minds Inc', industry: 'Marketing', city: 'Los Angeles' },
];

export const MOCK_CONTACTS: Contact[] = [
  { id: 'ct1', name: 'John Doe', email: 'john.doe@innovate.com', companyId: 'c1' },
  { id: 'ct2', name: 'Jane Smith', email: 'jane.s@datasolutions.com', companyId: 'c2' },
  { id: 'ct3', name: 'Peter Jones', email: 'peter@innovate.com', companyId: 'c1' },
];

// --- Inventory ---
export let MOCK_INVENTORY_ITEMS: InventoryItem[] = [
  { id: 'inv1', name: 'Wireless Mouse', sku: 'HW-MSE-001', quantity: 150, location: 'Aisle 3, Shelf B', lastUpdated: new Date().toISOString() },
  { id: 'inv2', name: 'Mechanical Keyboard', sku: 'HW-KBD-004', quantity: 75, location: 'Aisle 3, Shelf C', lastUpdated: new Date().toISOString() },
  { id: 'inv3', name: '27" 4K Monitor', sku: 'HW-MON-007', quantity: 15, location: 'Aisle 1, Shelf A', lastUpdated: new Date().toISOString() },
  { id: 'inv4', name: 'USB-C Hub', sku: 'HW-ACC-012', quantity: 200, location: 'Aisle 5, Shelf D', lastUpdated: new Date().toISOString() },
];

// --- HR ---
export const MOCK_LEAVE_BALANCES: Record<string, LeaveBalance[]> = {
  u1: [{ type: 'Annual', days: 25 }, { type: 'Sick', days: 10 }],
  u2: [{ type: 'Annual', days: 20 }, { type: 'Sick', days: 10 }],
  u3: [{ type: 'Annual', days: 22 }, { type: 'Sick', days: 10 }],
  u4: [{ type: 'Annual', days: 18 }, { type: 'Sick', days: 10 }],
};

export let MOCK_LEAVE_REQUESTS: LeaveRequest[] = [
  { id: 'lr1', userId: 'u2', type: 'Annual', startDate: '2024-08-01', endDate: '2024-08-05', days: 5, status: 'Pending' },
  { id: 'lr2', userId: 'u4', type: 'Sick', startDate: '2024-07-20', endDate: '2024-07-20', days: 1, status: 'Pending' },
  { id: 'lr3', userId: 'u1', type: 'Annual', startDate: '2024-07-10', endDate: '2024-07-12', days: 3, status: 'Approved' },
];

// --- Rota ---
export let MOCK_SHIFTS: Shift[] = [
  { id: 's1', userId: 'u2', date: '2024-07-29', type: 'Morning' },
  { id: 's2', userId: 'u4', date: '2024-07-29', type: 'Afternoon' },
  { id: 's3', userId: 'u1', date: '2024-07-30', type: 'Morning' },
];

// --- Audit ---
export const MOCK_AUDIT_LOGS: AuditLog[] = [
    { id: 'al1', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), user: 'Alice Manager', action: 'Approved leave request for Bob Staff' },
    { id: 'al2', timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(), user: 'David Warehouse', action: 'Adjusted stock for "Wireless Mouse" to 150' },
    { id: 'al3', timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), user: 'Alice Manager', action: 'Created new contact "Peter Jones"' },
];
