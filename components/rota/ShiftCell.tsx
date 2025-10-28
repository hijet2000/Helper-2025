import React from 'react';
import { Shift } from '../../types';
import { useRotaStore } from '../../store/useRotaStore';
import { useAuth } from '../../hooks/useAuth';

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);


interface ShiftCellProps {
  shift: Shift;
  userName: string;
}

const shiftColors: Record<string, string> = {
  'Morning': 'bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200',
  'Afternoon': 'bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200',
  'Night': 'bg-indigo-200 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-200',
};

const ShiftCell: React.FC<ShiftCellProps> = ({ shift, userName }) => {
    const { removeShift } = useRotaStore();
    const { hasPermission } = useAuth();
    const canManage = hasPermission('rota.manage');

    const handleDelete = () => {
        if (canManage && window.confirm(`Delete ${shift.type} shift for ${userName}?`)) {
            removeShift(shift.id);
        }
    }

  return (
    <div className={`p-2 rounded-md text-xs relative ${shiftColors[shift.type]}`}>
      <p className="font-semibold">{userName}</p>
      <p>{shift.type} Shift</p>
      {canManage && (
        <button onClick={handleDelete} className="absolute top-1 right-1 p-0.5 rounded-full hover:bg-black/20" aria-label="Delete shift">
            <XIcon className="h-3 w-3"/>
        </button>
      )}
    </div>
  );
};

export default ShiftCell;
