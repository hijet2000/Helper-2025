import React, { useEffect, useMemo, useState } from 'react';
import { useRotaStore } from '../store/useRotaStore';
import { useAuth } from '../hooks/useAuth';
import { MOCK_USERS } from '../data/mockData';
import { Shift } from '../types';
import ShiftCell from '../components/rota/ShiftCell';
import CreateShiftModal from '../components/rota/CreateShiftModal';

const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
    </svg>
);
const ChevronLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);
const ChevronRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
    </svg>
);

// Helper to get days of the week for a given date
const getWeekDays = (date: Date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Start on Sunday
    const week = [];
    for (let i = 0; i < 7; i++) {
        const day = new Date(startOfWeek);
        day.setDate(day.getDate() + i);
        week.push(day);
    }
    return week;
}

const RotaPage: React.FC = () => {
    const { shifts, loading, error, fetchShifts } = useRotaStore();
    const { hasPermission } = useAuth();
    const canManage = hasPermission('rota.manage');

    const [currentDate, setCurrentDate] = useState(new Date());
    const [modalDate, setModalDate] = useState<string | null>(null);

    useEffect(() => {
        fetchShifts();
    }, [fetchShifts]);
    
    const weekDays = useMemo(() => getWeekDays(currentDate), [currentDate]);

    const shiftsByDate = useMemo(() => {
        const grouped: Record<string, Shift[]> = {};
        shifts.forEach(shift => {
            const dateKey = shift.date.split('T')[0];
            if (!grouped[dateKey]) {
                grouped[dateKey] = [];
            }
            grouped[dateKey].push(shift);
        });
        return grouped;
    }, [shifts]);

    const userMap = useMemo(() => MOCK_USERS.reduce((acc, user) => {
        acc[user.id] = user.name;
        return acc;
    }, {} as Record<string, string>), []);

    const changeWeek = (direction: 'prev' | 'next') => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
            return newDate;
        });
    }

    if (loading) {
        return <div className="p-8 text-center">Loading Rota...</div>;
    }

    if (error) {
        return <div className="p-8 text-red-500 text-center">Error: {error}</div>;
    }

    return (
        <div className="p-6 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Weekly Rota</h1>
                <div className="flex items-center space-x-4">
                    <button onClick={() => changeWeek('prev')} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="Previous week">
                        <ChevronLeftIcon className="h-5 w-5"/>
                    </button>
                    <span className="font-semibold">{weekDays[0].toLocaleDateString(undefined, {month: 'short', day: 'numeric'})} - {weekDays[6].toLocaleDateString(undefined, {month: 'short', day: 'numeric', year: 'numeric'})}</span>
                     <button onClick={() => changeWeek('next')} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="Next week">
                        <ChevronRightIcon className="h-5 w-5"/>
                    </button>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-7 border-t border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                {weekDays.map(day => {
                    const dateString = day.toISOString().split('T')[0];
                    const dayShifts = shiftsByDate[dateString] || [];
                    return (
                        <div key={dateString} className="border-b border-r border-gray-200 dark:border-gray-700 flex flex-col">
                            <div className="p-2 text-center font-semibold border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                                <p className="text-sm text-gray-500 dark:text-gray-400">{day.toLocaleDateString('en-US', { weekday: 'short' })}</p>
                                <p className="text-lg">{day.getDate()}</p>
                            </div>
                            <div className="flex-1 p-2 space-y-2 overflow-y-auto">
                                {dayShifts.map(shift => (
                                    <ShiftCell key={shift.id} shift={shift} userName={userMap[shift.userId] || 'Unknown'} />
                                ))}
                            </div>
                            {canManage && (
                                <button onClick={() => setModalDate(dateString)} className="m-2 mt-auto p-1.5 flex items-center justify-center text-xs text-gray-500 hover:text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-md transition-colors">
                                    <PlusIcon className="h-4 w-4 mr-1"/>
                                    Add Shift
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
            {modalDate && <CreateShiftModal onClose={() => setModalDate(null)} date={modalDate} />}
        </div>
    );
};

export default RotaPage;
