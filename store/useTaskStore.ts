import { create } from 'zustand';
import { Task, TaskStatus } from '../types';
import { taskService } from '../services/taskService';
import { withAsyncStateHandling } from '../utils/zustandUtils';

interface TaskState {
  tasks: Task[];
  loadingTasks: boolean;
  errorTasks: string | null;
  fetchTasks: () => Promise<void>;
  updateTaskStatus: (taskId: string, newStatus: TaskStatus) => void;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  loadingTasks: false,
  errorTasks: null,

  fetchTasks: () =>
    withAsyncStateHandling(set, 'loadingTasks', 'errorTasks', async () => {
      const fetchedTasks = await taskService.fetchTasks();
      set({ tasks: fetchedTasks });
    }),

  updateTaskStatus: (taskId, newStatus) => {
    const originalTask = get().tasks.find(t => t.id === taskId);
    if (!originalTask) return;

    // 1. Optimistic Update
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      ),
    }));

    // 2. Persist change asynchronously
    taskService.persistTaskStatusChange(taskId, newStatus).catch((error) => {
      console.error('Task persistence failed, reverting state:', error);
      // Revert the state change on failure
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === taskId ? { ...task, status: originalTask.status } : task
        ),
        errorTasks: 'Failed to update task. Please try again.'
      }));
    });
  },
}));
