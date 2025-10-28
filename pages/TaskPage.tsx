import React, { useEffect, useMemo } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useTaskStore } from '../store/useTaskStore';
import { useAuth } from '../hooks/useAuth';
import KanbanColumn from '../components/tasks/KanbanColumn';
import { Task, TaskStatus } from '../types';

const TASK_STATUSES: TaskStatus[] = ['To Do', 'In Progress', 'Done'];

const TaskPage: React.FC = () => {
  const { tasks, fetchTasks, updateTaskStatus } = useTaskStore();
  const { hasPermission } = useAuth();

  // FIX: Replaced the faulty `useZustandAsync` hook with a direct `useTaskStore` selector.
  // The custom hook had a flawed generic signature that prevented TypeScript from
  // correctly inferring the store's state type, resulting in an 'unknown' type.
  // This direct usage is the idiomatic and type-safe way to select state in Zustand.
  const [loadingTasks, errorTasks] = useTaskStore((state) => [
    state.loadingTasks,
    state.errorTasks,
  ]);

  const canUpdateTasks = hasPermission('tasks.create');

  useEffect(() => {
    if (tasks.length === 0) {
      fetchTasks();
    }
  }, [fetchTasks, tasks.length]);

  const tasksByStatus = useMemo(() => {
    const groupedTasks: Record<TaskStatus, Task[]> = {
      'To Do': [],
      'In Progress': [],
      'Done': [],
    };
    tasks.forEach((task) => {
      if (groupedTasks[task.status]) {
        groupedTasks[task.status].push(task);
      }
    });
    return groupedTasks;
  }, [tasks]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination || !canUpdateTasks) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;
    
    const newStatus = destination.droppableId as TaskStatus;
    updateTaskStatus(draggableId, newStatus);
  };

  if (loadingTasks) {
    return (
      <div className="p-8 flex items-center justify-center h-full">
        <div className="flex items-center space-x-2 text-blue-500">
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Loading Tasks...</span>
        </div>
      </div>
    );
  }

  if (errorTasks) {
    return <div className="p-8 text-red-500 text-center">Error: {errorTasks}</div>;
  }

  return (
    <div className="p-6 h-full flex flex-col">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Task Kanban Board</h1>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {TASK_STATUSES.map((status) => (
            <KanbanColumn
              key={status}
              status={status}
              tasks={tasksByStatus[status]}
              isDragDisabled={!canUpdateTasks}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskPage;