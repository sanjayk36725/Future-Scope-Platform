import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Badge } from '@heroui/react';
import { Menu, Bell, Bot, LogOut, Settings, User, Check, Trash2, ArrowLeft } from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';

interface NavbarProps {
  id?: string;
  userName: string;
  userEmail: string;
  userAvatar: string;
  userRole: string;
  statusText?: string;
  notifications?: Array<{ id: string; title: string; desc: string; type?: 'info' | 'success' | 'warning' | 'danger' }>;
  onToggleSidebar?: () => void;
  onLogout?: () => void;
  rightExtra?: React.ReactNode;
}

export const Navbar: React.FC<NavbarProps> = ({
  id,
  userName,
  userEmail,
  userAvatar,
  userRole,
  statusText = 'Server State: Operational',
  onToggleSidebar,
  onLogout,
  rightExtra,
}) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotification,
    clearAll,
  } = useNotifications();

  return (
    <header
      id={id}
      className="h-16 bg-white border-b border-slate-200/80 px-4 md:px-6 flex items-center justify-between shrink-0 sticky top-0 z-30 font-sans"
    >
      {/* Left Area: Mobile toggler and Status */}
      <div className="flex items-center gap-4">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg cursor-pointer transition-all"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <Link 
          to="/landing" 
          className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-white bg-indigo-50 hover:bg-indigo-600 border border-indigo-200 hover:border-indigo-600 px-3 py-1.5 rounded-xl transition-all cursor-pointer shadow-xs group shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-indigo-500 group-hover:text-white transition-colors" />
          <span>Exit to Landing</span>
        </Link>
        {statusText && (
          <span className="hidden lg:inline-flex items-center gap-1.5 font-mono text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span>{statusText}</span>
          </span>
        )}
      </div>

      {/* Right Area: Badge, Notifications, and User Profile */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Quick role change warning badge */}
        <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-full text-[10px] font-bold text-amber-800">
          <Bot className="w-3.5 h-3.5" />
          <span>Rerouting Engine Live</span>
        </span>

        {rightExtra}

        {/* Notifications Trigger */}
        <div className="relative">
          <Badge
            content={unreadCount}
            color="danger"
            shape="circle"
            size="sm"
            isInvisible={unreadCount === 0}
          >
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-50 border border-slate-100/50 rounded-lg p-1.5 h-8 w-8 cursor-pointer transition-colors"
            >
              <Bell className="w-4.5 h-4.5" />
            </button>
          </Badge>

          {notificationsOpen && (
            <>
              <div className="fixed inset-0 z-35" onClick={() => setNotificationsOpen(false)} />
              <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl border border-slate-200 shadow-xl p-4 z-40 animate-fade-in-down text-xs">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2 mb-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-800">Notifications Desk</span>
                    {unreadCount > 0 && (
                      <span className="bg-rose-100 text-rose-700 font-bold text-[9px] px-1.5 py-0.2 rounded-full">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {unreadCount > 0 && (
                      <button 
                        onClick={markAllAsRead}
                        className="text-[10px] text-indigo-600 font-semibold cursor-pointer hover:underline"
                      >
                        Mark Read
                      </button>
                    )}
                    {notifications.length > 0 && (
                      <button 
                        onClick={clearAll}
                        className="text-[10px] text-slate-400 font-semibold cursor-pointer hover:underline hover:text-rose-600"
                      >
                        Clear All
                      </button>
                    )}
                  </div>
                </div>
                <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                  {notifications.length === 0 ? (
                    <div className="text-center py-6 text-slate-400 font-medium">
                      No notifications on dashboard
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div 
                        key={notif.id} 
                        className={`group relative p-2.5 rounded-xl border transition-all duration-200 ${
                          notif.read ? 'bg-slate-50/40 border-slate-100 opacity-75' : ''
                        } ${
                          !notif.read && notif.type === 'success' 
                            ? 'bg-emerald-50/50 border-emerald-100' 
                            : !notif.read && notif.type === 'warning'
                            ? 'bg-amber-50/50 border-amber-100'
                            : !notif.read && notif.type === 'danger'
                            ? 'bg-rose-50/50 border-rose-100'
                            : !notif.read ? 'bg-indigo-50/50 border-indigo-100' : ''
                        }`}
                      >
                        {/* Status bar left side */}
                        <div className={`absolute top-0 left-0 bottom-0 w-1 rounded-l-xl ${
                          notif.type === 'success' 
                            ? 'bg-emerald-500' 
                            : notif.type === 'warning'
                            ? 'bg-amber-500'
                            : notif.type === 'danger'
                            ? 'bg-rose-500'
                            : 'bg-indigo-500'
                        }`} />

                        <div className="pl-1.5">
                          <div className="flex justify-between items-start gap-1">
                            <span className={`font-bold block text-[11px] ${
                              notif.type === 'success' 
                                ? 'text-emerald-950' 
                                : notif.type === 'warning'
                                ? 'text-amber-950'
                                : notif.type === 'danger'
                                ? 'text-rose-950'
                                : 'text-indigo-950'
                            }`}>{notif.title}</span>

                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              {!notif.read && (
                                <button
                                  onClick={() => markAsRead(notif.id)}
                                  title="Mark as read"
                                  className="p-0.5 rounded-md hover:bg-slate-100 text-slate-500 hover:text-indigo-600 transition-colors"
                                >
                                  <Check className="w-3 h-3" />
                                </button>
                              )}
                              <button
                                onClick={() => clearNotification(notif.id)}
                                title="Delete alert"
                                className="p-0.5 rounded-md hover:bg-slate-100 text-slate-500 hover:text-rose-600 transition-colors"
                              >
                                  <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          <p className="text-slate-600 text-[10px] mt-0.5 leading-relaxed pr-3">
                            {notif.desc}
                          </p>

                          <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-100/40 text-[9px] font-mono text-slate-400 font-semibold">
                            <span className="text-indigo-600/80 uppercase tracking-wider">{notif.source}</span>
                            <span>{notif.timestamp}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 border-l border-slate-200 pl-4 cursor-pointer group focus:outline-hidden text-left"
          >
            <Avatar
              className="transition-transform w-8 h-8 text-xs object-cover border border-slate-200"
              src={userAvatar}
              name={userName}
            />
            <div className="hidden sm:block">
              <span className="block text-xs font-bold text-slate-800 group-hover:text-slate-600">{userName}</span>
              <span className="block text-[9px] text-slate-400 font-semibold">{userEmail}</span>
            </div>
          </button>

          {profileOpen && (
            <>
              <div className="fixed inset-0 z-35" onClick={() => setProfileOpen(false)} />
              <div className="absolute right-0 mt-3 w-52 bg-white rounded-2xl border border-slate-200 shadow-xl p-1 z-40 animate-fade-in-down">
                <div className="p-3 border-b border-slate-100/85 rounded-t-2xl bg-slate-50/30">
                  <p className="font-semibold text-[10px] text-slate-400">Signed in as</p>
                  <p className="font-bold text-xs text-slate-700 truncate w-full">{userEmail}</p>
                  <span className="inline-block bg-indigo-50 text-indigo-700 text-[9px] font-bold px-2.5 py-0.5 rounded-full mt-1.5 border border-indigo-100">
                    {userRole}
                  </span>
                </div>
                <div className="p-1.5 space-y-0.5">
                  <button 
                    onClick={() => { setProfileOpen(false); }}
                    className="w-full text-left p-2 hover:bg-slate-50 text-slate-700 rounded-lg flex items-center gap-2.5 cursor-pointer text-xs font-semibold transition-colors"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    <span>My Profile</span>
                  </button>
                  <button 
                    onClick={() => { setProfileOpen(false); }}
                    className="w-full text-left p-2 hover:bg-slate-50 text-slate-700 rounded-lg flex items-center gap-2.5 cursor-pointer text-xs font-semibold transition-colors"
                  >
                    <Settings className="w-4 h-4 text-slate-400" />
                    <span>System Settings</span>
                  </button>
                  <button 
                    onClick={() => { setProfileOpen(false); onLogout?.(); }}
                    className="w-full text-left p-2 hover:bg-rose-50 text-rose-600 hover:text-rose-700 rounded-lg flex items-center gap-2.5 cursor-pointer text-xs font-bold transition-colors border-t border-slate-100/50 mt-1 pt-2.5"
                  >
                    <LogOut className="w-4 h-4 text-rose-500" />
                    <span>Sign Out Session</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
