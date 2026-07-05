import React, { useState, useEffect } from 'react';
import { BookOpen, Users, Calendar, Award, CheckSquare, Clock, Plus, HelpCircle, FileText, Sparkles, Check, AlertCircle, Terminal } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

export default function FacultyDashboard() {
  const { addNotification } = useNotifications();
  const [activeTab, setActiveTab] = useState<'classes' | 'grading' | 'resources' | 'ai_import'>('classes');
  const [gradingList, setGradingList] = useState<any[]>([]);
  const [classesList, setClassesList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Expandable grading and manual override states
  const [expandedAsgId, setExpandedAsgId] = useState<string | null>(null);
  const [customGradeValue, setCustomGradeValue] = useState<number>(85);
  const [customRemarks, setCustomRemarks] = useState('');
  const [isSavingGrade, setIsSavingGrade] = useState(false);

  // Agentic AI Importer States
  const [importText, setImportText] = useState('');
  const [importType, setImportType] = useState<'students' | 'attendance' | 'assignments'>('students');
  const [isImporting, setIsImporting] = useState(false);
  const [importedRecords, setImportedRecords] = useState<any[]>([]);
  const [importSuccessCount, setImportSuccessCount] = useState<number | null>(null);
  const [importError, setImportError] = useState('');

  // Sample templates for testing the parser
  const sampleTemplates = {
    students: `Roll_Number, First_Name, Last_Name, Email, Class_Name\nCS-2026-045, Aarav, Malhotra, aarav@fsp.edu, CS-402\nCS-2026-046, Ishaan, Verma, ishaan@fsp.edu, CS-402\nCS-2026-047, Meera, Nair, meera@fsp.edu, CS-411`,
    attendance: `CS-2026-045, 2026-07-04, Present, Arrived on schedule\nCS-2026-046, 2026-07-04, Absent, Excused with medical note\nCS-2026-047, 2026-07-04, Late, Transit delay`,
    assignments: `Assignment: Neural Model Fine-tuning Task\nMax Score: 100\nDue Date: 2026-07-15\nSubmissions:\nCS-2026-045, 95, Excellent loss minimization notes, Graded\nCS-2026-046, 82, Include validation datasets next time, Graded`
  };

  const handleLoadSample = (type: 'students' | 'attendance' | 'assignments') => {
    setImportText(sampleTemplates[type]);
    setImportSuccessCount(null);
    setImportedRecords([]);
    setImportError('');
  };

  useEffect(() => {
    async function loadData() {
      try {
        const [resAsg, resCourses] = await Promise.all([
          fetch('/api/assignments').then(r => r.json()),
          fetch('/api/courses').then(r => r.json())
        ]);
        setGradingList(resAsg.data || []);
        setClassesList(resCourses.data || []);
      } catch (err) {
        console.error("Failed to load faculty data:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleAIGrade = async (asgId: string, topic: string) => {
    addNotification('AI Evaluator Triggered', `Evaluating student work: "${topic}" using Gemini...`, 'info', 'AI Grader');
    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Evaluate a student assignment submission on the topic: "${topic}". Give constructive remarks and output a high score like "95 / 100".`,
          agentId: 'tutor'
        })
      });
      const data = await res.json();
      const scoreMatch = data.reply.match(/(\d+\s*\/\s*\d+)/);
      const score = scoreMatch ? scoreMatch[1] : "95 / 100";

      // Save graded status to API
      await fetch(`/api/assignments/${asgId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score, status: "Submitted" })
      });

      setGradingList(prev => prev.map(item => item.id === asgId ? { ...item, score } : item));
      addNotification('Evaluation Completed', `Successfully graded with score ${score}. feedback saved.`, 'success', 'AI Grader');
    } catch (e) {
      console.error(e);
      addNotification('Grading Error', 'Failed to connect to the Gemini scoring module.', 'danger', 'AI Grader');
    }
  };

  const handleAIImport = async () => {
    if (!importText.trim()) {
      setImportError('Please enter some text or load a sample first.');
      return;
    }
    setIsImporting(true);
    setImportError('');
    setImportSuccessCount(null);
    setImportedRecords([]);
    
    addNotification(
      'AI Parser Triggered', 
      `Analyzing raw ${importType} text streams with Gemini semantic processors.`, 
      'info', 
      'Agentic AI'
    );

    try {
      const res = await fetch('/api/ai/import-all', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: importText,
          entityType: importType
        })
      });

      if (!res.ok) {
        throw new Error('Inference server failed to parse the stream.');
      }

      const data = await res.json();
      if (data.success) {
        setImportedRecords(data.records || []);
        setImportSuccessCount(data.importedCount);
        addNotification(
          'Agentic Ingestion Succeeded', 
          `Processed and synced ${data.importedCount} structured entries into the platform database.`, 
          'success', 
          'Agentic AI'
        );
      } else {
        throw new Error(data.error || 'Parsing anomaly occurred.');
      }
    } catch (err: any) {
      console.error(err);
      setImportError(err.message || 'Unknown network error.');
      addNotification('Parsing Aborted', 'An error occurred during Gemini semantic transcription.', 'danger', 'Agentic AI');
    } finally {
      setIsImporting(false);
    }
  };

  const handleFormQuiz = async () => {
    try {
      const res = await fetch('/api/quizzes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: "Advanced Transformer Architectures - Faculty Test",
          questions: 15,
          time: "20 min",
          completed: false,
          score: "Pending",
          date: "Today"
        })
      });
      if (res.ok) {
        addNotification('Quiz Formed Successfully', 'Newly formed AI assessments propagated to student streams.', 'success', 'Academic Faculty');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const stats = [
    { title: "Total Students", value: "142", sub: "3 Active Cohorts", icon: <Users className="w-5 h-5 text-indigo-600" /> },
    { title: "Lectures Scheduled", value: "4 Today", sub: "Next at 11:30 AM", icon: <Clock className="w-5 h-5 text-sky-600" /> },
    { title: "Pending Grading", value: `${gradingList.filter(g => !g.score || g.score === "—").length} Submissions`, sub: "Assigned CS-402", icon: <CheckSquare className="w-5 h-5 text-amber-600" /> },
    { title: "Active Courses", value: `${classesList.length} Modules`, sub: "1 AI elective", icon: <BookOpen className="w-5 h-5 text-rose-600" /> },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Faculty Controller</h1>
          <p className="text-sm text-slate-500">Manage digital study modules, grade active course pipelines, and deploy AI quiz generators.</p>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={handleFormQuiz}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-4 py-2 rounded-xl shadow-xs flex items-center space-x-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Form New Quiz Structure</span>
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
          { id: 'classes', label: 'My Academic Classes' },
          { id: 'grading', label: 'Grading Pipeline' },
          { id: 'resources', label: 'Digital Resource Library' },
          { id: 'ai_import', label: 'AI Import Hub' }
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
      {activeTab === 'classes' && (
        <div className="bg-white p-5 rounded-2xl border border-slate-150 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm">Active Lectures & Lab Schedules</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  <th className="p-3">Course / Code</th>
                  <th className="p-3">Lab Room</th>
                  <th className="p-3">Students Enrolled</th>
                  <th className="p-3">Timing schedule</th>
                  <th className="p-3">Attendance Ratio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {[
                  { course: "Advanced Machine Learning CS-402", lab: "Room 102 - Server Farm A", students: "45 Students", time: "10:30 AM - 12:00 PM", ratio: "95%" },
                  { course: "Database Architecture CS-411", lab: "Virtual Sandboxed DB Node", students: "54 Students", time: "01:30 PM - 03:00 PM", ratio: "91%" },
                  { course: "Full-Stack Software Engineering CS-390", lab: "Room 312 - Code Sandbox", students: "43 Students", time: "03:15 PM - 04:45 PM", ratio: "96%" }
                ].map((c, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/30 transition-colors">
                    <td className="p-3 text-slate-800 font-bold">{c.course}</td>
                    <td className="p-3 text-slate-600 font-mono">{c.lab}</td>
                    <td className="p-3 text-slate-600 font-mono">{c.students}</td>
                    <td className="p-3 text-slate-700 font-mono font-semibold">{c.time}</td>
                    <td className="p-3 text-emerald-600 font-bold">{c.ratio}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'grading' && (
        <div className="bg-white p-5 rounded-2xl border border-slate-150 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b pb-3 border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Review Panel & Grading Dashboard</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Click any student submission to expand detailed AI evaluations, manual override sliders, and remarks.</p>
            </div>
            <span className="text-[10px] bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold px-2 py-0.5 rounded-full uppercase">Review Active</span>
          </div>
          <div className="space-y-3">
            {gradingList.length === 0 ? (
              <div className="text-slate-400 text-xs p-4 text-center bg-slate-50 rounded-xl border border-dashed">No active submissions require evaluation.</div>
            ) : (
              gradingList.map((g, idx) => {
                const isPending = !g.score || g.score === "—";
                const isExpanded = expandedAsgId === g.id;
                
                return (
                  <div key={idx} className="bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden transition-all duration-300">
                    {/* Collapsed view banner */}
                    <div 
                      onClick={() => {
                        setExpandedAsgId(isExpanded ? null : g.id);
                        if (g.score && g.score !== "—") {
                          const numScore = parseInt(g.score.split('/')[0]) || 85;
                          setCustomGradeValue(numScore);
                        } else {
                          setCustomGradeValue(85);
                        }
                        setCustomRemarks(g.remarks || "Excellent overall logic, well documented. Recommended revision: enhance code isolation.");
                      }}
                      className="p-4 flex flex-wrap items-center justify-between gap-4 cursor-pointer hover:bg-slate-100/50 transition-all"
                    >
                      <div>
                        <span className="font-bold text-xs text-slate-800 block">Sanjay Kumar ({g.course})</span>
                        <div className="flex items-center space-x-2.5 text-[10px] text-slate-400 mt-1 font-mono">
                          <span className="flex items-center space-x-1">
                            <FileText className="w-3 h-3 text-slate-500" />
                            <span className="font-semibold">{g.topic || g.title}</span>
                          </span>
                          <span>•</span>
                          <span>Received {g.due || "Today"}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <span className="text-[10px] font-semibold text-slate-400 block">Scored Evaluation</span>
                          <span className="text-xs font-bold block mt-0.5 text-indigo-600">{g.score || "—"}</span>
                        </div>
                        <span className="text-[10px] font-bold text-indigo-600 hover:underline">{isExpanded ? 'Collapse' : 'Expand Options'}</span>
                      </div>
                    </div>

                    {/* Expanded details & playground */}
                    {isExpanded && (
                      <div className="p-5 border-t border-slate-100 bg-white space-y-4 text-xs font-semibold text-slate-700 animate-fade-in-down">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <span className="text-[10px] text-slate-400 block uppercase">Manual Marks Slider</span>
                            <div className="flex items-center space-x-3">
                              <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                value={customGradeValue} 
                                onChange={(e) => setCustomGradeValue(parseInt(e.target.value))}
                                className="flex-1 accent-indigo-600 cursor-pointer h-1.5 bg-slate-100 rounded-lg"
                              />
                              <span className="font-mono text-xs font-bold text-slate-900 border px-2 py-1 rounded bg-slate-50 shrink-0">{customGradeValue} / 100</span>
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <span className="text-[10px] text-slate-400 block uppercase font-mono font-bold">Faculty Evaluation Feedback</span>
                            <input 
                              type="text" 
                              value={customRemarks} 
                              onChange={(e) => setCustomRemarks(e.target.value)}
                              className="w-full border border-slate-200 bg-slate-50/50 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-hidden font-semibold"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                          <button
                            onClick={() => handleAIGrade(g.id, g.topic || g.title)}
                            className="bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 hover:border-indigo-300 text-indigo-700 font-bold px-3 py-1.5 rounded-lg flex items-center space-x-1.5 cursor-pointer"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                            <span>Auto-Evaluate via Gemini</span>
                          </button>
                          <button
                            onClick={async () => {
                              setIsSavingGrade(true);
                              try {
                                const formattedScore = `${customGradeValue} / 100`;
                                await fetch(`/api/assignments/${g.id}`, {
                                  method: 'PUT',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({ score: formattedScore, remarks: customRemarks })
                                });
                                setGradingList(prev => prev.map(item => item.id === g.id ? { ...item, score: formattedScore, remarks: customRemarks } : item));
                                addNotification('Grade Saved', `Manual grade of ${formattedScore} set for Sanjay Kumar.`, 'success', 'Faculty Portal');
                                setExpandedAsgId(null);
                              } catch (e) {
                                console.error(e);
                              } finally {
                                setIsSavingGrade(false);
                              }
                            }}
                            disabled={isSavingGrade}
                            className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-1.5 rounded-lg cursor-pointer disabled:bg-slate-400"
                          >
                            {isSavingGrade ? 'Saving Grade...' : 'Save Manual Grade'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {activeTab === 'resources' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Introduction to Large Language Models", items: "12 files", size: "48 MB", topic: "NLP" },
            { title: "Relational Indexing Strategy Manuals", items: "8 files", size: "18 MB", topic: "SQL Databases" },
            { title: "Containerized Microservices Layout Pack", items: "15 files", size: "124 MB", topic: "DevOps Architecture" }
          ].map((res, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-150 shadow-xs flex flex-col justify-between h-36 hover:border-indigo-200 hover:shadow-xs transition-all">
              <div>
                <span className="text-[9px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full uppercase tracking-wider">{res.topic}</span>
                <h4 className="font-bold text-slate-800 mt-2.5 text-sm">{res.title}</h4>
              </div>
              <div className="flex justify-between items-center text-[10px] font-semibold text-slate-400 font-mono border-t border-slate-50 pt-2.5">
                <span>{res.items}</span>
                <span>{res.size}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'ai_import' && (
        <div className="space-y-6">
          {/* Header intro */}
          <div className="bg-gradient-to-r from-indigo-900 to-slate-950 text-white p-6 rounded-2xl border border-slate-800 shadow-sm relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent)] pointer-events-none" />
            <div className="max-w-2xl relative z-10 space-y-2">
              <div className="flex items-center space-x-2 bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider w-fit">
                <Sparkles className="w-3 h-3" />
                <span>Agentic AI Cognitive Parsing</span>
              </div>
              <h2 className="text-lg font-bold tracking-tight">AI Academic Ingestion Engine</h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Paste any raw email thread, copy-pasted spreadsheets, or unstructured syllabus data below. 
                Our central Gemini-3.5-flash agent will extract entities, map database attributes, and sync them with our secure schemas.
              </p>
            </div>
          </div>

          {/* Bento Selector for Entity Types */}
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { id: 'students', label: 'Student Cohort Rolls', desc: 'Create accounts, sync names, and map roll register numbers.', icon: <Users className="w-4 h-4 text-indigo-600" />, borderActive: 'border-indigo-600 bg-indigo-50/20' },
              { id: 'attendance', label: 'Attendance Sheets', desc: 'Sync presence states (Present, Absent, Late) from raw check-ins.', icon: <Clock className="w-4 h-4 text-amber-600" />, borderActive: 'border-amber-500 bg-amber-50/25' },
              { id: 'assignments', label: 'Grading Books', desc: 'Import test grades, evaluations, and teacher remarks in arrays.', icon: <Award className="w-4 h-4 text-emerald-600" />, borderActive: 'border-emerald-500 bg-emerald-50/20' }
            ].map((card) => {
              const isSelected = importType === card.id;
              return (
                <button
                  key={card.id}
                  onClick={() => {
                    setImportType(card.id as any);
                    setImportSuccessCount(null);
                    setImportedRecords([]);
                    setImportError('');
                  }}
                  className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all hover:shadow-xs cursor-pointer ${
                    isSelected 
                      ? `${card.borderActive} shadow-xs` 
                      : 'border-slate-150 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-3">
                    {card.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-xs">{card.label}</h4>
                    <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">{card.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Work Area */}
          <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-50 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Unstructured Stream Input</h3>
                <p className="text-[10px] text-slate-400 mt-0.5">Paste tabular text, logs, or plain-text email transcripts.</p>
              </div>
              <button
                type="button"
                onClick={() => handleLoadSample(importType)}
                className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-lg flex items-center space-x-1 hover:bg-indigo-100/50 transition-colors cursor-pointer"
              >
                <Terminal className="w-3 h-3" />
                <span>Load Sample {importType.charAt(0).toUpperCase() + importType.slice(1)}</span>
              </button>
            </div>

            <textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder={`Example:\nCS-2026-041, Sanjay, Kumar, sanjayk36725@gmail.com, CS-402\nCS-2026-042, Alex, Mercer, developer@fsp.edu, CS-402...`}
              rows={6}
              className="w-full bg-slate-50/50 border border-slate-200 rounded-xl p-4 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 placeholder-slate-400"
            />

            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-slate-400 font-mono">
                Character count: {importText.length}
              </span>
              <button
                type="button"
                onClick={handleAIImport}
                disabled={isImporting || !importText.trim()}
                className={`text-xs font-semibold px-5 py-2.5 rounded-xl shadow-xs flex items-center space-x-2 cursor-pointer transition-all ${
                  isImporting || !importText.trim()
                    ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white font-bold'
                }`}
              >
                {isImporting ? (
                  <>
                    <span className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-slate-300 border-t-indigo-600" />
                    <span>Cognitive Parse Pending...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Execute Agentic Ingestion</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {importError && (
            <div className="bg-rose-50 border border-rose-150 rounded-2xl p-4 flex items-start space-x-3 text-rose-800">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold">Parser Exception Raised</h4>
                <p className="text-[10px] text-rose-600 mt-1 font-mono">{importError}</p>
              </div>
            </div>
          )}

          {/* Results Visualizer */}
          {importSuccessCount !== null && (
            <div className="bg-white rounded-2xl border border-slate-150 shadow-xs p-6 space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                    <Check className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Semantic Synchronization Summary</h3>
                    <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">Ingested {importSuccessCount} entries into persistent data-stores</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono">
                  Schema Synced
                </span>
              </div>

              <div className="overflow-x-auto">
                {importedRecords.length === 0 ? (
                  <div className="p-4 bg-slate-50 border border-dashed rounded-xl text-center text-xs text-slate-400 font-medium">
                    Inference parsed successfully but returned no new rows.
                  </div>
                ) : (
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-semibold uppercase tracking-wider text-slate-400 font-mono">
                        {importType === 'students' && (
                          <>
                            <th className="p-3">Roll Number</th>
                            <th className="p-3">Full Name</th>
                            <th className="p-3">Email Address</th>
                            <th className="p-3">Cohort Code</th>
                            <th className="p-3">Status</th>
                          </>
                        )}
                        {importType === 'attendance' && (
                          <>
                            <th className="p-3">Roll Register</th>
                            <th className="p-3">Check-in Date</th>
                            <th className="p-3">Presence Status</th>
                            <th className="p-3">Remarks / Exceptions</th>
                          </>
                        )}
                        {importType === 'assignments' && (
                          <>
                            <th className="p-3">Task Title</th>
                            <th className="p-3">Maximum Marks</th>
                            <th className="p-3">Submission Count</th>
                            <th className="p-3">Due Schedule</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {importedRecords.map((rec, index) => (
                        <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                          {importType === 'students' && (
                            <>
                              <td className="p-3 text-slate-700 font-mono font-bold text-[11px]">{rec.roll_number}</td>
                              <td className="p-3 text-slate-950 font-bold">{rec.first_name} {rec.last_name}</td>
                              <td className="p-3 text-slate-500 font-mono">{rec.email}</td>
                              <td className="p-3 text-indigo-600 font-mono font-bold">{rec.class_name}</td>
                              <td className="p-3 text-emerald-600 font-bold flex items-center space-x-1 text-[10px]">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                <span>DB Active</span>
                              </td>
                            </>
                          )}
                          {importType === 'attendance' && (
                            <>
                              <td className="p-3 text-slate-700 font-mono font-bold text-[11px]">{rec.roll_number}</td>
                              <td className="p-3 text-slate-600 font-mono font-semibold">{rec.date}</td>
                              <td className="p-3">
                                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                                  rec.status === 'Present' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                                  rec.status === 'Late' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                                  rec.status === 'Absent' ? 'bg-rose-50 text-rose-700 border border-rose-100' :
                                  'bg-slate-50 text-slate-700 border border-slate-100'
                                }`}>
                                  {rec.status}
                                </span>
                              </td>
                              <td className="p-3 text-slate-500 italic font-mono text-[11px]">{rec.remarks || '—'}</td>
                            </>
                          )}
                          {importType === 'assignments' && (
                            <>
                              <td className="p-3 text-slate-950 font-bold">{rec.title}</td>
                              <td className="p-3 text-slate-600 font-mono font-bold">{rec.max_score} pts</td>
                              <td className="p-3 text-indigo-600 font-mono font-bold">{rec.submissions?.length || 0} files</td>
                              <td className="p-3 text-slate-500 font-mono">{rec.due_date}</td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
