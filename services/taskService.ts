// services/taskService.ts
import { Task, TaskStatus } from '../types';
import { MOCK_TASKS } from '../data/mockData';

const NETWORK_DELAY = 500; // ms

export const taskService = {
  /**
   * Simulates fetching all tasks.
   */
  fetchTasks(): Promise<Task[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Task Service: Tasks fetched.');
        // Return a copy to prevent direct mutation of mock data
        resolve(JSON.parse(JSON.stringify(MOCK_TASKS)));
      }, NETWORK_DELAY);
    });
  },

  /**
   * Simulates persisting a task status change.
   */
  persistTaskStatusChange(taskId: string, newStatus: TaskStatus): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const task = MOCK_TASKS.find(t => t.id === taskId);
        if (task) {
          task.status = newStatus;
          console.log(`Task Service: Persisted status for task ${taskId} to ${newStatus}`);
        }
        resolve();
      }, NETWORK_DELAY / 2);
    });
  },
};
