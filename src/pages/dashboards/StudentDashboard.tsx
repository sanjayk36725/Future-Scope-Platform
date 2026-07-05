import React, { useState, useEffect } from 'react';
import { BookOpen, GraduationCap, Calendar, Award, CheckSquare, Clock, Plus, Upload, Play, AlertCircle } from 'lucide-react';

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'quizzes' | 'assignments'>('overview');
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // AI Study Action interactive states
  const [showTutorModal, setShowTutorModal] = useState(false);
  const [tutorQuery, setTutorQuery] = useState('Explain Linear Algebra eigenvalues');
  const [tutorReply, setTutorReply] = useState('');
  const [tutorLoading, setTutorLoading] = useState(false);

  const [showMentorModal, setShowMentorModal] = useState(false);
  const [mentorCode, setMentorCode] = useState(`// Suboptimal binary search tree search
function searchBST(root, val) {
  if (!root) return null;
  
  // Linear redundancy check
  let current = root;
  while(current) {
    if (current.val === val) return current;
    // Missing optimized binary bounds check!
    current = current.left || current.right;
  }
  return null;
}`);
  const [mentorFeedback, setMentorFeedback] = useState('');
  const [mentorLoading, setMentorLoading] = useState(false);

  const handleQueryTutor = () => {
    setTutorLoading(true);
    setTutorReply('');
    setTimeout(() => {
      setTutorLoading(false);
      if (tutorQuery.toLowerCase().includes('algebra') || tutorQuery.toLowerCase().includes('eigen')) {
        setTutorReply(`### **AI Tutor: Eigenvectors & Eigenvalues (Linear Algebra)**\n\nEigenvalues ($\\lambda$) are scalars representing how much a vector stretch or squish occurs during a linear transformation matrix $A$:\n\n$$A v = \\lambda v$$\n\n**Key steps:**\n1. Formulate the characteristic equation: $\\det(A - \\lambda I) = 0$.\n2. Solve the polynomial roots to find $\\lambda$.\n3. Substitute $\\lambda$ back into $(A - \\lambda I)v = 0$ to extract the spanning eigenvectors.`);
      } else {
        setTutorReply(`### **AI Tutor Response: ${tutorQuery}**\n\nThis core paradigm is parsed recursively inside the FSP academic context to establish optimal learning routes. Recommend launching the "Practice Quizzes" catalog next to verify your parameters!`);
      }
    }, 1100);
  };

  const handleQueryMentor = () => {
    setMentorLoading(true);
    setMentorFeedback('');
    setTimeout(() => {
      setMentorLoading(false);
      setMentorFeedback(`### **AI Coding Mentor: BST Refactoring Report**\n\n* **Vulnerability:** Your code performs an $O(N)$ full traversal of left and right child nodes instead of a logarithmic $O(\\log N)$ binary split.\n* **Solution:** Use tree search values to branch left or right:\n\n\`\`\`javascript\nfunction searchBST(root, val) {\n  if (!root || root.val === val) return root;\n  return val < root.val ? searchBST(root.left, val) : searchBST(root.right, val);\n}\n\`\`\``);
    }, 1100);
  };

  useEffect(() => {
    async function loadData() {
      try {
        const [resCourses, resQuizzes, resAssignments] = await Promise.all([
          fetch('/api/courses').then(r => r.json()),
          fetch('/api/quizzes').then(r => r.json()),
          fetch('/api/assignments').then(r => r.json())
        ]);
        setCourses(resCourses.data || []);
        setQuizzes(resQuizzes.data || []);
        setAssignments(resAssignments.data || []);
      } catch (err) {
        console.error("Failed to load student dashboard data:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const stats = [
    { title: "Current GPA", value: "3.84", sub: "Top 10% in cohort", icon: <GraduationCap className="w-5 h-5 text-indigo-600" /> },
    { title: "Credits Completed", value: "84 / 120", sub: "Next checkpoint: 90", icon: <BookOpen className="w-5 h-5 text-emerald-600" /> },
    { title: "Class Attendance", value: "94.2%", sub: "Target: >90% required", icon: <Clock className="w-5 h-5 text-amber-600" /> },
    { title: "Active Assignments", value: `${assignments.filter(a => a.status !== 'Submitted').length} Pending`, sub: "Due soon", icon: <CheckSquare className="w-5 h-5 text-rose-600" /> },
  ];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file.name);
      
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const res = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              fileName: file.name,
              fileContent: reader.result as string,
              fileType: file.type,
              userId: 'u-1'
            })
          });
          if (res.ok) {
            setUploadSuccess(true);
            setTimeout(() => setUploadSuccess(false), 3000);
            
            // Add a temporary assignment upload or refresh
            const updatedAssignments = await fetch('/api/assignments').then(r => r.json());
            setAssignments(updatedAssignments.data || []);
          }
        } catch (err) {
          console.error("Upload failed:", err);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateQuiz = async () => {
    try {
      const res = await fetch('/api/quizzes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: "AI & Machine Learning Assessment",
          questions: 10,
          time: "15 min",
          completed: false,
          score: "Pending",
          date: "Today"
        })
      });
      if (res.ok) {
        const updated = await fetch('/api/quizzes').then(r => r.json());
        setQuizzes(updated.data || []);
      }
    } catch (err) {
      console.error("Failed to generate quiz:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Academic Sandbox</h1>
          <p className="text-sm text-slate-500">Track courses, assignments, mock assessments, and query personal study tutors.</p>
        </div>
        <div className="flex items-center space-x-2">
          <label className="cursor-pointer bg-white border border-slate-200 px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all shadow-xs flex items-center space-x-1.5">
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Assignment / Resume</span>
            <input type="file" onChange={handleFileUpload} className="hidden" accept=".pdf,.docx,.doc,.txt" />
          </label>
        </div>
      </div>

      {uploadedFile && (
        <div className="bg-emerald-50 border border-emerald-100 p-3.5 rounded-xl flex items-center justify-between text-emerald-800 text-xs">
          <div className="flex items-center space-x-2">
            <span className="font-semibold">Selected Document: {uploadedFile}</span>
            {uploadSuccess && <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-sm animate-pulse">Buffered for AI Parsing</span>}
          </div>
          <button onClick={() => setUploadedFile(null)} className="text-emerald-600 hover:text-emerald-800 font-semibold">Clear</button>
        </div>
      )}

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
          { id: 'overview', label: 'Academic Overview' },
          { id: 'courses', label: 'Registered Courses' },
          { id: 'quizzes', label: 'Practice Quizzes' },
          { id: 'assignments', label: 'Assignments Tracker' }
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
      {activeTab === 'overview' && (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-150 shadow-xs md:col-span-2 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Classroom Timetable & Scheduling</h3>
            <div className="border border-slate-100 rounded-xl overflow-hidden divide-y divide-slate-100">
              <div className="grid grid-cols-3 p-3.5 bg-slate-50/50 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                <span>Class / Subject</span>
                <span>Room / Instructor</span>
                <span>Time / Status</span>
              </div>
              {[
                { subject: "Advanced AI & Machine Learning", code: "CS-402", instructor: "Dr. Evelyn Carter", room: "Lab C", time: "10:30 AM", status: "Active Now" },
                { subject: "Enterprise System Architectures", code: "CS-411", instructor: "Prof. Alan Turing", room: "Auditorium 2", time: "01:30 PM", status: "Scheduled" },
                { subject: "Career Prep: Mock Interview Lab", code: "CP-101", instructor: "Sarah Jenkins", room: "Virtual Terminal", time: "03:15 PM", status: "Open Slot" }
              ].map((c, idx) => (
                <div key={idx} className="grid grid-cols-3 p-3.5 text-xs items-center">
                  <div>
                    <span className="block font-bold text-slate-800">{c.subject}</span>
                    <span className="text-[10px] text-slate-400 font-mono mt-0.5">{c.code}</span>
                  </div>
                  <div>
                    <span className="block font-medium text-slate-700">{c.instructor}</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">{c.room}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-slate-800">{c.time}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-semibold ${
                      c.status === "Active Now" ? "bg-emerald-50 text-emerald-700 border border-emerald-100 animate-pulse" : "bg-slate-100 text-slate-600"
                    }`}>{c.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-150 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Targeted AI Study Actions</h3>
            <div className="space-y-3">
              {/* Action 1: Personal Tutor */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-200 transition-all flex flex-col justify-between h-24">
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Personal Tutor</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Start learning loop on Linear Algebra</span>
                </div>
                <button 
                  onClick={() => setShowTutorModal(true)}
                  className="self-end text-[10px] font-bold text-indigo-600 flex items-center space-x-1 hover:text-indigo-500 cursor-pointer"
                >
                  <span>Resume Tutorial</span>
                  <Play className="w-2.5 h-2.5 fill-indigo-600" />
                </button>
              </div>

              {/* Action 2: Quiz Generator */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-200 transition-all flex flex-col justify-between h-24">
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Quiz Generator</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Evaluate core React 19 skill structures</span>
                </div>
                <button 
                  onClick={() => {
                    setActiveTab('quizzes');
                    handleCreateQuiz();
                  }}
                  className="self-end text-[10px] font-bold text-indigo-600 flex items-center space-x-1 hover:text-indigo-500 cursor-pointer"
                >
                  <span>Generate Test</span>
                  <Play className="w-2.5 h-2.5 fill-indigo-600" />
                </button>
              </div>

              {/* Action 3: Coding Mentor */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-200 transition-all flex flex-col justify-between h-24">
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Coding Mentor</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Refactor binary tree traversal routines</span>
                </div>
                <button 
                  onClick={() => setShowMentorModal(true)}
                  className="self-end text-[10px] font-bold text-indigo-600 flex items-center space-x-1 hover:text-indigo-500 cursor-pointer"
                >
                  <span>Open Editor</span>
                  <Play className="w-2.5 h-2.5 fill-indigo-600" />
                </button>
              </div>
            </div>

            {/* Modal - Personal Tutor Dialog */}
            {showTutorModal && (
              <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-3xl p-6 max-w-lg w-full border border-slate-150 shadow-2xl space-y-4">
                  <div className="flex justify-between items-center border-b pb-3">
                    <span className="font-bold text-slate-900 text-sm">Personal AI Study Tutor</span>
                    <button onClick={() => setShowTutorModal(false)} className="text-slate-400 hover:text-slate-600 font-bold text-sm">✕</button>
                  </div>
                  <div className="space-y-3 text-xs">
                    <p className="text-slate-500 font-medium">Type your academic query or click "Ask Tutor" to solve Linear Algebra parameters:</p>
                    <input 
                      type="text" 
                      value={tutorQuery} 
                      onChange={(e) => setTutorQuery(e.target.value)} 
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-hidden font-semibold"
                    />
                    <button 
                      onClick={handleQueryTutor}
                      disabled={tutorLoading}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl disabled:bg-indigo-400 cursor-pointer w-full"
                    >
                      {tutorLoading ? 'Querying AI Tutor...' : 'Ask Tutor'}
                    </button>
                    {tutorReply && (
                      <div className="bg-slate-50 p-4 rounded-xl border border-indigo-100 font-mono text-[10.5px] leading-relaxed whitespace-pre-wrap text-slate-700">
                        {tutorReply}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Modal - Coding Mentor Dialog */}
            {showMentorModal && (
              <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-3xl p-6 max-w-xl w-full border border-slate-150 shadow-2xl space-y-4">
                  <div className="flex justify-between items-center border-b pb-3">
                    <span className="font-bold text-slate-900 text-sm">AI Coding Mentor Workspace</span>
                    <button onClick={() => setShowMentorModal(false)} className="text-slate-400 hover:text-slate-600 font-bold text-sm">✕</button>
                  </div>
                  <div className="space-y-3 text-xs">
                    <p className="text-slate-500 font-medium">Review algorithm syntax. Click "Evaluate Code" to trigger the compiler review:</p>
                    <textarea 
                      value={mentorCode} 
                      onChange={(e) => setMentorCode(e.target.value)} 
                      rows={6}
                      className="w-full border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-hidden font-mono text-[11px] leading-relaxed"
                    />
                    <button 
                      onClick={handleQueryMentor}
                      disabled={mentorLoading}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl disabled:bg-emerald-400 cursor-pointer w-full"
                    >
                      {mentorLoading ? 'Analyzing code syntax...' : 'Evaluate Code'}
                    </button>
                    {mentorFeedback && (
                      <div className="bg-slate-950 p-4 rounded-xl border border-zinc-800 font-mono text-[10.5px] leading-relaxed whitespace-pre-wrap text-zinc-300">
                        {mentorFeedback}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'courses' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.length === 0 ? (
            <div className="text-slate-400 text-xs p-4 col-span-3 text-center bg-slate-50 rounded-xl border border-dashed">No active courses found.</div>
          ) : (
            courses.map((course: any, idx: number) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-150 shadow-xs flex flex-col justify-between h-48">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-[10px] text-slate-400 font-semibold">{course.code || "CS-402"}</span>
                    <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full">{course.level || "Core"}</span>
                  </div>
                  <h4 className="font-bold text-slate-800 mt-2 text-sm">{course.name || course.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed truncate-2-lines">{course.description}</p>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] font-semibold text-slate-500 mb-1.5">
                    <span>Class Progress</span>
                    <span>{course.progress || 100}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${course.progress || 100}%` }}></div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'quizzes' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Practice Quizzes Panel</h3>
              <p className="text-xs text-slate-500 mt-0.5">Generate customized multiple-choice questionnaires on demand via AI.</p>
            </div>
            <button 
              onClick={handleCreateQuiz}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-3.5 py-2 rounded-xl flex items-center space-x-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Request Quiz Instance</span>
            </button>
          </div>

          <div className="space-y-4">
            {quizzes.length === 0 ? (
              <div className="text-slate-400 text-xs p-4 text-center bg-slate-50 rounded-xl border border-dashed">No quiz history available. Try generating one.</div>
            ) : (
              quizzes.map((q: any, idx: number) => (
                <div key={idx} className="flex flex-wrap items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-9 h-9 bg-white border border-slate-150 rounded-lg flex items-center justify-center shrink-0">
                      <Award className={`w-4 h-4 ${q.completed ? 'text-indigo-600' : 'text-slate-400'}`} />
                    </div>
                    <div>
                      <span className="font-bold text-xs text-slate-800 block">{q.title}</span>
                      <div className="flex items-center space-x-2.5 text-[10px] text-slate-400 mt-0.5 font-mono">
                        <span>{q.questions || 10} Questions</span>
                        <span>•</span>
                        <span>{q.time || "15 min"} Duration</span>
                        <span>•</span>
                        <span>Created {q.date || "Today"}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <span className="text-[10px] font-semibold text-slate-400 block">Assessment Score</span>
                      <span className={`text-xs font-bold block mt-0.5 ${q.completed ? 'text-indigo-600' : 'text-slate-500'}`}>{q.score || "Pending"}</span>
                    </div>
                    <button 
                      onClick={() => {
                        // Mark completed and update locally
                        fetch(`/api/quizzes/${q.id}`, {
                          method: 'PUT',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ completed: true, score: "9/10" })
                        }).then(() => {
                          setQuizzes(prev => prev.map(item => item.id === q.id ? { ...item, completed: true, score: "9/10" } : item));
                        });
                      }}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                        q.completed 
                          ? 'border-slate-200 text-slate-600 hover:bg-white' 
                          : 'border-indigo-600 bg-indigo-600 text-white hover:bg-indigo-700'
                      }`}
                    >
                      {q.completed ? 'Review Quiz' : 'Begin Assessment'}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'assignments' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm">Academic Assignments Queue</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  <th className="p-3">Course / Code</th>
                  <th className="p-3">Assignment Topic</th>
                  <th className="p-3">Expiry Deadline</th>
                  <th className="p-3">Status / Mark</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {assignments.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-3 text-center text-slate-400">No active assignments queue found.</td>
                  </tr>
                ) : (
                  assignments.map((asg: any, idx: number) => (
                    <tr key={idx} className="hover:bg-slate-50/30 transition-colors">
                      <td className="p-3 font-mono text-slate-500">{asg.course}</td>
                      <td className="p-3 text-slate-800 font-semibold">{asg.topic || asg.title}</td>
                      <td className="p-3 text-slate-600 font-mono">{asg.due || asg.deadline}</td>
                      <td className="p-3">
                        <div className="flex items-center justify-between gap-4 max-w-[150px]">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${
                            asg.status === "Submitted" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-rose-50 text-rose-700 border-rose-100 animate-pulse"
                          }`}>{asg.status}</span>
                          <span className="font-bold text-slate-800">{asg.score || "—"}</span>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
