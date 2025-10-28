// types.ts

// --- User & Auth ---
export type Permission = 
  | 'tasks.create'
  | 'crm.create'
  | 'inventory.create'
  | 'inventory.update'
  | 'inventory.stock'
  | 'hr.approve'
  | 'rota.manage';

export interface User {
  id: string;
  name: string;
  email: string;
  permissions: Permission[];
}

// --- Tasks ---
export type TaskStatus = 'To Do' | 'In Progress' | 'Done';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
}

// --- CRM ---
export interface Contact {
  id: string;
  name: string;
  email: string;
  companyId: string;
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  city: string;
}

// --- Inventory ---
export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  location: string;
  lastUpdated: string; // ISO date string
}

// --- HR ---
export type LeaveType = 'Annual' | 'Sick';

export interface LeaveBalance {
  type: LeaveType;
  days: number;
}

export interface LeaveRequest {
  id: string;
  userId: string;
  type: LeaveType;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  days: number;
  status: 'Pending' | 'Approved' | 'Denied';
}

// --- Rota ---
export type ShiftType = 'Morning' | 'Afternoon' | 'Night';

export interface Shift {
  id: string;
  userId: string;
  date: string; // YYYY-MM-DD
  type: ShiftType;
}

// --- Global ---
export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
}

export interface AuditLog {
  id: string;
  timestamp: string; // ISO date string
  user: string;
  action: string;
}
