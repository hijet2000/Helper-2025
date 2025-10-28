// components/Sidebar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const CreateIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
const HomeIcon = CreateIcon;
const UsersIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const ClipboardListIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>;
const ArchiveIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg>;
const CalendarIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
const BriefcaseIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>;
const DocumentReportIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>;

const iconClass = "h-6 w-6 mr-3";

const navLinks = [
    { to: '/', text: 'Dashboard', icon: <HomeIcon className={iconClass} /> },
    { to: '/crm', text: 'CRM', icon: <UsersIcon className={iconClass} /> },
    { to: '/tasks', text: 'Tasks', icon: <ClipboardListIcon className={iconClass} /> },
    { to: '/inventory', text: 'Inventory', icon: <ArchiveIcon className={iconClass} /> },
    { to: '/hr', text: 'HR / Time Off', icon: <BriefcaseIcon className={iconClass} /> },
    { to: '/rota', text: 'Rota', icon: <CalendarIcon className={iconClass} /> },
    { to: '/audit', text: 'Audit Log', icon: <DocumentReportIcon className={iconClass} /> },
];

const Sidebar: React.FC = () => {
    const baseLinkClass = "flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 rounded-lg";
    const activeLinkClass = "bg-blue-500 text-white dark:bg-blue-600";
    const inactiveLinkClass = "hover:bg-gray-200 dark:hover:bg-gray-700";

    return (
        <aside className="w-64 flex-shrink-0 bg-white dark:bg-gray-800 border-r dark:border-gray-700 flex flex-col">
            <div className="px-4 py-6 text-2xl font-bold text-blue-600 dark:text-blue-400">
                BizNexus
            </div>
            <nav className="flex-1 px-4 pb-4 space-y-2">
                {navLinks.map(link => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        end={link.to === '/'}
                        className={({ isActive }) =>
                            `${baseLinkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`
                        }
                    >
                        {link.icon}
                        {link.text}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
