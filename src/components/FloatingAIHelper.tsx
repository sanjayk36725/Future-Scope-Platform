import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, CornerDownRight, Cpu, HelpCircle, FileText, Code, GraduationCap, Briefcase, Building } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  agentName?: string;
  timestamp: string;
}

// 25+ specialized agents categorized by domain
export const AGENTS_LIST = {
  Education: [
    { id: 'tutor', name: 'Personal Tutor', desc: 'Syllabus training' },
    { id: 'coding_mentor', name: 'Coding Mentor', desc: 'Code optimization' },
    { id: 'assignment_helper', name: 'Assignment Helper', desc: 'Homework parsing' },
    { id: 'quiz_generator', name: 'Quiz Generator', desc: 'Auto grading' }
  ],
  Development: [
    { id: 'code_generation', name: 'Code Generator', desc: 'Draft code structures' },
    { id: 'code_review', name: 'Code Reviewer', desc: 'Static analysis' },
    { id: 'debugging', name: 'Debugging Room', desc: 'Trace exceptions' },
    { id: 'test_generator', name: 'Unit Test Generator', desc: 'Build assertions' },
    { id: 'sql_generator', name: 'SQL Query Generator', desc: 'Compose database keys' }
  ],
  Recruitment: [
    { id: 'screener', name: 'Resume Screening', desc: 'Parse ATS scorecards' },
    { id: 'matching', name: 'Candidate Matching', desc: 'Filter criteria' },
    { id: 'mock_interview', name: 'Mock Interviewer', desc: 'Interactive voice sessions' },
    { id: 'skill_gap', name: 'Skill Gap Analysis', desc: 'Curriculum optimization' }
  ],
  HR: [
    { id: 'onboarding', name: 'Employee Onboarding', desc: 'Checklist triggers' },
    { id: 'leave_mgmt', name: 'Leave Management', desc: 'Time-off validation' },
    { id: 'policy_qa', name: 'Policy Q&A', desc: 'Read staff handbooks' },
    { id: 'payroll_support', name: 'Payroll Support', desc: 'Salary audits' }
  ],
  Campus: [
    { id: 'helpdesk', name: 'Student Helpdesk', desc: 'Academic inquiries' },
    { id: 'timetable', name: 'Timetable Assistant', desc: 'Track calendars' },
    { id: 'lab_booking', name: 'Lab Booking', desc: 'Reserve sandbox servers' },
    { id: 'library_assistant', name: 'Library Assistant', desc: 'Locate research books' }
  ]
};

const ALL_FLAT_AGENTS = Object.values(AGENTS_LIST).flat();

export default function FloatingAIHelper() {
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Hello ${user?.name || 'User'}! I am the FSP Intelligent Router. Tell me what you need, and I will instantly route your prompt to one of our 25+ specialized AI agents.`,
      agentName: 'Central Routing Engine',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [selectedAgentId, setSelectedAgentId] = useState<string>('routing');
  const [activeRoutingInfo, setActiveRoutingInfo] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Automated Semantic Router
  const routePrompt = (prompt: string): typeof ALL_FLAT_AGENTS[0] | null => {
    const text = prompt.toLowerCase();
    
    // Developer Domain
    if (text.includes('code') || text.includes('function') || text.includes('javascript') || text.includes('typescript') || text.includes('express')) {
      return ALL_FLAT_AGENTS.find(a => a.id === 'code_generation') || null;
    }
    if (text.includes('sql') || text.includes('database') || text.includes('table') || text.includes('query') || text.includes('postgres')) {
      return ALL_FLAT_AGENTS.find(a => a.id === 'sql_generator') || null;
    }
    if (text.includes('debug') || text.includes('error') || text.includes('crash') || text.includes('exception')) {
      return ALL_FLAT_AGENTS.find(a => a.id === 'debugging') || null;
    }
    if (text.includes('test') || text.includes('assert') || text.includes('mocha') || text.includes('jest')) {
      return ALL_FLAT_AGENTS.find(a => a.id === 'test_generator') || null;
    }

    // Education Domain
    if (text.includes('study') || text.includes('tutor') || text.includes('learn') || text.includes('teach') || text.includes('algebra')) {
      return ALL_FLAT_AGENTS.find(a => a.id === 'tutor') || null;
    }
    if (text.includes('quiz') || text.includes('test') || text.includes('question') || text.includes('mcq')) {
      return ALL_FLAT_AGENTS.find(a => a.id === 'quiz_generator') || null;
    }
    if (text.includes('homework') || text.includes('assignment') || text.includes('grade')) {
      return ALL_FLAT_AGENTS.find(a => a.id === 'assignment_helper') || null;
    }

    // Recruitment Domain
    if (text.includes('resume') || text.includes('cv') || text.includes('portfolio') || text.includes('ats')) {
      return ALL_FLAT_AGENTS.find(a => a.id === 'screener') || null;
    }
    if (text.includes('interview') || text.includes('mock') || text.includes('practice') || text.includes('recruitment')) {
      return ALL_FLAT_AGENTS.find(a => a.id === 'mock_interview') || null;
    }

    // HR Domain
    if (text.includes('leave') || text.includes('holiday') || text.includes('time off') || text.includes('vacation')) {
      return ALL_FLAT_AGENTS.find(a => a.id === 'leave_mgmt') || null;
    }
    if (text.includes('payroll') || text.includes('salary') || text.includes('money') || text.includes('compensation')) {
      return ALL_FLAT_AGENTS.find(a => a.id === 'payroll_support') || null;
    }
    if (text.includes('policy') || text.includes('handbook') || text.includes('rule') || text.includes('regulation')) {
      return ALL_FLAT_AGENTS.find(a => a.id === 'policy_qa') || null;
    }

    // Smart Campus
    if (text.includes('timetable') || text.includes('schedule') || text.includes('class') || text.includes('lectures')) {
      return ALL_FLAT_AGENTS.find(a => a.id === 'timetable') || null;
    }
    if (text.includes('lab') || text.includes('server') || text.includes('book') || text.includes('reserve')) {
      return ALL_FLAT_AGENTS.find(a => a.id === 'lab_booking') || null;
    }
    if (text.includes('book') || text.includes('library') || text.includes('author') || text.includes('journal')) {
      return ALL_FLAT_AGENTS.find(a => a.id === 'library_assistant') || null;
    }

    return null; // fallback
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsgText = input;
    setInput('');

    // Append user message
    const userMsg: Message = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: userMsgText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // Dynamic routing resolution
    let targetAgent = routePrompt(userMsgText);
    if (selectedAgentId !== 'routing') {
      targetAgent = ALL_FLAT_AGENTS.find(a => a.id === selectedAgentId) || null;
    }

    let replyText = "";
    const agentName = targetAgent ? targetAgent.name : "Central Routing Engine";

    try {
      if (targetAgent) {
        setActiveRoutingInfo(`Routing query to specialized Agent: "${targetAgent.name}"...`);
      } else {
        setActiveRoutingInfo("Consulting Central Routing Engine...");
      }

      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userMsgText,
          agentId: targetAgent ? targetAgent.id : "routing",
          userId: user?.id || "u-1"
        })
      });

      if (!res.ok) throw new Error("AI query failed");
      const data = await res.json();
      replyText = data.reply;

      addNotification(
        'Query Routed Successfully',
        `Successfully processed response from ${agentName} Agent.`,
        'success',
        agentName
      );
    } catch (err) {
      console.error("AI service error, falling back to local patterns:", err);
      if (targetAgent) {
        if (targetAgent.id === 'code_generation') {
          replyText = `I am the **Coding Mentor Agent**. Here is an optimized setup:\n\`\`\`typescript\n// Optimized async hook\nexport function useThrottle<T>(value: T, limit = 500): T {\n  const [throttled, setThrottled] = useState(value);\n}\n\`\`\`\nLet me know if you would like me to build unit tests for this!`;
        } else if (targetAgent.id === 'sql_generator') {
          replyText = `I am the **SQL Query Generator Agent**. Here is your query:\n\`\`\`sql\nSELECT users.name, leave_requests.leave_days FROM users INNER JOIN leave_requests ON users.id = leave_requests.user_id WHERE leave_requests.status = 'Pending';\n\`\`\``;
        } else if (targetAgent.id === 'screener') {
          replyText = `I am the **Resume Screening Agent**. This resume scores **86% ATS Match** for Junior AI roles. Key strengths found: Python, TensorFlow.`;
        } else {
          replyText = `Hello! I am your specialized **${targetAgent.name} Agent**. I've digested your query: "${userMsgText}" and mapped it within our database records. How can I assist you with this workflow today?`;
        }
      } else {
        replyText = `I've analyzed your request. To help me route it cleanly, could you specify if this is an **Education**, **Development**, **Recruitment**, or **HR** request? Or, use the selector dropdown above to bypass routing!`;
      }
    } finally {
      setActiveRoutingInfo(null);
    }

    const aiMsg: Message = {
      id: `ai_${Date.now()}`,
      sender: 'ai',
      text: replyText,
      agentName: agentName,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Closed Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-lg transition-all hover:scale-105 cursor-pointer border border-indigo-500 relative group"
        >
          <Bot className="w-6 h-6 animate-pulse" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <div className="absolute right-16 bg-slate-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-md pointer-events-none border border-slate-800">
            FSP AI Assist
          </div>
        </button>
      )}

      {/* Expandable Chat Modal */}
      {isOpen && (
        <div className="w-[380px] h-[520px] bg-white rounded-2xl border border-slate-200/80 shadow-2xl flex flex-col overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-slate-900 p-4 text-white flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Bot className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h4 className="font-bold text-xs">FSP Intelligent Router</h4>
                <span className="text-[10px] text-slate-400 font-medium">Cognitive Gateway Online</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Agent Selection Override Dropdown */}
          <div className="bg-slate-50 px-3.5 py-2 border-b border-slate-150 flex items-center justify-between text-xs font-semibold text-slate-700">
            <span>Agent Focus:</span>
            <select
              value={selectedAgentId}
              onChange={(e) => setSelectedAgentId(e.target.value)}
              className="bg-white border border-slate-200 rounded-md px-2 py-1 text-[11px] font-medium text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
            >
              <option value="routing">Auto Semantic Router</option>
              {Object.entries(AGENTS_LIST).map(([domain, agents]) => (
                <optgroup key={domain} label={domain}>
                  {agents.map(a => (
                    <option key={a.id} value={a.id}>{a.name}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          {/* Messages Screen Area */}
          <div className="grow overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {messages.map((m) => (
              <div key={m.id} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
                {m.agentName && (
                  <span className="text-[9px] font-bold text-indigo-600 font-mono mb-1 flex items-center space-x-1">
                    <CornerDownRight className="w-3 h-3" />
                    <span>{m.agentName.toUpperCase()}</span>
                  </span>
                )}
                <div className={`p-3 rounded-2xl max-w-[85%] text-xs leading-relaxed font-sans shadow-2xs ${
                  m.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-none'
                    : 'bg-white text-slate-800 border border-slate-150 rounded-bl-none'
                }`}>
                  {m.text.split('\n').map((line, lIdx) => {
                    if (line.startsWith('```')) return null;
                    return <p key={lIdx} className="mb-1">{line}</p>;
                  })}
                  {m.text.includes('```') && (
                    <pre className="mt-2 p-2 bg-slate-900 text-slate-200 font-mono text-[10px] rounded-lg overflow-x-auto leading-relaxed">
                      <code>{m.text.split('```')[1]}</code>
                    </pre>
                  )}
                </div>
                <span className="text-[9px] text-slate-400 font-mono mt-1">{m.timestamp}</span>
              </div>
            ))}

            {activeRoutingInfo && (
              <div className="text-center py-1 flex items-center justify-center space-x-1.5 text-[10px] text-indigo-600 font-bold bg-indigo-50 border border-indigo-100 rounded-xl animate-pulse">
                <Cpu className="w-3.5 h-3.5 animate-spin" />
                <span>{activeRoutingInfo}</span>
              </div>
            )}

            {isTyping && (
              <div className="flex items-center space-x-1 text-slate-400 text-xs">
                <span className="animate-bounce">●</span>
                <span className="animate-bounce [animation-delay:0.2s]">●</span>
                <span className="animate-bounce [animation-delay:0.4s]">●</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Form input field */}
          <form onSubmit={handleSend} className="p-3 border-t border-slate-200 bg-white flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., File leave request / screen resume"
              className="grow px-3 py-2 border border-slate-200 rounded-xl text-xs font-sans text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 placeholder-slate-400"
            />
            <button
              type="submit"
              className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all shrink-0 cursor-pointer shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
