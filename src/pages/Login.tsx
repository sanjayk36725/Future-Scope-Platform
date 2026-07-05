import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth, DEMO_USERS } from '../context/AuthContext';
import { UserRole } from '../types';
import { motion } from 'motion/react';
import { GraduationCap, Code2, Users, Briefcase, Building2, Shield, ArrowRight, Lock, Mail } from 'lucide-react';

export default function Login() {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('Student');
  const [error, setError] = useState('');

  const from = location.state?.from?.pathname || '/dashboard';

  const roleIcons: { [key in UserRole]: React.ReactNode } = {
    Student: <GraduationCap className="w-5 h-5 text-indigo-500" />,
    Faculty: <Building2 className="w-5 h-5 text-sky-500" />,
    Developer: <Code2 className="w-5 h-5 text-emerald-500" />,
    Recruiter: <Briefcase className="w-5 h-5 text-amber-500" />,
    'HR Manager': <Users className="w-5 h-5 text-rose-500" />,
    Admin: <Shield className="w-5 h-5 text-indigo-600" />,
  };

  const handleRoleQuickSelect = async (role: UserRole) => {
    setSelectedRole(role);
    const success = await login(DEMO_USERS[role].email, role);
    if (success) {
      navigate(from, { replace: true });
    }
  };

  const handleCustomLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please provide an email or choose a quick-login role below.');
      return;
    }

    // Since it's a demo, we match the email or default to the selectedRole
    let finalRole = selectedRole;
    const foundDemo = Object.entries(DEMO_USERS).find(([role, details]) => details.email.toLowerCase() === email.toLowerCase());
    
    if (foundDemo) {
      finalRole = foundDemo[0] as UserRole;
    }

    const success = await login(email, finalRole);
    if (success) {
      navigate(from, { replace: true });
    } else {
      setError('Failed to authenticate credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-mono font-bold text-2xl shadow-md">
            F
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold tracking-tight text-slate-900">
          Enter Future Scope Platform
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Access your intelligence dashboard instantly
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-md rounded-2xl border border-slate-200/80">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-xs px-3.5 py-2 rounded-lg font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleCustomLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                Email Address
              </label>
              <div className="relative rounded-lg shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 h-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@fsp.edu"
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Password
                </label>
                <a href="#" className="text-xs font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot?
                </a>
              </div>
              <div className="relative rounded-lg shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 h-5 text-slate-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-xs text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 cursor-pointer"
              >
                {isLoading ? 'Verifying access token...' : 'Sign In'}
              </button>
            </div>
          </form>

          {/* Role Quick Selector */}
          <div className="mt-8">
            <div className="relative flex items-center justify-center my-6">
              <div className="absolute inset-x-0 border-t border-slate-200/80"></div>
              <span className="relative px-3 bg-white text-xs font-semibold uppercase tracking-wider text-slate-400">
                Or Quick-Login as Role
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {(Object.keys(DEMO_USERS) as UserRole[]).map((role) => (
                <button
                  key={role}
                  onClick={() => handleRoleQuickSelect(role)}
                  className="flex items-center space-x-2.5 p-2.5 rounded-xl border border-slate-150 hover:border-indigo-500 hover:bg-indigo-50/20 transition-all text-left text-xs font-medium text-slate-700 hover:text-slate-900 focus:outline-hidden cursor-pointer"
                >
                  <div className="p-1 rounded bg-slate-50 border border-slate-100 shadow-2xs">
                    {roleIcons[role]}
                  </div>
                  <div>
                    <span className="block font-semibold">{role}</span>
                    <span className="block text-[10px] text-slate-400 truncate max-w-[120px]">
                      {DEMO_USERS[role].name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
