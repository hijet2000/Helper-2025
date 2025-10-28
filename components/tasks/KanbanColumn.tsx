import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { Task, TaskStatus } from '../../types';
import TaskCard from './TaskCard';

interface KanbanColumnProps {
  status: TaskStatus;
  tasks: Task[];
  isDragDisabled: boolean;
}

const statusStyles: Record<TaskStatus, { bg: string; border: string; text: string; }> = {
  'To Do': { bg: 'bg-red-50 dark:bg-red-900/20', border: 'border-red-400', text: 'text-red-800 dark:text-red-300' },
  'In Progress': { bg: 'bg-yellow-50 dark:bg-yellow-900/20', border: 'border-yellow-400', text: 'text-yellow-800 dark:text-yellow-300' },
  'Done': { bg: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-500', text: 'text-green-800 dark:text-green-300' },
};

const KanbanColumn: React.FC<KanbanColumnProps> = ({ status, tasks, isDragDisabled }) => {
  const styles = statusStyles[status];

  return (
    <div className={`w-1/3 min-w-[300px] flex-shrink-0 rounded-lg ${styles.bg}`}>
      <h3 className={`text-lg font-bold p-3 border-t-4 rounded-t-lg ${styles.border} ${styles.text}`}>
        {status} <span className="text-sm font-normal text-gray-500 dark:text-gray-400">({tasks.length})</span>
      </h3>

      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`min-h-[400px] p-2 rounded-b-lg transition-colors ${
              snapshot.isDraggingOver ? 'bg-blue-100 dark:bg-blue-900/30' : ''
            }`}
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                isDragDisabled={isDragDisabled}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default KanbanColumn;
