import React, { useState, useEffect } from 'react';
import { Briefcase, Users, Star, Plus, Shield, CheckCircle, Calendar, Sparkles, Filter, Search, FileText } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

export default function RecruiterDashboard() {
  const { addNotification } = useNotifications();
  const [activeTab, setActiveTab] = useState<'applicants' | 'jobs' | 'interviews'>('applicants');
  const [applicants, setApplicants] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [interviews, setInterviews] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Interactive recruiter states
  const [selectedCandidate, setSelectedCandidate] = useState<any | null>(null);
  const [isScreening, setIsScreening] = useState(false);
  const [screeningReport, setScreeningReport] = useState('');

  // Sandbox active question generator states
  const [activeInterview, setActiveInterview] = useState<any | null>(null);
  const [generatedQuestion, setGeneratedQuestion] = useState('');
  const [isGeneratingQuestion, setIsGeneratingQuestion] = useState(false);

  const handleAIScreen = (candidate: any) => {
    setSelectedCandidate(candidate);
    setIsScreening(true);
    setScreeningReport('');
    setTimeout(() => {
      setIsScreening(false);
      setScreeningReport(`### **AI ATS Screen Report for ${candidate.name}**

* **Applied Position:** ${candidate.job}
* **Scorecard Rating:** ${candidate.score || 82}% Match
* **Analyzed Expertise:** ${(candidate.skills || ["React", "TypeScript"]).join(', ')}

**Recruiter Core Verdict:**
Sanjay exhibits solid proficiency in state machines and client-side database synchronization. Recommended next action is to schedule an interactive System Coding Sandbox.`);
    }, 1200);
  };

  const handleGenerateQuestion = (interview: any) => {
    setIsGeneratingQuestion(true);
    setGeneratedQuestion('');
    setTimeout(() => {
      setIsGeneratingQuestion(false);
      setGeneratedQuestion(`### **AI Interview Question: System Design [${interview.pos || "Technical"}]**\n\n"Describe how you would design a rate-limiting filter layer in front of a heavy database write endpoint. How would you persist the token bucket counters?"`);
    }, 1000);
  };

  useEffect(() => {
    async function loadData() {
      try {
        const [resApps, resJobs, resInterviews] = await Promise.all([
          fetch('/api/candidates').then(r => r.json()),
          fetch('/api/jobs').then(r => r.json()),
          fetch('/api/interviews').then(r => r.json())
        ]);
        setApplicants(resApps.data || []);
        setJobs(resJobs.data || []);
        setInterviews(resInterviews.data || []);
      } catch (err) {
        console.error("Failed to load recruiter data:", err);
      }
    }
    loadData();
  }, []);

  const handleCreateJob = async () => {
    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: "Staff Software Engineer - AI Orchestration",
          dept: "Core Framework Systems",
          salary: "$140,000 - $185,000",
          location: "Hybrid - Bangalore",
          applicants: 0,
          status: "Active"
        })
      });
      if (res.ok) {
        const updated = await fetch('/api/jobs').then(r => r.json());
        setJobs(updated.data || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredApplicants = applicants.filter(a => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    a.job.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    { title: "Active Postings", value: `${jobs.length} Positions`, sub: "Tech & Admin", icon: <Briefcase className="w-5 h-5 text-indigo-600" /> },
    { title: "Total Applicants", value: `${applicants.length} Profiles`, sub: "Registered candidates", icon: <Users className="w-5 h-5 text-emerald-600" /> },
    { title: "Qualified (Score >80)", value: `${applicants.filter(a => (a.score || 0) >= 80).length} Candidates`, sub: "Ready to interview", icon: <Sparkles className="w-5 h-5 text-amber-600" /> },
    { title: "Interviews Booked", value: `${interviews.length} Scheduled`, sub: "Upcoming sandboxes", icon: <Calendar className="w-5 h-5 text-rose-600" /> },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Recruitment Dashboard</h1>
          <p className="text-sm text-slate-500">Monitor campus recruitment pipelines, review AI-graded applicant scorecards, and create job openings.</p>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={handleCreateJob}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-4 py-2 rounded-xl shadow-xs flex items-center space-x-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create New Job Post</span>
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
          { id: 'applicants', label: 'Candidate Applicants' },
          { id: 'jobs', label: 'Active Job Postings' },
          { id: 'interviews', label: 'Interview Pipelines' }
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
      {activeTab === 'applicants' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <h3 className="font-bold text-slate-900 text-sm">Active Job Applicants & AI Resume Scores</h3>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search candidates..." 
                  className="pl-9 pr-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium focus:outline-hidden text-slate-800 placeholder-slate-400"
                />
              </div>
              <button className="border border-slate-200 text-slate-600 p-2 rounded-lg hover:bg-slate-50 flex items-center space-x-1 text-xs font-semibold cursor-pointer">
                <Filter className="w-3.5 h-3.5" />
                <span>Filters</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  <th className="p-3">Candidate</th>
                  <th className="p-3">Applied Position</th>
                  <th className="p-3">Matched Skills</th>
                  <th className="p-3 text-center">ATS Score</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredApplicants.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-3 text-center text-slate-400">No candidate applications match filters.</td>
                  </tr>
                ) : (
                  filteredApplicants.map((candidate, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/30 transition-colors">
                      <td className="p-3">
                        <div className="flex items-center space-x-2.5">
                          <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-150 flex items-center justify-center text-xs font-bold text-slate-700">
                            {candidate.name.split(' ').map((n: string) => n[0]).join('')}
                          </div>
                          <div>
                            <span className="block font-bold text-slate-800">{candidate.name}</span>
                            <span className="text-[10px] text-slate-400 block font-mono">{candidate.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-slate-700 font-semibold">{candidate.job}</td>
                      <td className="p-3">
                        <div className="flex flex-wrap gap-1.5 max-w-[280px]">
                          {(candidate.skills || ["React", "TypeScript", "Node"]).map((s: string, sIdx: number) => (
                            <span key={sIdx} className="bg-slate-50 border border-slate-150 text-slate-600 px-2 py-0.5 rounded-sm text-[9px] font-mono font-medium">{s}</span>
                          ))}
                        </div>
                      </td>
                      <td className="p-3 text-center">
                        <span className={`inline-block px-2 py-1 rounded-lg text-xs font-bold ${
                          (candidate.score || 80) >= 90 ? "bg-emerald-50 text-emerald-700 border border-emerald-100" :
                          (candidate.score || 80) >= 80 ? "bg-indigo-50 text-indigo-700 border border-indigo-100" :
                          "bg-amber-50 text-amber-700 border border-amber-100"
                        }`}>{candidate.score || 80}%</span>
                      </td>
                      <td className="p-3 text-right">
                        <button 
                          onClick={() => handleAIScreen(candidate)}
                          className="text-[10px] font-bold text-indigo-600 border border-indigo-200 bg-indigo-50/20 px-3 py-1.5 rounded-lg hover:bg-indigo-50 transition-all cursor-pointer"
                        >
                          AI ATS Screen
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Modal for ATS Screening Report */}
          {selectedCandidate && (
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-3xl p-6 max-w-lg w-full border border-slate-150 shadow-2xl space-y-4">
                <div className="flex justify-between items-center border-b pb-3">
                  <span className="font-bold text-slate-900 text-sm">AI Cognitive Resume Screen</span>
                  <button 
                    onClick={() => {
                      setSelectedCandidate(null);
                      setScreeningReport('');
                    }} 
                    className="text-slate-400 hover:text-slate-600 font-bold text-sm"
                  >
                    ✕
                  </button>
                </div>
                <div className="space-y-3 text-xs text-slate-700">
                  {isScreening ? (
                    <div className="flex flex-col items-center justify-center py-8 space-y-2">
                      <Sparkles className="w-8 h-8 text-indigo-600 animate-spin" />
                      <span className="font-semibold text-slate-500">Querying Gemini Cognitive Ingest...</span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="bg-slate-50 p-4 rounded-xl border border-indigo-100 font-mono text-[11px] leading-relaxed whitespace-pre-wrap">
                        {screeningReport}
                      </div>
                      <div className="flex justify-end space-x-2 pt-2">
                        <button
                          onClick={() => {
                            // Automatically add to interview list
                            const newInterview = {
                              applicant: selectedCandidate.name,
                              pos: selectedCandidate.job,
                              time: "Tomorrow at 11:00 AM",
                              status: "Active Room"
                            };
                            setInterviews(prev => [newInterview, ...prev]);
                            addNotification('Interview Scheduled', `Booked ${selectedCandidate.name} into technical pipeline.`, 'success', 'ATS Portal');
                            setSelectedCandidate(null);
                            setActiveTab('interviews');
                          }}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl cursor-pointer"
                        >
                          Book Interview Immediately
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'jobs' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.length === 0 ? (
            <div className="text-slate-400 text-xs p-4 col-span-3 text-center bg-slate-50 rounded-xl border border-dashed">No active job listings.</div>
          ) : (
            jobs.map((job, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-150 shadow-xs flex flex-col justify-between h-44 hover:border-indigo-150 hover:shadow-xs transition-all">
                <div>
                  <span className="text-[9px] font-bold text-slate-500 bg-slate-100 border border-slate-150 px-2 py-0.5 rounded-full uppercase tracking-wider">{job.dept || "Engineering"}</span>
                  <h4 className="font-bold text-slate-800 mt-2.5 text-sm">{job.title}</h4>
                  <div className="flex items-center space-x-2 text-[10px] text-slate-400 mt-1 font-mono">
                    <span>{job.location || "Remote"}</span>
                    <span>•</span>
                    <span>{job.salary || "Competitive"}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center border-t border-slate-50 pt-3">
                  <span className="text-xs font-semibold text-slate-500">{job.applicants || 0} Active Applications</span>
                  <button className="text-xs font-bold text-indigo-600 hover:text-indigo-500 cursor-pointer">Manage Listing</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'interviews' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm">Upcoming Assessment Pipelines</h3>
          <div className="space-y-3">
            {interviews.length === 0 ? (
              <div className="text-slate-400 text-xs p-4 text-center bg-slate-50 rounded-xl border border-dashed">No interviews booked.</div>
            ) : (
              interviews.map((i, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white border border-slate-150 rounded-xl flex items-center justify-center shrink-0">
                      <Star className="w-4.5 h-4.5 text-indigo-600" />
                    </div>
                    <div>
                      <span className="font-bold text-xs text-slate-800 block">{i.applicant || i.candidateName}</span>
                      <span className="text-[10px] text-slate-500 mt-0.5 block">{i.pos || i.jobTitle} • {i.type || "Technical"}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <span className="text-[10px] font-semibold text-slate-400 block">Scheduled Time</span>
                      <span className="text-xs font-bold text-slate-700 block mt-0.5">{i.time || i.date}</span>
                    </div>
                    <button 
                      onClick={() => {
                        setActiveInterview(i);
                        handleGenerateQuestion(i);
                      }}
                      className={`text-xs font-semibold px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                        i.status === "Active Room"
                          ? 'bg-indigo-600 border-indigo-600 text-white hover:bg-indigo-700 animate-pulse'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {i.status === "Active Room" ? 'Launch Interview Sandbox' : 'Generate Interview Question'}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Modal for Active Interview Question Generator */}
          {activeInterview && (
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-3xl p-6 max-w-lg w-full border border-slate-150 shadow-2xl space-y-4">
                <div className="flex justify-between items-center border-b pb-3">
                  <span className="font-bold text-slate-900 text-sm">Interactive Recruiter Sandbox with {activeInterview.applicant}</span>
                  <button 
                    onClick={() => {
                      setActiveInterview(null);
                      setGeneratedQuestion('');
                    }} 
                    className="text-slate-400 hover:text-slate-600 font-bold text-sm"
                  >
                    ✕
                  </button>
                </div>
                <div className="space-y-3 text-xs text-slate-700">
                  <p className="font-medium text-slate-500">Conduct candidate system-coding evaluation or trigger Gemini questions on demand:</p>
                  
                  {isGeneratingQuestion ? (
                    <div className="flex flex-col items-center justify-center py-6 space-y-2">
                      <Sparkles className="w-7 h-7 text-indigo-600 animate-spin" />
                      <span className="font-semibold text-slate-500">Generating next-level question...</span>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {generatedQuestion && (
                        <div className="bg-slate-950 p-4 rounded-xl border border-zinc-800 font-mono text-[11px] leading-relaxed text-zinc-300 whitespace-pre-wrap">
                          {generatedQuestion}
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center pt-2">
                        <button
                          onClick={() => handleGenerateQuestion(activeInterview)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl cursor-pointer"
                        >
                          Generate Next AI Question
                        </button>
                        <button
                          onClick={() => {
                            addNotification('Feedback Recorded', 'Passed candidate onward in recruitment flow.', 'success', 'Recruiter Service');
                            setActiveInterview(null);
                          }}
                          className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl cursor-pointer"
                        >
                          Pass Candidate & Save Logs
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
