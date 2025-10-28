import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Task } from '../../types';

interface TaskCardProps {
  task: Task;
  index: number;
  isDragDisabled: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index, isDragDisabled }) => {
  return (
    <Draggable
      draggableId={task.id}
      index={index}
      isDragDisabled={isDragDisabled}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white dark:bg-gray-800 p-3 mb-3 rounded-lg shadow-md border-l-4 transition-all ${
            snapshot.isDragging 
              ? 'border-blue-500 ring-2 ring-blue-500' 
              : 'border-transparent dark:border-gray-700'
          } ${
            isDragDisabled 
              ? 'opacity-70 cursor-not-allowed' 
              : 'hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">{task.title}</p>
          {isDragDisabled && !snapshot.isDragging && (
            <p className="text-red-500 text-xs mt-1 italic">
              Read-only
            </p>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
