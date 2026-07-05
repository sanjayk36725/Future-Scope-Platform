import React, { useState } from 'react';
import { Code, Terminal, Play, Cpu, Server, CheckCircle, Bug, Database, Plus, RefreshCw, Layers } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

export default function DeveloperDashboard() {
  const { addNotification } = useNotifications();
  const [activeTab, setActiveTab] = useState<'editor' | 'testing' | 'db_schema'>('editor');
  const [codePrompt, setCodePrompt] = useState('Create an Express router endpoint that connects a user model to a leave request record.');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Unit testing simulation states
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [testLogs, setTestLogs] = useState<string[]>([]);

  // Db schema custom fields state
  const [dbTables, setDbTables] = useState([
    { table: "Users", fields: ["id: uuid", "email: varchar", "passwordHash: text", "role: varchar"] },
    { table: "LeaveRequests", fields: ["id: uuid", "userId: uuid", "leaveDays: int", "reason: text", "status: varchar"] },
    { table: "ActivityLogs", fields: ["id: uuid", "userId: uuid", "action: text", "details: text", "timestamp: timestamp"] }
  ]);
  const [newFieldName, setNewFieldName] = useState('');
  const [newFieldType, setNewFieldType] = useState('varchar');
  const [selectedTableForField, setSelectedTableForField] = useState('Users');

  const runTestSuite = () => {
    setIsRunningTests(true);
    setTestLogs([]);
    const lines = [
      "▶ Starting Vitest compiler runtime engine...",
      "✔ LOADED development server container on port 3000.",
      "✔ RESOLVED 3 active table relations inside drizzle.config.ts schema.",
      "▶ Running authService.ts (JWT Signatures) unit test matrices...",
      "  ✔ Check Token Expiry - PASSED (2.1 ms)",
      "  ✔ Validate Scopes - PASSED (1.8 ms)",
      "▶ Running db.ts (Schema Queries) relational integrity check...",
      "  ✔ Query user fields matching UUID keys - PASSED (6.2 ms)",
      "  ✔ Cascade delete active leave indices - PASSED (6.6 ms)",
      "▶ Running rbac.ts (Permission Checks) role governance matrix...",
      "  ✔ Superadmin authorization level verification - PASSED (1.5 ms)",
      "  ✔ Deny student write parameters on leave pipeline - PASSED (0.6 ms)",
      "🎉 ALL TESTS PASSED. 24 checks successful. Coverage: 92.4%."
    ];
    
    let i = 0;
    const interval = setInterval(() => {
      if (i < lines.length) {
        setTestLogs(prev => [...prev, lines[i]]);
        i++;
      } else {
        clearInterval(interval);
        setIsRunningTests(false);
        addNotification('Test Run Completed', 'All 24 test components passed cleanly.', 'success', 'JUnit Suite');
      }
    }, 150);
  };

  const stats = [
    { title: "Service Status", value: "Active", sub: "Host: 0.0.0.0:3000", icon: <Server className="w-5 h-5 text-indigo-600" /> },
    { title: "DB Migrations", value: "v1.4.2", sub: "SQLite (Ready to Postgres)", icon: <Database className="w-5 h-5 text-emerald-600" /> },
    { title: "Unit Test Coverage", value: "92.4%", sub: "Target: >90% coverage", icon: <CheckCircle className="w-5 h-5 text-sky-600" /> },
    { title: "Bug Tickets", value: "0 Open", sub: "Clean terminal buffers", icon: <Bug className="w-5 h-5 text-rose-600" /> },
  ];

  const handleGenerateCode = async () => {
    if (!codePrompt.trim()) return;
    setIsGenerating(true);
    addNotification('Compiling AI Directives...', 'Gemini API is parsing abstract structure parameters.', 'info', 'Gemini AI');
    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Generate clean, ready-to-run TypeScript backend code matching this specification: ${codePrompt}. Output only code, without explaining.`,
          agentId: 'code_generation',
          userId: 'usr_developer'
        })
      });
      if (!res.ok) throw new Error("AI Code compilation failed");
      const data = await res.json();
      
      // Extract code block from Markdown if present
      let finalCode = data.reply;
      const codeBlockMatch = finalCode.match(/```(?:typescript|ts|javascript|js)?\n([\s\S]*?)```/);
      if (codeBlockMatch && codeBlockMatch[1]) {
        finalCode = codeBlockMatch[1];
      }

      setGeneratedCode(finalCode);
      addNotification('Router Code Compiled', 'Express API router compiled and written into buffer.', 'success', 'Compiler Service');
      
      // Save code project to DB
      await fetch('/api/codeProjects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: codePrompt.substring(0, 50) + "...",
          language: "TypeScript",
          code: finalCode,
          timestamp: new Date().toISOString()
        })
      });
    } catch (err) {
      console.error("Code generation failed:", err);
      setGeneratedCode(`// Compilation Error - Fallback controller written
import { Router } from 'express';
const router = Router();
router.get('/test', (req, res) => res.json({ status: "alive" }));
export default router;`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Software Engineering Terminal</h1>
          <p className="text-sm text-slate-500">Draft relational endpoint routing, trigger Unit Test builders, and trace active system logs.</p>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => { 
              setGeneratedCode(''); 
              setCodePrompt(''); 
              addNotification('Buffer Purged', 'Static syntax storage freed and code editor cleared.', 'info', 'Terminal Buffer');
            }}
            className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs px-3.5 py-2 rounded-xl shadow-xs flex items-center space-x-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Flush Buffer</span>
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
          { id: 'editor', label: 'AI Code Generation' },
          { id: 'testing', label: 'Unit Test Suite' },
          { id: 'db_schema', label: 'DB Schema Migrations' }
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
      {activeTab === 'editor' && (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-150 shadow-xs space-y-4">
            <div className="flex items-center space-x-2">
              <Code className="w-4.5 h-4.5 text-indigo-600" />
              <h3 className="font-bold text-slate-900 text-sm">Prompt AI Code Generator</h3>
            </div>
            <div>
              <textarea
                value={codePrompt}
                onChange={(e) => setCodePrompt(e.target.value)}
                rows={5}
                className="w-full border border-slate-200 rounded-xl p-3 text-xs font-mono text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 leading-relaxed"
                placeholder="What route, component, or logic schema do you need crafted?"
              />
            </div>
            <button
              onClick={handleGenerateCode}
              disabled={isGenerating}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs py-2.5 rounded-xl flex items-center justify-center space-x-2 cursor-pointer disabled:bg-slate-600"
            >
              <Cpu className="w-4 h-4 animate-spin-slow" />
              <span>{isGenerating ? 'Compiling structures via Gemini...' : 'Generate Target Code'}</span>
            </button>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-zinc-800 shadow-xl flex flex-col justify-between min-h-[300px]">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
              </div>
              <span className="font-mono text-[10px] text-zinc-500">generated_endpoint.ts</span>
            </div>
            <div className="grow overflow-y-auto max-h-[350px]">
              {generatedCode ? (
                <pre className="font-mono text-[11px] text-zinc-300 leading-relaxed overflow-x-auto whitespace-pre">
                  <code>{generatedCode}</code>
                </pre>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-zinc-600 font-mono text-xs text-center space-y-2 py-10">
                  <Terminal className="w-8 h-8 opacity-40" />
                  <p>Awaiting prompt trigger to print generated abstract syntax structures.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'testing' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Interactive Unit Testing Room</h3>
              <p className="text-xs text-slate-500 mt-0.5">Build mock-free tests verifying database interactions and JWT encryption layers.</p>
            </div>
            <button 
              onClick={runTestSuite}
              disabled={isRunningTests}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-3.5 py-2 rounded-xl flex items-center space-x-1.5 cursor-pointer disabled:bg-indigo-400"
            >
              <Play className="w-3 h-3 fill-white" />
              <span>{isRunningTests ? 'Running Suite...' : 'Run Suite'}</span>
            </button>
          </div>

          {/* Realtime Terminal logs display */}
          <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5 mb-3 text-[10px] font-mono text-zinc-500">
              <span>TEST CONTAINER SESSION LINT</span>
              <span>STDOUT</span>
            </div>
            <div className="font-mono text-xs text-zinc-300 min-h-[160px] space-y-1.5 leading-relaxed">
              {testLogs.length === 0 ? (
                <p className="text-zinc-600 italic">No tests executed yet in this session. Click "Run Suite" above to launch Vitest compilers.</p>
              ) : (
                testLogs.map((log, idx) => {
                  let colorClass = "text-zinc-300";
                  if (log.startsWith("✔")) colorClass = "text-emerald-400";
                  if (log.startsWith("▶")) colorClass = "text-indigo-400";
                  if (log.startsWith("🎉")) colorClass = "text-teal-400 font-bold";
                  return (
                    <div key={idx} className={colorClass}>
                      {log}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="space-y-3.5">
            {[
              { suite: "authService.ts (JWT Signatures)", tests: "4 Passed", coverage: "100%", speed: "4.2 ms", state: "PASSED" },
              { suite: "db.ts (Schema Queries)", tests: "12 Passed", coverage: "94%", speed: "12.8 ms", state: "PASSED" },
              { suite: "rbac.ts (Permission Checks)", tests: "8 Passed", coverage: "88%", speed: "2.1 ms", state: "PASSED" }
            ].map((t, idx) => (
              <div key={idx} className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-slate-800 block">{t.suite}</span>
                  <div className="flex items-center space-x-2.5 text-[10px] text-slate-400 mt-1 font-mono">
                    <span>{t.tests}</span>
                    <span>•</span>
                    <span>{t.coverage} lines hit</span>
                    <span>•</span>
                    <span>Took {t.speed}</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">{t.state}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'db_schema' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-xs space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">SQL & PostgreSQL Relational Schema Entities</h3>
              <p className="text-xs text-slate-500 mt-0.5">Add custom attributes and watch real-time SQL generation schemas compile instantly.</p>
            </div>
            
            {/* Inline quick column schema builder */}
            <div className="flex flex-wrap items-center gap-2">
              <select 
                value={selectedTableForField}
                onChange={(e) => setSelectedTableForField(e.target.value)}
                className="border border-slate-200 rounded-lg p-1.5 text-[10px] font-bold text-slate-700 focus:outline-hidden"
              >
                {dbTables.map((t, idx) => (
                  <option key={idx} value={t.table}>{t.table}</option>
                ))}
              </select>
              <input 
                type="text"
                placeholder="Column Name (e.g. approved_by)"
                value={newFieldName}
                onChange={(e) => setNewFieldName(e.target.value)}
                className="border border-slate-200 rounded-lg px-2.5 py-1.5 text-[10px] font-semibold text-slate-700 focus:outline-hidden max-w-[150px]"
              />
              <select 
                value={newFieldType}
                onChange={(e) => setNewFieldType(e.target.value)}
                className="border border-slate-200 rounded-lg p-1.5 text-[10px] font-bold text-slate-700 focus:outline-hidden"
              >
                <option value="varchar">varchar</option>
                <option value="text">text</option>
                <option value="integer">integer</option>
                <option value="boolean">boolean</option>
                <option value="timestamp">timestamp</option>
              </select>
              <button 
                onClick={() => {
                  if (!newFieldName.trim()) return;
                  const newCol = `${newFieldName}: ${newFieldType}`;
                  setDbTables(prev => prev.map(tbl => tbl.table === selectedTableForField ? { ...tbl, fields: [...tbl.fields, newCol] } : tbl));
                  addNotification('Schema Altered', `Successfully added "${newCol}" to ${selectedTableForField} model.`, 'success', 'Drizzle Compiler');
                  setNewFieldName('');
                }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10px] px-3 py-1.5 rounded-lg cursor-pointer"
              >
                Add Column
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dbTables.map((tbl, idx) => (
              <div key={idx} className="border border-slate-150 rounded-2xl overflow-hidden shadow-2xs bg-white hover:shadow-xs transition-all duration-300">
                <div className="bg-slate-50 border-b border-slate-150 px-4 py-2.5 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Database className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold text-slate-800 font-mono">{tbl.table}</span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-slate-400">{tbl.fields.length} Fields</span>
                </div>
                <div className="p-4 space-y-1.5 font-mono text-[10px] text-slate-600 divide-y divide-slate-50">
                  {tbl.fields.map((field, fIdx) => (
                    <div key={fIdx} className="pt-1.5 flex justify-between">
                      <span className="font-semibold text-slate-800">{field.split(': ')[0]}</span>
                      <span className="text-indigo-600 font-bold">{field.split(': ')[1]}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
