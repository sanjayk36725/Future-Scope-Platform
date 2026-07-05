import React, { useState, useEffect } from 'react';
import { Users, FileText, CheckCircle, Plus, Calendar, Coins, Settings, Clock, Sparkles } from 'lucide-react';

export default function HRDashboard() {
  const [activeTab, setActiveTab] = useState<'employees' | 'leaves' | 'payroll'>('employees');
  const [employees, setEmployees] = useState<any[]>([]);
  const [leaves, setLeaves] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Onboarding modal states
  const [showOnboardModal, setShowOnboardModal] = useState(false);
  const [onboardName, setOnboardName] = useState('Dr. Evelyn Carter');
  const [onboardRole, setOnboardRole] = useState('Faculty Professor');
  const [onboardDept, setOnboardDept] = useState('AI & CS Electives');
  const [isOnboarding, setIsOnboarding] = useState(false);

  // Policy Q&A states
  const [hrQuestion, setHrQuestion] = useState('What is the leave carryover policy?');
  const [hrAnswer, setHrAnswer] = useState('');
  const [hrLoading, setHrLoading] = useState(false);

  const submitOnboard = async () => {
    setIsOnboarding(true);
    try {
      const res = await fetch('/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: onboardName,
          role: onboardRole,
          dept: onboardDept,
          onboarding: "Completed",
          date: "Jan 12, 2021"
        })
      });
      if (res.ok) {
        const updated = await fetch('/api/employees').then(r => r.json());
        setEmployees(updated.data || []);
        setShowOnboardModal(false);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsOnboarding(false);
    }
  };

  const handleQueryHR = () => {
    setHrLoading(true);
    setHrAnswer('');
    setTimeout(() => {
      setHrLoading(false);
      setHrAnswer(`### **HR Cognitive Policy Search**\n\n* **Policy Code:** HR-PL-402 (Leave Carryover)\n* **Carryover Limit:** Up to **5 days** of accrued, unused annual leave can be rolled into the subsequent financial year.\n* **Expiry Bounds:** Rolled days must be consumed before **March 31st**, or they will expire automatically with no monetary cash-out.`);
    }, 1000);
  };

  useEffect(() => {
    async function loadData() {
      try {
        const [resEmp, resLeaves] = await Promise.all([
          fetch('/api/employees').then(r => r.json()),
          fetch('/api/leaves').then(r => r.json())
        ]);
        setEmployees(resEmp.data || []);
        setLeaves(resLeaves.data || []);
      } catch (err) {
        console.error("Failed to load HR data:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleOnboard = async () => {
    try {
      const res = await fetch('/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: "Dr. Evelyn Carter",
          role: "Faculty Professor",
          dept: "AI & CS Electives",
          onboarding: "Completed",
          date: "Jan 12, 2021"
        })
      });
      if (res.ok) {
        const updated = await fetch('/api/employees').then(r => r.json());
        setEmployees(updated.data || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLeaveAction = async (leaveId: string, status: 'Approved' | 'Denied') => {
    try {
      await fetch(`/api/leaves/${leaveId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      setLeaves(prev => prev.map(l => l.id === leaveId ? { ...l, status } : l));
    } catch (err) {
      console.error(err);
    }
  };

  const stats = [
    { title: "Total Employees", value: `${employees.length} Staff`, sub: "6 departments", icon: <Users className="w-5 h-5 text-indigo-600" /> },
    { title: "Pending Leave", value: `${leaves.filter(l => l.status === "Pending approval").length} Requests`, sub: "Requires approval", icon: <Clock className="w-5 h-5 text-emerald-600" /> },
    { title: "Onboarding Progress", value: "4 Enrolled", sub: "Next checkpoint: Monday", icon: <Sparkles className="w-5 h-5 text-amber-600" /> },
    { title: "Monthly Payroll", value: "$412,400", sub: "Disbursed on 30th", icon: <Coins className="w-5 h-5 text-rose-600" /> },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Human Resource Portal</h1>
          <p className="text-sm text-slate-500">Monitor employee onboarding checklist pipelines, review leave requests, and track financial payroll parameters.</p>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setShowOnboardModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-4 py-2 rounded-xl shadow-xs flex items-center space-x-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Onboard New Employee</span>
          </button>
        </div>
      </div>

      {/* Grid statistics */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-150 shadow-xs flex items-center space-x-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
              {s.icon}
            </div>
            <div>
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">{s.title}</span>
              <span className="block text-xl font-bold text-slate-900 mt-0.5">{s.value}</span>
              <span className="block text-[10px] text-slate-500 mt-0.5">{s.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Menu tabs */}
      <div className="border-b border-slate-200 flex items-center space-x-6 text-sm font-medium">
        {[
          { id: 'employees', label: 'Company Employees' },
          { id: 'leaves', label: 'Leave Requests' },
          { id: 'payroll', label: 'Payroll Statements' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 border-b-2 font-semibold transition-all relative ${
              activeTab === tab.id 
                ? 'border-indigo-600 text-indigo-600' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panel */}
      {activeTab === 'employees' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm">Active Staff Directory</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  <th className="p-3">Staff Member</th>
                  <th className="p-3">Department</th>
                  <th className="p-3">Onboarding Check</th>
                  <th className="p-3">Hire Date</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {employees.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-3 text-center text-slate-400">No active employees recorded.</td>
                  </tr>
                ) : (
                  employees.map((emp, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/30 transition-colors">
                      <td className="p-3">
                        <div className="flex items-center space-x-2.5">
                          <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-150 flex items-center justify-center text-xs font-bold text-slate-600">
                            {emp.name.split(' ').map((n: string) => n[0]).join('')}
                          </div>
                          <div>
                            <span className="block font-bold text-slate-800">{emp.name}</span>
                            <span className="text-[10px] text-slate-400 block">{emp.role}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 font-semibold">{emp.dept}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${
                          emp.onboarding === "Completed" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-amber-50 text-amber-700 border-amber-100"
                        }`}>{emp.onboarding}</span>
                      </td>
                      <td className="p-3 text-slate-500 font-mono">{emp.date}</td>
                      <td className="p-3 text-right">
                        <button className="text-[10px] font-bold text-indigo-600 border border-slate-200 hover:border-indigo-500 px-3 py-1.5 rounded-lg hover:bg-indigo-50/20 transition-all cursor-pointer">
                          Edit profile
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'leaves' && (
        <div className="bg-white p-5 rounded-2xl border border-slate-150 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm">Employee Leaves & Time-Off Approvals</h3>
          <div className="space-y-3">
            {leaves.length === 0 ? (
              <div className="text-slate-400 text-xs p-4 text-center bg-slate-50 rounded-xl border border-dashed">No active leave requests.</div>
            ) : (
              leaves.map((l, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="font-bold text-xs text-slate-800 block">{l.requester || "Staff Member"} • {l.type}</span>
                    <p className="text-[11px] text-slate-500 mt-1">&ldquo;{l.reason}&rdquo;</p>
                    <div className="flex items-center space-x-2.5 text-[10px] text-slate-400 mt-2 font-mono">
                      <span>{l.days} total requested</span>
                      <span>•</span>
                      <span>Dates: {l.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {l.status === "Pending approval" ? (
                      <>
                        <button 
                          onClick={() => handleLeaveAction(l.id, 'Denied')}
                          className="bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg cursor-pointer"
                        >
                          Deny
                        </button>
                        <button 
                          onClick={() => handleLeaveAction(l.id, 'Approved')}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg cursor-pointer"
                        >
                          Approve
                        </button>
                      </>
                    ) : (
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold font-mono uppercase ${
                        l.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
                      }`}>{l.status}</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'payroll' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Automated Salary & Payroll Pipelines</h3>
            <div className="space-y-3">
              {[
                { dept: "AI & Innovation Labs", employees: 12, budget: "$148,000", status: "Disbursed" },
                { dept: "Software Operations", employees: 24, budget: "$182,000", status: "Disbursed" },
                { dept: "Platform Sandboxes", employees: 8, budget: "$82,400", status: "Disbursed" }
              ].map((p, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="font-bold text-xs text-slate-800 block">{p.dept}</span>
                    <span className="text-[10px] text-slate-400 mt-0.5 block font-mono">{p.employees} active salary nodes</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-slate-800 block">{p.budget}</span>
                    <span className="text-[9px] font-bold text-emerald-600 font-mono block mt-0.5 uppercase">{p.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cognitive policy Q&A panel */}
          <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl border border-slate-800 shadow-md space-y-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              <h3 className="font-bold text-sm text-slate-100">Cognitive Policy Search & AI Guide</h3>
            </div>
            <p className="text-xs text-slate-400">Ask any policy, legal boundary, or salary bracket query to compile reference guidelines dynamically.</p>
            
            <div className="flex items-center space-x-2">
              <input 
                type="text"
                placeholder="Ask e.g. What is the leave carryover policy?"
                value={hrQuestion}
                onChange={(e) => setHrQuestion(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-200 focus:outline-hidden flex-1 placeholder-slate-600"
              />
              <button 
                onClick={handleQueryHR}
                disabled={hrLoading}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2 rounded-xl cursor-pointer disabled:bg-indigo-400"
              >
                {hrLoading ? 'Searching...' : 'Ask Policy'}
              </button>
            </div>

            {hrAnswer && (
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl font-mono text-[11px] leading-relaxed text-slate-300 whitespace-pre-wrap">
                {hrAnswer}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Onboarding Dialog Modal */}
      {showOnboardModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-150 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <span className="font-bold text-slate-900 text-sm">Interactive Onboarding Check</span>
              <button 
                onClick={() => setShowOnboardModal(false)} 
                className="text-slate-400 hover:text-slate-600 font-bold text-sm"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-3.5">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Employee Full Name</label>
                <input 
                  type="text"
                  value={onboardName}
                  onChange={(e) => setOnboardName(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Role Title</label>
                <input 
                  type="text"
                  value={onboardRole}
                  onChange={(e) => setOnboardRole(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Department</label>
                <select 
                  value={onboardDept}
                  onChange={(e) => setOnboardDept(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-hidden"
                >
                  <option value="AI & CS Electives">AI & CS Electives</option>
                  <option value="Software Systems">Software Systems</option>
                  <option value="Enterprise HRMS Group">Enterprise HRMS Group</option>
                  <option value="Smart Campus Hub">Smart Campus Hub</option>
                </select>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-150 space-y-1 text-[11px] text-slate-500">
                <span className="font-bold text-slate-800 block">System Checklist Automated Provisioning:</span>
                <div>✔ Allocate Google Workspace sandbox account</div>
                <div>✔ Provision biometric card credential ID</div>
                <div>✔ Add model references to Drizzle database</div>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  onClick={() => setShowOnboardModal(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={submitOnboard}
                  disabled={isOnboarding}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2 rounded-xl cursor-pointer disabled:bg-indigo-400"
                >
                  {isOnboarding ? 'Adding Staff...' : 'Complete Onboarding'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
