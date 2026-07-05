import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-6 text-center font-sans">
      <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 shadow-sm mb-6">
        <ShieldAlert className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
        Access Restricted
      </h1>
      <p className="text-slate-600 mt-2 max-w-md">
        Your assigned system role does not have authorization to view this terminal component or database table context.
      </p>
      <div className="mt-8">
        <Link
          to="/dashboard"
          className="inline-flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-all shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Dashboard</span>
        </Link>
      </div>
    </div>
  );
}
