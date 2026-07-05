import React from 'react';
import { Button, Avatar } from '@heroui/react';
import { 
  GraduationCap, 
  Code2, 
  Users, 
  Briefcase, 
  Building2, 
  Shield, 
  LogOut, 
  X,
  LayoutDashboard
} from 'lucide-react';
import { UserRole } from '../types';

interface SidebarProps {
  id?: string;
  user: {
    name: string;
    avatarUrl: string;
    role: UserRole;
    email: string;
  };
  menuItems: Array<{ label: string; desc: string }>;
  onLogout: () => void;
  onRoleSwap: (role: UserRole) => void;
  sidebarOpen: boolean;
  onCloseSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  id,
  user,
  menuItems,
  onLogout,
  onRoleSwap,
  sidebarOpen,
  onCloseSidebar,
}) => {
  const roleIcons: { [key in UserRole]: React.ReactNode } = {
    Student: <GraduationCap className="w-5 h-5 text-indigo-500" />,
    Faculty: <Building2 className="w-5 h-5 text-sky-500" />,
    Developer: <Code2 className="w-5 h-5 text-emerald-500" />,
    Recruiter: <Briefcase className="w-5 h-5 text-amber-500" />,
    'HR Manager': <Users className="w-5 h-5 text-rose-500" />,
    Admin: <Shield className="w-5 h-5 text-indigo-600" />,
  };

  const roleStyles: { [key in UserRole]: string } = {
    Student: 'bg-indigo-950/80 border-indigo-900 text-indigo-400',
    Faculty: 'bg-sky-955/80 border-sky-900 text-sky-400',
    Developer: 'bg-emerald-950/80 border-emerald-900 text-emerald-400',
    Recruiter: 'bg-amber-950/80 border-amber-900 text-amber-400',
    'HR Manager': 'bg-rose-950/80 border-rose-900 text-rose-400',
    Admin: 'bg-indigo-955/80 border-indigo-900 text-indigo-400',
  };

  return (
    <>
      {/* Mobile Sidebar Overlay Drawer backdrop */}
      {sidebarOpen && (
        <div 
          onClick={onCloseSidebar}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Primary Navigation Sidebar Panel */}
      <aside 
        id={id}
        className={`
          fixed inset-y-0 left-0 bg-slate-900 text-slate-300 w-64 z-50 transform lg:translate-x-0 transition-transform duration-300 lg:relative border-r border-slate-800 flex flex-col h-full
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Brand Header */}
        <div className="h-16 border-b border-slate-800 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-mono font-bold text-lg shadow-md">
              F
            </div>
            <span className="font-sans font-bold text-white tracking-tight text-sm">FSP Enterprise Portal</span>
          </div>
          <button 
            onClick={onCloseSidebar}
            className="lg:hidden text-slate-400 hover:text-white cursor-pointer p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active User Profile Card */}
        <div className="p-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center space-x-3 p-3 bg-slate-800/40 border border-slate-800 rounded-xl">
            <Avatar 
              src={user.avatarUrl} 
              name={user.name} 
              size="md"
              className="border border-slate-700 object-cover shrink-0"
            />
            <div className="min-w-0 flex-1">
              <span className="block text-xs font-bold text-white truncate font-sans">{user.name}</span>
              <span className={`inline-flex items-center gap-1 text-[9px] font-bold border px-2 py-0.5 rounded-full mt-1.5 ${roleStyles[user.role]}`}>
                {roleIcons[user.role]}
                <span className="uppercase tracking-wider font-sans">{user.role}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Navigation Menus */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2.5 px-1 font-sans">
              Role: {user.role} Navigation
            </span>
            <ul className="space-y-1">
              <li className="flex items-center space-x-3 p-2.5 bg-slate-800 text-white rounded-lg text-xs font-bold font-sans">
                <LayoutDashboard className="w-4 h-4 text-indigo-500" />
                <span>Primary Terminal Board</span>
              </li>
              {menuItems.map((menu, idx) => (
                <li 
                  key={idx} 
                  className="p-2.5 hover:bg-slate-800/60 rounded-lg text-[11px] font-semibold text-slate-400 hover:text-white transition-all cursor-pointer group flex flex-col justify-start"
                >
                  <span className="font-bold text-slate-300 group-hover:text-white font-sans">{menu.label}</span>
                  <span className="text-[9px] text-slate-500 block mt-0.5 truncate font-sans">{menu.desc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Swapper Tool for evaluators */}
          <div className="pt-4 border-t border-slate-800">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 px-1 font-sans">
              Instant Swapper
            </span>
            <div className="relative px-1">
              <select
                value={user.role}
                onChange={(e) => onRoleSwap(e.target.value as UserRole)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg text-xs text-white px-3 py-2 font-semibold font-sans focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
              >
                <option value="Student">Student (Sanjay)</option>
                <option value="Faculty">Faculty (Evelyn)</option>
                <option value="Developer">Developer (Alex)</option>
                <option value="Recruiter">Recruiter (Sarah)</option>
                <option value="HR Manager">HR Manager (Michael)</option>
                <option value="Admin">Admin (Eleanor)</option>
              </select>
            </div>
            <p className="text-[9px] text-slate-500 mt-2 px-1 leading-relaxed font-sans">
              Click any option above to test all separate dashboards instantly.
            </p>
          </div>
        </div>

        {/* Sidebar Footer Log out */}
        <div className="p-4 border-t border-slate-800 shrink-0 bg-slate-900/90">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center space-x-2 p-2.5 rounded-lg text-xs font-bold text-slate-400 hover:text-white hover:bg-rose-950/20 hover:border-rose-900 border border-transparent transition-all cursor-pointer font-sans"
          >
            <LogOut className="w-4 h-4 text-slate-400" />
            <span>Sign Out Session</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
