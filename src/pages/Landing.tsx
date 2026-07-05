import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, Code2, Users, Briefcase, Building2, Bot, ArrowRight, CheckCircle, 
  ArrowLeft, Play, Send, Terminal, Settings, Activity, Database, Search, Plus, 
  Sparkles, RefreshCw, FileText, CheckCircle2, Award, BookOpen, Trash2, Cpu, 
  HelpCircle, Heart, ShieldAlert, TrendingUp, Coins, Calendar, DollarSign, Clock, 
  Filter, PlayCircle, BarChart3, Layers, Check, X, Shield, Lock, Laptop, CheckSquare
} from 'lucide-react';

export default function Landing() {
  // Main landing vs Specs Explorer toggle
  const [showSpecsExplorer, setShowSpecsExplorer] = useState(false);
  const [activeSpecDomain, setActiveSpecDomain] = useState<'education' | 'engineering' | 'placement' | 'hrms' | 'campus'>('education');
  const [activeSpecSubPage, setActiveSpecSubPage] = useState<number>(0);

  // States for interactive specifications elements
  // 1. Intelligent Education Specs States
  const [eduTutorQuery, setEduTutorQuery] = useState('Explain Transformers KV Cache');
  const [eduTutorResponse, setEduTutorResponse] = useState('');
  const [eduTutorLoading, setEduTutorLoading] = useState(false);
  const [eduActiveTopic, setEduActiveTopic] = useState('Transformers');
  const [eduGradingMode, setEduGradingMode] = useState<'normal' | 'strict' | 'playful'>('normal');
  const [eduQuizTopic, setEduQuizTopic] = useState('React 19 Server Components');
  const [eduQuizCreated, setEduQuizCreated] = useState(false);
  const [eduQuizAnswers, setEduQuizAnswers] = useState<Record<number, number>>({});
  const [eduQuizSubmitted, setEduQuizSubmitted] = useState(false);
  const [eduAnalyticsFilter, setEduAnalyticsFilter] = useState<'grades' | 'attendance' | 'completion'>('grades');

  // 2. Software Engineering Specs States
  const [engPrompt, setEngPrompt] = useState('Create a JWT verification route with role check');
  const [engLang, setEngLang] = useState<'typescript' | 'python'>('typescript');
  const [engCodeOutput, setEngCodeOutput] = useState('');
  const [engCodeLoading, setEngCodeLoading] = useState(false);
  const [engActiveRelation, setEngActiveRelation] = useState<'users-leaves' | 'users-logs' | 'assignments-grades' | null>(null);
  const [engTestStatus, setEngTestStatus] = useState<'idle' | 'running' | 'completed'>('idle');
  const [engTestLogs, setEngTestLogs] = useState<string[]>([]);
  const [engPrReviewed, setEngPrReviewed] = useState(false);

  // 3. Placement & Recruitment Specs States
  const [recResumeText, setRecResumeText] = useState('Alex Mercer\nSenior Software Engineer\nSkills: React, TypeScript, Node.js, PostgreSQL, AWS\nExperience: Built scalable microservices, led engineering teams.');
  const [recAtsResults, setRecAtsResults] = useState<any>(null);
  const [recAtsLoading, setRecAtsLoading] = useState(false);
  const [recHeatmapRole, setRecHeatmapRole] = useState<'frontend' | 'backend' | 'manager'>('frontend');
  const [recInterviewQuestion, setRecInterviewQuestion] = useState('How do you handle race conditions in database transactions?');
  const [recInterviewAnswer, setRecInterviewAnswer] = useState('I use optimistic locking with a version field or pessimistic locking using SELECT FOR UPDATE depending on conflicts.');
  const [recInterviewReview, setRecInterviewReview] = useState<any>(null);
  const [recInterviewLoading, setRecInterviewLoading] = useState(false);

  // 4. Enterprise HRMS Specs States
  const [hrmsChecklist, setHrmsChecklist] = useState<Record<string, boolean>>({
    'contract': true,
    'identity': true,
    'laptop': false,
    'slack': false,
    'orientation': false
  });
  const [hrmsLeaveType, setHrmsLeaveType] = useState('Casual Leave');
  const [hrmsLeaveReason, setHrmsLeaveReason] = useState('Family gathering over the weekend');
  const [hrmsLeaveDays, setHrmsLeaveDays] = useState(2);
  const [hrmsLeaveQueue, setHrmsLeaveQueue] = useState([
    { id: 1, name: 'Sanjay Kumar', type: 'Sick Leave', days: 1, reason: 'Flu symptoms', status: 'Pending' },
    { id: 2, name: 'Dr. Evelyn Carter', type: 'Casual Leave', days: 3, reason: 'Academic symposium', status: 'Pending' }
  ]);
  const [hrmsBonusMultiplier, setHrmsBonusMultiplier] = useState(1.0);
  const [hrmsPolicyQuery, setHrmsPolicyQuery] = useState('maternity');
  const [hrmsPolicyAnswer, setHrmsPolicyAnswer] = useState('');

  // 5. Smart Campus Management Specs States
  const [campusAssetType, setCampusAssetType] = useState('Hostel Furniture');
  const [campusAssetDesc, setCampusAssetDesc] = useState('Slight crack on study desk leg in Room 402, Block A');
  const [campusAssetTimeline, setCampusAssetTimeline] = useState<any[]>([]);
  const [campusLibSlot, setCampusLibSlot] = useState('10:00 AM - 12:00 PM');
  const [campusLibCubicle, setCampusLibCubicle] = useState('Cubicle 14 (Silent Zone)');
  const [campusLibPass, setCampusLibPass] = useState<any>(null);
  const [campusActiveDay, setCampusActiveDay] = useState<'monday' | 'wednesday' | 'friday'>('monday');
  const [campusDuesPaid, setCampusDuesPaid] = useState(false);
  const [campusPaying, setCampusPaying] = useState(false);

  const features = [
    {
      icon: <GraduationCap className="w-6 h-6 text-indigo-500" />,
      title: "Intelligent Education",
      desc: "Personalized Study Tutors, automated code mentoring, auto-generated learning assessments, and custom quiz creators tailored to academic performance.",
      domain: "education"
    },
    {
      icon: <Code2 className="w-6 h-6 text-emerald-500" />,
      title: "Software Engineering",
      desc: "Instant AI code-generation, interactive debugging rooms, API schemas automation, and real-time pull request analysis modules.",
      domain: "engineering"
    },
    {
      icon: <Briefcase className="w-6 h-6 text-amber-500" />,
      title: "Placement & Recruitment",
      desc: "Applicant Tracking System (ATS) parsing, skill-gap identification matrices, interactive coding tests, and custom Mock AI Interviews.",
      domain: "placement"
    },
    {
      icon: <Users className="w-6 h-6 text-rose-500" />,
      title: "Enterprise HRMS",
      desc: "Employee onboarding checklists, leave application pipelines, real-time corporate policy Q&As, and automated payroll operations.",
      domain: "hrms"
    },
    {
      icon: <Building2 className="w-6 h-6 text-sky-500" />,
      title: "Smart Campus Management",
      desc: "Hostel asset requests, library digital bookings, daily class timetables, and unified campus financial accounts.",
      domain: "campus"
    }
  ];

  // Simulated handlers for interactive Spec Explorer
  const handleQueryEduTutor = () => {
    setEduTutorLoading(true);
    setEduTutorResponse('');
    setTimeout(() => {
      setEduTutorLoading(false);
      if (eduTutorQuery.toLowerCase().includes('transformers') || eduTutorQuery.toLowerCase().includes('kv')) {
        setEduTutorResponse(`### **AI Tutor Response: Transformers KV Cache**\n\nTo optimize Transformer inference speed, we store the Key (K) and Value (V) tensors for processed tokens in memory. This bypasses redundant matrix multiplications during auto-regressive generation.\n\n$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{Q K^T}{\\sqrt{d_k}}\\right)V$$\n\n**Complexity gains:** Reduces multi-head attention processing from $O(N^2)$ back to $O(N)$ for token expansion loop.`);
      } else if (eduTutorQuery.toLowerCase().includes('react') || eduTutorQuery.toLowerCase().includes('hooks')) {
        setEduTutorResponse(`### **AI Tutor Response: React 19 Custom Hooks**\n\nReact 19 introduces the \`use\` API to resolve promises directly in render trees, alongside \`useActionState\` for cleaner form handlers:\n\n\`\`\`tsx\nconst [state, formAction, isPending] = useActionState(\n  async (prevState, formData) => {\n    const response = await saveItem(formData);\n    return response.data;\n  },\n  initialState\n);\n\`\`\``);
      } else {
        setEduTutorResponse(`### **AI Tutor Response: ${eduTutorQuery}**\n\nLet's break down this concept simply:\n1. **Core Premise:** The target parameter is evaluated recursively to form structured learning vectors.\n2. **Platform Context:** FSP synchronizes this analysis with the academic record database dynamically.\n3. **Practical Application:** Build custom assessors using the "Assessment Playground" tab to verify knowledge parameters immediately.`);
      }
    }, 1200);
  };

  const handleGenerateQuiz = () => {
    setEduQuizCreated(true);
    setEduQuizSubmitted(false);
    setEduQuizAnswers({});
  };

  const handleGenerateCode = () => {
    setEngCodeLoading(true);
    setEngCodeOutput('');
    setTimeout(() => {
      setEngCodeLoading(false);
      if (engLang === 'typescript') {
        setEngCodeOutput(`import { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();
const SECRET = process.env.JWT_SECRET || 'fsp-cognitive-hash-9901';

export const verifyRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing security tokens' });
    }
    
    try {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, SECRET) as { role: string; email: string };
      
      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ error: 'RBAC validation failed' });
      }
      
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ error: 'Invalid token handshake' });
    }
  };
};

// Target generated route matching query: "${engPrompt}"
router.post('/secure-leave', verifyRole(['HR Manager', 'Admin']), (req, res) => {
  res.json({ message: "Action approved securely via RBAC." });
});

export default router;`);
      } else {
        setEngCodeOutput(`from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from pydantic import BaseModel

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Generated matching user parameters: "${engPrompt}"
class TokenData(BaseModel):
    email: str
    role: str

async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, "SECRET", algorithms=["HS256"])
        return TokenData(email=payload.get("sub"), role=payload.get("role"))
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
`);
      }
    }, 1100);
  };

  const handleRunTests = () => {
    setEngTestStatus('running');
    setEngTestLogs([]);
    const messages = [
      '⚡ [FSP SUITE] Spawning unit test runner on sandbox Node container...',
      '🛠️ [SANDBOX] Injecting Mock relational environment constants...',
      '✔️ [TEST] test_jwt_auth_pass_with_student_role: PASSED (1.4ms)',
      '✔️ [TEST] test_postgres_pool_connection: PASSED (4.8ms)',
      '✔️ [TEST] test_rbac_boundary_blocks_student_from_hr_routes: PASSED (0.9ms)',
      '⚠️ [LINT] server.ts: Line 41: Prefer using non-null assertion constraints.',
      '🎉 [COMPLETED] 3 tests passed. 0 failures. Coverage: 94.2%.'
    ];
    messages.forEach((msg, idx) => {
      setTimeout(() => {
        setEngTestLogs(prev => [...prev, msg]);
        if (idx === messages.length - 1) {
          setEngTestStatus('completed');
        }
      }, (idx + 1) * 350);
    });
  };

  const handleAnalyzeAts = () => {
    setRecAtsLoading(true);
    setTimeout(() => {
      setRecAtsLoading(false);
      setRecAtsResults({
        score: 84,
        matchCount: 5,
        missing: ['Docker', 'Next.js 15', 'Redis Cache'],
        summary: 'Excellent alignment for standard full-stack React and Node roles. Core strengths identified in TypeScript backend paradigms. Recommending immediate scheduling of Mock AI Interview.'
      });
    }, 1000);
  };

  const handleQueryInterview = () => {
    setRecInterviewLoading(true);
    setTimeout(() => {
      setRecInterviewLoading(false);
      if (recInterviewAnswer.toLowerCase().includes('locking') || recInterviewAnswer.toLowerCase().includes('optimistic')) {
        setRecInterviewReview({
          score: '9.2 / 10',
          correctness: 'High Precision',
          critique: 'Excellent answer! You correctly distinguished optimistic and pessimistic locking protocols. Optimistic locking is ideal for read-heavy systems, whereas SELECT FOR UPDATE is suitable for high-contention bank ledgers.'
        });
      } else {
        setRecInterviewReview({
          score: '6.5 / 10',
          correctness: 'Partial Match',
          critique: 'Response lacks details regarding lock contention mechanisms. Consider discussing transactional isolation levels (Serializable vs Read Committed) and DB index locks next time.'
        });
      }
    }, 1200);
  };

  const handleSubmitLeave = (e: React.FormEvent) => {
    e.preventDefault();
    const newLeave = {
      id: Date.now(),
      name: 'Michael Vance (Demo Session)',
      type: hrmsLeaveType,
      days: hrmsLeaveDays,
      reason: hrmsLeaveReason,
      status: 'Pending'
    };
    setHrmsLeaveQueue(prev => [newLeave, ...prev]);
    setHrmsLeaveReason('');
  };

  const handleLeaveAction = (id: number, action: 'Approved' | 'Denied') => {
    setHrmsLeaveQueue(prev => prev.map(l => l.id === id ? { ...l, status: action } : l));
  };

  const handleSearchPolicy = (topic: string) => {
    setHrmsActiveSubPageAndSearch('hrms', 2, topic);
  };

  const setHrmsActiveSubPageAndSearch = (domain: any, subPage: number, topic: string) => {
    setActiveSpecDomain(domain);
    setActiveSpecSubPage(subPage);
    setHrmsPolicyQuery(topic);
    if (topic === 'maternity') {
      setHrmsPolicyAnswer('### **FSP Maternity and Parental Care Policy (CO-109)**\n\n* **Paid leave period:** 26 full calendar weeks of fully compensated leave.\n* **Eligibility constraints:** Active employee for > 180 consecutive days.\n* **Benefits wrapper:** Full medical health coverage, plus flexible work-from-home scaling options on resumption.');
    } else if (topic === 'reimbursement') {
      setHrmsPolicyAnswer('### **Educational and Travel Reimbursement Guidelines (CO-112)**\n\n* **Work expense limit:** Up to $2,500 annually for tuition credits and cloud service fees.\n* **Filing pipeline:** Submit digital receipts to the HR portal under active expense blocks. Reimbursements occur on the subsequent 30th cycle.');
    } else {
      setHrmsPolicyAnswer('### **Standard Corporate Holiday Policy (CO-101)**\n\n* **Allocated leaves:** 12 Gazetted Holidays + 15 Casual/Sick Leaves annually.\n* **Carry-over matrix:** Up to 5 unused leaves can scale forward to the subsequent fiscal year.');
    }
  };

  const handleBookCubicle = () => {
    setCampusLibPass({
      passId: 'LIB-CUB-' + Math.floor(Math.random() * 9000 + 1000),
      cubicle: campusLibCubicle,
      timeSlot: campusLibSlot,
      date: 'Today (Saturday)',
      securityCode: 'FSP-PASS-' + Math.floor(Math.random() * 800 + 100)
    });
  };

  const handleSimulatePayment = () => {
    setCampusPaying(true);
    setTimeout(() => {
      setCampusPaying(false);
      setCampusDuesPaid(true);
    }, 1500);
  };

  const handleCampusAssetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTicket = {
      id: Date.now(),
      type: campusAssetType,
      desc: campusAssetDesc,
      status: 'Received',
      time: 'Just now'
    };
    setCampusAssetTimeline(prev => [newTicket, ...prev]);
    setCampusAssetDesc('');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans transition-colors duration-300">
      {/* Header */}
      <header className="border-b border-slate-200/80 bg-white/70 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-mono font-bold text-lg shadow-sm">
              F
            </div>
            <span className="font-sans font-semibold tracking-tight text-lg text-slate-900">
              Future Scope Platform
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <Link 
              to="/login" 
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Sign In
            </Link>
            <Link 
              to="/register" 
              className="text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-sm transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        {!showSpecsExplorer ? (
          <motion.div
            key="landing-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Hero */}
            <main>
              <section className="py-20 lg:py-28 max-w-7xl mx-auto px-6 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6 shadow-xs"
                >
                  <Bot className="w-4 h-4 animate-pulse" />
                  <span>AI-Driven Full-Scale Campus & HR Ecosystem</span>
                </motion.div>

                <motion.h1 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-4xl md:text-6xl font-extrabold font-sans tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight"
                >
                  The Intelligent Scope of Future Campus & HR Operations
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-lg text-slate-600 max-w-2xl mx-auto mt-6 leading-relaxed"
                >
                  FSP synthesizes Classroom Learning, Software Engineering, ATS Recruitment, Leave Automation, and Smart Facility Booking under one single unified platform.
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="mt-10 flex flex-wrap justify-center gap-4"
                >
                  <Link 
                    to="/login"
                    className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium flex items-center space-x-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md group cursor-pointer"
                  >
                    <span>Explore Platform Runtimes</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <button 
                    onClick={() => {
                      setShowSpecsExplorer(true);
                      setActiveSpecDomain('education');
                      setActiveSpecSubPage(0);
                    }}
                    className="px-6 py-3.5 border border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-all cursor-pointer shadow-xs active:scale-[0.98]"
                  >
                    See Architecture Specs
                  </button>
                </motion.div>
              </section>

              {/* Feature Grid */}
              <section id="learn-more" className="py-20 bg-white border-t border-slate-200/60">
                <div className="max-w-7xl mx-auto px-6">
                  <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                      Five Functional Domains. Unified Experience.
                    </h2>
                    <p className="text-slate-600 mt-4 leading-relaxed">
                      Empower students, developers, faculty, recruiters, and HR managers inside a collaborative sandbox. Click on any card below to launch its interactive specifications!
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        onClick={() => {
                          setShowSpecsExplorer(true);
                          setActiveSpecDomain(feat.domain as any);
                          setActiveSpecSubPage(0);
                        }}
                        className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-250 hover:shadow-lg transition-all shadow-sm cursor-pointer group hover:-translate-y-1 duration-300"
                      >
                        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border border-slate-150 shadow-xs mb-5 group-hover:scale-110 transition-transform duration-300">
                          {feat.icon}
                        </div>
                        <h3 className="font-sans font-bold text-lg text-slate-900 flex items-center justify-between">
                          <span>{feat.title}</span>
                          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                        </h3>
                        <p className="text-sm text-slate-600 mt-3 leading-relaxed">{feat.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* System Benefits */}
              <section className="py-20 bg-slate-50/50 border-t border-slate-200/60">
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 leading-tight">
                      Crafted for Enterprise Resilience and Real-Time Scaling
                    </h2>
                    <p className="text-slate-600 mt-4 leading-relaxed">
                      FSP leverages advanced client local persistence seamlessly synchronizing back to secure server-side frameworks. Each AI query triggers automated, context-guided semantic routing.
                    </p>

                    <div className="mt-8 space-y-4">
                      {[
                        "No fragmented external database silos — unified Postgres modeling",
                        "Intelligent semantic request routing via server-side Gemini API",
                        "Enterprise role-based permissions validation (RBAC)",
                        "Customized local chat storage with active session persistence"
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-start space-x-3 text-sm font-medium text-slate-700">
                          <CheckCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative rounded-2xl border border-slate-200/80 overflow-hidden shadow-xl bg-white p-6">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                        <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                        <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                      </div>
                      <span className="font-mono text-xs text-slate-400">fsp_router_terminal.log</span>
                    </div>
                    <div className="font-mono text-xs space-y-3 text-slate-600 leading-relaxed">
                      <p className="text-indigo-600 font-semibold">[SYSTEM ROUTER] Initializing FSP semantic routing gateway...</p>
                      <p className="text-slate-500">Connecting persistent PostgreSQL model buffers... [SUCCESS]</p>
                      <p className="text-slate-500">Injecting LLM cognitive guidelines from 25 specialized configurations...</p>
                      <p className="text-emerald-600 font-semibold">[SERVICE ROUTER] Routing user stream input to 'Mock Interview Agent' (Intent Confidence: 0.98)</p>
                      <p className="text-slate-400">&gt;_ Waiting for user prompt...</p>
                    </div>
                  </div>
                </div>
              </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-200 bg-slate-900 text-slate-400 py-10">
              <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-6">
                <span className="text-sm font-medium font-sans text-slate-300">
                  &copy; {new Date().getFullYear()} Future Scope Platform. All rights reserved.
                </span>
                <div className="flex items-center space-x-4 text-xs font-mono">
                  <span className="text-emerald-400">● ENVIRONMENT_ONLINE</span>
                  <span className="text-slate-500">VERSION_1.0.0</span>
                </div>
              </div>
            </footer>
          </motion.div>
        ) : (
          /* Architecture Specs Explorer View */
          <motion.div
            key="specs-explorer-view"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-7xl mx-auto px-6 py-10"
          >
            {/* Header toolbar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6 mb-8">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowSpecsExplorer(false)}
                  className="inline-flex items-center space-x-2 text-xs font-bold text-slate-700 hover:text-white bg-white hover:bg-slate-900 border border-slate-350 hover:border-slate-900 px-4 py-2 rounded-xl transition-all cursor-pointer shadow-3xs"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Home</span>
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
                    <span>FSP Architecture Specs Explorer</span>
                    <span className="text-xs bg-indigo-50 border border-indigo-100 text-indigo-700 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">Specs Lab</span>
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">Detailed, interactive model blueprints demonstrating all 5 core platform workflows.</p>
                </div>
              </div>
              
              <Link
                to="/login"
                className="inline-flex items-center space-x-1.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer"
              >
                <span>Launch Active Runtime</span>
                <Play className="w-3.5 h-3.5 fill-white" />
              </Link>
            </div>

            {/* Five Domain Selector Tabs with dynamic color styles */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5 mb-8">
              {[
                { id: 'education', label: 'Intelligent Education', color: 'indigo', icon: <GraduationCap className="w-4 h-4" /> },
                { id: 'engineering', label: 'Software Engineering', color: 'emerald', icon: <Code2 className="w-4 h-4" /> },
                { id: 'placement', label: 'Placement & Recruitment', color: 'amber', icon: <Briefcase className="w-4 h-4" /> },
                { id: 'hrms', label: 'Enterprise HRMS', color: 'rose', icon: <Users className="w-4 h-4" /> },
                { id: 'campus', label: 'Smart Campus Management', color: 'sky', icon: <Building2 className="w-4 h-4" /> }
              ].map((domain) => {
                const isActive = activeSpecDomain === domain.id;
                let activeClass = '';
                if (isActive) {
                  if (domain.color === 'indigo') activeClass = 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200';
                  if (domain.color === 'emerald') activeClass = 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-200';
                  if (domain.color === 'amber') activeClass = 'bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-200';
                  if (domain.color === 'rose') activeClass = 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-200';
                  if (domain.color === 'sky') activeClass = 'bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-200';
                } else {
                  activeClass = 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-350';
                }

                return (
                  <button
                    key={domain.id}
                    onClick={() => {
                      setActiveSpecDomain(domain.id as any);
                      setActiveSpecSubPage(0);
                    }}
                    className={`flex items-center justify-center space-x-2 p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${activeClass}`}
                  >
                    {domain.icon}
                    <span>{domain.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Inner Dashboard Layout: Left Sub-pages Sidenav, Right Sub-page details */}
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Left sub-pages list */}
              <div className="bg-white p-5 rounded-2xl border border-slate-150 shadow-3xs h-fit space-y-4">
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Spec Sub-Pages</span>
                  <span className="block text-xs font-semibold text-slate-500 mt-1 capitalize">{activeSpecDomain} Blueprint Modules</span>
                </div>
                
                <div className="space-y-1.5">
                  {getDomainSubPages(activeSpecDomain).map((subPage, index) => {
                    const isActive = activeSpecSubPage === index;
                    return (
                      <button
                        key={index}
                        onClick={() => setActiveSpecSubPage(index)}
                        className={`w-full text-left p-3 rounded-xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer border ${
                          isActive 
                            ? 'bg-slate-900 border-slate-900 text-white' 
                            : 'bg-white border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-[10px] opacity-70">0{index + 1}</span>
                          <span>{subPage.title}</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                      </button>
                    );
                  })}
                </div>

                <div className="border-t border-slate-100 pt-4">
                  <span className="block text-[9px] font-semibold text-slate-400 uppercase tracking-widest font-mono">FSP INTEGRITY CODES</span>
                  <span className="block text-[11px] font-mono text-slate-600 mt-1.5 font-bold">SHA256: FSP_SYS_0x{activeSpecDomain.substring(0,3).toUpperCase()}A</span>
                </div>
              </div>

              {/* Right content view */}
              <div className="lg:col-span-3 bg-white p-6 md:p-8 rounded-3xl border border-slate-150 shadow-2xs min-h-[500px] flex flex-col justify-between">
                {renderSpecSubPage()}

                {/* Sub-page footer navigation controls */}
                <div className="border-t border-slate-100 pt-6 mt-8 flex items-center justify-between text-xs font-bold text-slate-500">
                  <button
                    disabled={activeSpecSubPage === 0}
                    onClick={() => setActiveSpecSubPage(prev => Math.max(0, prev - 1))}
                    className="inline-flex items-center space-x-1.5 hover:text-slate-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous Module</span>
                  </button>
                  <span className="font-mono text-[11px]">Module {activeSpecSubPage + 1} of {getDomainSubPages(activeSpecDomain).length}</span>
                  <button
                    disabled={activeSpecSubPage === getDomainSubPages(activeSpecDomain).length - 1}
                    onClick={() => setActiveSpecSubPage(prev => Math.min(getDomainSubPages(activeSpecDomain).length - 1, prev + 1))}
                    className="inline-flex items-center space-x-1.5 hover:text-slate-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <span>Next Module</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  // Helper functions mapping Domain sub-pages structure
  function getDomainSubPages(domain: string) {
    const specs: Record<string, { title: string }[]> = {
      education: [
        { title: 'Study Tutor Ingestion Flow' },
        { title: 'Personal AI Study Tutor' },
        { title: 'Assessment System Blueprint' },
        { title: 'Live AI Quiz Creator' },
        { title: 'Academic Performance Analytics' }
      ],
      engineering: [
        { title: 'AI Code Generator Room' },
        { title: 'Database Relational Model' },
        { title: 'Interactive Testing Sandbox' },
        { title: 'Pull Request Analysis Assistant' }
      ],
      placement: [
        { title: 'ATS Scorecard Screener' },
        { title: 'Candidate Heatmap Matrix' },
        { title: 'Mock AI Interview Simulator' },
        { title: 'Placement Board Analytics' }
      ],
      hrms: [
        { title: 'Onboarding Checklist Hub' },
        { title: 'Leave Application Pipeline' },
        { title: 'Corporate Policy Q&A' },
        { title: 'Automated Payroll Ledger' }
      ],
      campus: [
        { title: 'Hostel Asset Desk' },
        { title: 'Library Cubicle Booking' },
        { title: 'Daily Timetable Tracker' },
        { title: 'Unified Finance Ledger' }
      ]
    };
    return specs[domain] || [];
  }

  // Render spec details dynamically
  function renderSpecSubPage() {
    // ----------------------------------------------------
    // INTELLIGENT EDUCATION BLUEPRINT RENDERERS
    // ----------------------------------------------------
    if (activeSpecDomain === 'education') {
      switch (activeSpecSubPage) {
        case 0:
          return (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
                <GraduationCap className="w-4 h-4" />
                <span>Core Module: Ingestion Flow</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">Study Tutor Ingestion Flow</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Raw audio transcripts, syllabus files, and presentation materials are uploaded to the local cache. The Ingestion Engine parses chapters, creates semantic embeddings, and records structured records directly inside PostgreSQL.
              </p>

              <div className="border border-slate-200 rounded-2xl bg-slate-50 p-5 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                  <span className="text-xs font-bold text-slate-700">Active Syllabus Mapping Simulation</span>
                  <span className="text-[10px] font-mono bg-indigo-50 border border-indigo-100 text-indigo-700 px-2 py-0.5 rounded-md uppercase font-bold">Parser Core</span>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4 text-xs font-medium text-slate-700">
                  <div className="p-3 bg-white border border-slate-150 rounded-xl space-y-1">
                    <span className="text-indigo-600 block font-bold uppercase tracking-wider text-[9px]">Step 1: Document Upload</span>
                    <span className="block font-bold">Lecture_12_KV.mp3</span>
                    <span className="block text-[10px] text-slate-400">Buffered for Speech-to-Text conversion.</span>
                  </div>
                  <div className="p-3 bg-white border border-slate-150 rounded-xl space-y-1">
                    <span className="text-emerald-600 block font-bold uppercase tracking-wider text-[9px]">Step 2: Semantic Chunking</span>
                    <span className="block font-bold">512 Token Overlap</span>
                    <span className="block text-[10px] text-slate-400">Generates subtopic key matrices.</span>
                  </div>
                  <div className="p-3 bg-white border border-slate-150 rounded-xl space-y-1">
                    <span className="text-indigo-600 block font-bold uppercase tracking-wider text-[9px]">Step 3: Relational Bind</span>
                    <span className="block font-bold">PostgreSQL Course Table</span>
                    <span className="block text-[10px] text-slate-400">Ties syllabus chunks to CS-402 core.</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-zinc-800">
                  <span className="font-mono text-[10px] text-zinc-500 block border-b border-zinc-800 pb-2 mb-2">syllabus_chunks_buffer.sql</span>
                  <pre className="font-mono text-[11px] text-zinc-300 overflow-x-auto">
                    <code>INSERT INTO syllabus_chunks (id, course_id, chunk_text, vector_embedding) 
VALUES ('c-8021', 'cs-402', 'KV cache reduces generation cost...', '[0.142, -0.901, 0.544, ...]');</code>
                  </pre>
                </div>
              </div>
            </div>
          );
        case 1:
          return (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
                <Bot className="w-4 h-4" />
                <span>Interactive Playground: Conversational Tutor</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">Personal AI Study Tutor Workspace</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Students can trigger academic queries instantly. The local interface queries Gemini API server-side, serving structural equations, formulas, and code reviews within seconds. Try clicking a study topic below:
              </p>

              <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50/50 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {['Transformers KV Cache', 'React 19 Custom Hooks', 'SQLite to PostgreSQL Migrations'].map((topic) => (
                    <button
                      key={topic}
                      onClick={() => {
                        setEduActiveTopic(topic);
                        setEduTutorQuery(topic);
                      }}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                        eduActiveTopic === topic 
                          ? 'bg-indigo-600 text-white border-indigo-600' 
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={eduTutorQuery}
                    onChange={(e) => setEduTutorQuery(e.target.value)}
                    placeholder="Ask the Tutor anything..."
                    className="flex-1 border border-slate-200 bg-white rounded-xl px-4 py-2 text-xs font-semibold focus:outline-hidden text-slate-800"
                  />
                  <button
                    onClick={handleQueryEduTutor}
                    disabled={eduTutorLoading}
                    className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center space-x-1.5 cursor-pointer disabled:bg-slate-500"
                  >
                    {eduTutorLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                    <span>Query Tutor</span>
                  </button>
                </div>

                {eduTutorResponse && (
                  <div className="p-4 bg-white border border-indigo-100 rounded-xl text-xs space-y-2 text-slate-700 animate-fade-in-down">
                    <span className="block font-bold text-indigo-700 uppercase tracking-widest text-[9px]">AI STUDY TUTOR</span>
                    <div className="font-mono bg-slate-50 p-3 rounded-lg border leading-relaxed overflow-x-auto whitespace-pre-wrap">
                      {eduTutorResponse}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        case 2:
          return (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>Core Module: Coursework Assessments</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">Coursework Assessment System</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Faculty can customize how Gemini evaluates submitted assignments. Adjust grading parameters to instantly view mock evaluation parameters:
              </p>

              <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">Tutor Grading Harshness Parameters</span>
                  <div className="flex bg-white rounded-lg p-1 border border-slate-200 text-[10px] font-bold">
                    {(['normal', 'strict', 'playful'] as const).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setEduGradingMode(mode)}
                        className={`px-2.5 py-1 rounded-md uppercase transition-colors cursor-pointer ${
                          eduGradingMode === mode ? 'bg-indigo-600 text-white' : 'text-slate-500'
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-150 space-y-2 text-xs font-semibold text-slate-700">
                  <div className="flex justify-between">
                    <span>Grade Weight Ratio:</span>
                    <span className="font-mono text-indigo-600 font-bold">
                      {eduGradingMode === 'strict' ? 'Syllabus (60%) | Logic (40%)' : eduGradingMode === 'playful' ? 'Grammar (20%) | Design (80%)' : 'Standard (50% / 50%)'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Constructive Remarks Modifier:</span>
                    <span className="font-mono text-indigo-600 font-bold">
                      {eduGradingMode === 'strict' ? 'Point out every compile error with extreme rigor' : eduGradingMode === 'playful' ? 'Include emojis, keep tone friendly and light' : 'Direct, helpful suggestions only'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        case 3:
          return (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
                <CheckSquare className="w-4 h-4" />
                <span>Live Playground: Quiz Builder</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">Assessment Quiz Creator Sandbox</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Generate custom multi-choice questionnaires immediately. Check out this mock React 19 assessment loop built instantly:
              </p>

              <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50 space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={eduQuizTopic}
                    onChange={(e) => setEduQuizTopic(e.target.value)}
                    className="flex-1 border border-slate-200 bg-white rounded-xl px-4 py-2 text-xs font-semibold focus:outline-hidden text-slate-800"
                  />
                  <button
                    onClick={handleGenerateQuiz}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2 rounded-xl cursor-pointer"
                  >
                    Build Assessment Quiz
                  </button>
                </div>

                {eduQuizCreated && (
                  <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-4 text-xs animate-fade-in-down">
                    <div className="border-b border-slate-100 pb-2">
                      <span className="font-bold text-slate-900 block">Assessment Topic: {eduQuizTopic}</span>
                      <span className="text-[10px] text-slate-400">Total: 3 questions • Choose the correct options</span>
                    </div>

                    {[
                      { q: '1. What API in React 19 is used to resolve promises directly inside render trees?', options: ['usePromise', 'use', 'resolve', 'awaitState'], correct: 1 },
                      { q: '2. Which hook handles forms and tracking loading actions automatically?', options: ['useActionState', 'useFormState', 'useFormStatus', 'useFormSubmit'], correct: 0 },
                      { q: '3. What is the default mode for rendering server side components?', options: ['Hydrated SPA', 'Static Server Component', 'Dynamic Client Hook', 'Relational Node'], correct: 1 }
                    ].map((item, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <p className="font-semibold text-slate-800">{item.q}</p>
                        <div className="grid grid-cols-2 gap-2 text-slate-600 text-[11px]">
                          {item.options.map((opt, oIdx) => {
                            const isSelected = eduQuizAnswers[idx] === oIdx;
                            return (
                              <button
                                key={oIdx}
                                onClick={() => {
                                  if (!eduQuizSubmitted) {
                                    setEduQuizAnswers(prev => ({ ...prev, [idx]: oIdx }));
                                  }
                                }}
                                className={`text-left p-2.5 rounded-lg border font-semibold transition-all cursor-pointer ${
                                  isSelected 
                                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700' 
                                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100/50'
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => setEduQuizSubmitted(true)}
                        className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] px-4 py-2 rounded-lg cursor-pointer"
                      >
                        Submit & Grade Quiz
                      </button>

                      {eduQuizSubmitted && (
                        <div className="text-right">
                          <span className="text-[10px] font-bold text-slate-400 block uppercase">Evaluation Result</span>
                          <span className="text-xs font-extrabold text-indigo-600 block">
                            Score: {Object.keys(eduQuizAnswers).filter((k: any) => {
                              const ansArr = [1, 0, 1];
                              return eduQuizAnswers[k] === ansArr[k];
                            }).length} / 3 Correct!
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        case 4:
          return (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
                <BarChart3 className="w-4 h-4" />
                <span>Interactive Analytics Dashboard</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">Academic Analytics & Grades</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Analyze academic metrics. Filter by core data paradigms to see real-time performance parameters on the custom statistical board:
              </p>

              <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-700">Course Cohort GPA Distribution</span>
                  <div className="flex bg-white rounded-lg p-1 border border-slate-200 text-[10px] font-bold">
                    {['grades', 'attendance', 'completion'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setEduAnalyticsFilter(tab as any)}
                        className={`px-2.5 py-1 rounded-md uppercase transition-colors cursor-pointer ${
                          eduAnalyticsFilter === tab ? 'bg-indigo-600 text-white' : 'text-slate-500'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                {/* SVG Grade Graph */}
                <div className="bg-white p-4 rounded-xl border border-slate-150 flex flex-col items-center justify-center">
                  <svg className="w-full h-36 text-indigo-600" viewBox="0 0 300 120">
                    <line x1="20" y1="10" x2="20" y2="100" stroke="#cbd5e1" strokeWidth="1.5" />
                    <line x1="20" y1="100" x2="280" y2="100" stroke="#cbd5e1" strokeWidth="1.5" />
                    
                    {/* SVG Bars with dynamic scaling depending on filter */}
                    {eduAnalyticsFilter === 'grades' ? (
                      <>
                        <rect x="40" y="30" width="30" height="70" rx="3" fill="#4f46e5" className="transition-all duration-500" />
                        <rect x="90" y="20" width="30" height="80" rx="3" fill="#4f46e5" className="transition-all duration-500" />
                        <rect x="140" y="45" width="30" height="55" rx="3" fill="#4f46e5" className="transition-all duration-500" />
                        <rect x="190" y="10" width="30" height="90" rx="3" fill="#4f46e5" className="transition-all duration-500" />
                        <rect x="240" y="60" width="30" height="40" rx="3" fill="#4f46e5" className="transition-all duration-500" />
                      </>
                    ) : eduAnalyticsFilter === 'attendance' ? (
                      <>
                        <rect x="40" y="15" width="30" height="85" rx="3" fill="#10b981" className="transition-all duration-500" />
                        <rect x="90" y="10" width="30" height="90" rx="3" fill="#10b981" className="transition-all duration-500" />
                        <rect x="140" y="30" width="30" height="70" rx="3" fill="#10b981" className="transition-all duration-500" />
                        <rect x="190" y="25" width="30" height="75" rx="3" fill="#10b981" className="transition-all duration-500" />
                        <rect x="240" y="40" width="30" height="60" rx="3" fill="#10b981" className="transition-all duration-500" />
                      </>
                    ) : (
                      <>
                        <rect x="40" y="40" width="30" height="60" rx="3" fill="#f59e0b" className="transition-all duration-500" />
                        <rect x="90" y="30" width="30" height="70" rx="3" fill="#f59e0b" className="transition-all duration-500" />
                        <rect x="140" y="20" width="30" height="80" rx="3" fill="#f59e0b" className="transition-all duration-500" />
                        <rect x="190" y="5" width="30" height="95" rx="3" fill="#f59e0b" className="transition-all duration-500" />
                        <rect x="240" y="55" width="30" height="45" rx="3" fill="#f59e0b" className="transition-all duration-500" />
                      </>
                    )}
                  </svg>
                  <div className="flex justify-between w-full max-w-[250px] text-[9px] font-mono font-semibold text-slate-400 mt-2">
                    <span>SECTOR A</span>
                    <span>SECTOR B</span>
                    <span>SECTOR C</span>
                    <span>SECTOR D</span>
                    <span>SECTOR E</span>
                  </div>
                </div>
              </div>
            </div>
          );
        default:
          return null;
      }
    }

    // ----------------------------------------------------
    // SOFTWARE ENGINEERING BLUEPRINT RENDERERS
    // ----------------------------------------------------
    if (activeSpecDomain === 'engineering') {
      switch (activeSpecSubPage) {
        case 0:
          return (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-emerald-600 font-bold text-xs uppercase tracking-wider">
                <Code2 className="w-4 h-4" />
                <span>Interactive Playground: Code Creator</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">AI Code Generation Room</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Developers can outline API endpoint routing logic in raw text. The local compiler requests Gemini server-side to generate type-safe, compiled TypeScript controller structures. Try it out:
              </p>

              <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50 space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1 space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-500 block uppercase">Compiler Directives Prompt</span>
                    <input
                      type="text"
                      value={engPrompt}
                      onChange={(e) => setEngPrompt(e.target.value)}
                      className="w-full border border-slate-200 bg-white rounded-xl px-3 py-2 text-xs font-semibold focus:outline-hidden text-slate-800"
                    />
                  </div>
                  <div className="w-32 space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-500 block uppercase">Output Target</span>
                    <select
                      value={engLang}
                      onChange={(e: any) => setEngLang(e.target.value)}
                      className="w-full border border-slate-200 bg-white rounded-xl px-2.5 py-2 text-xs font-semibold focus:outline-hidden text-slate-800"
                    >
                      <option value="typescript">TypeScript</option>
                      <option value="python">FastAPI</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleGenerateCode}
                  disabled={engCodeLoading}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 rounded-xl flex items-center justify-center space-x-1.5 cursor-pointer disabled:bg-emerald-500"
                >
                  {engCodeLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Cpu className="w-4 h-4" />}
                  <span>Compile Abstract Code</span>
                </button>

                {engCodeOutput && (
                  <div className="p-4 bg-slate-950 rounded-xl border border-zinc-800 text-xs animate-fade-in-down">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3 font-mono text-[9px] text-zinc-500">
                      <span>fsp_compiled_controller.ts</span>
                      <span className="text-emerald-500">✔ COMPILED OK</span>
                    </div>
                    <pre className="font-mono text-[10.5px] text-zinc-300 overflow-x-auto whitespace-pre leading-relaxed max-h-[250px]">
                      <code>{engCodeOutput}</code>
                    </pre>
                  </div>
                )}
              </div>
            </div>
          );
        case 1:
          return (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-emerald-600 font-bold text-xs uppercase tracking-wider">
                <Database className="w-4 h-4" />
                <span>Core Module: Database Schemas</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">Database Relational Model Diagram</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Every platform asset relies on optimized primary/foreign keys. Click on any of the relational pairs below to see how relationships are highlighted inside the SQL container:
              </p>

              <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50 space-y-4">
                <div className="flex justify-center space-x-3 text-xs font-bold">
                  {[
                    { id: 'users-leaves', label: 'Users ⇆ Leaves' },
                    { id: 'users-logs', label: 'Users ⇆ AuditLogs' },
                    { id: 'assignments-grades', label: 'Assignments ⇆ Grades' }
                  ].map((rel) => (
                    <button
                      key={rel.id}
                      onClick={() => setEngActiveRelation(rel.id as any)}
                      className={`px-3 py-1.5 rounded-lg border cursor-pointer transition-all ${
                        engActiveRelation === rel.id 
                          ? 'bg-emerald-600 border-emerald-600 text-white' 
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {rel.label}
                    </button>
                  ))}
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-150 grid md:grid-cols-2 gap-4 text-xs font-semibold text-slate-700">
                  <div className={`p-3.5 rounded-xl border transition-all ${engActiveRelation ? 'bg-slate-50 border-slate-200' : 'bg-white border-dashed border-slate-200'}`}>
                    <span className="block font-bold text-slate-900 font-mono uppercase tracking-wider text-[10px] mb-2 text-indigo-600">Primary Key Table</span>
                    <p className="font-mono text-slate-800">
                      {engActiveRelation === 'users-leaves' || engActiveRelation === 'users-logs' ? 'Table: users\n• Field: id (uuid, Primary Key)' : engActiveRelation === 'assignments-grades' ? 'Table: assignments\n• Field: id (uuid, Primary Key)' : 'Select relationship pairing above.'}
                    </p>
                  </div>
                  <div className={`p-3.5 rounded-xl border transition-all ${engActiveRelation ? 'bg-emerald-50/50 border-emerald-200' : 'bg-white border-dashed border-slate-200'}`}>
                    <span className="block font-bold text-slate-900 font-mono uppercase tracking-wider text-[10px] mb-2 text-emerald-600">Foreign Key Relation</span>
                    <p className="font-mono text-slate-800">
                      {engActiveRelation === 'users-leaves' ? 'Table: leave_requests\n• Field: user_id (uuid, Foreign Key)' : engActiveRelation === 'users-logs' ? 'Table: activity_logs\n• Field: user_id (uuid, Foreign Key)' : engActiveRelation === 'assignments-grades' ? 'Table: grades\n• Field: assignment_id (uuid, Foreign Key)' : 'Relational keys will map here.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        case 2:
          return (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-emerald-600 font-bold text-xs uppercase tracking-wider">
                <PlayCircle className="w-4 h-4" />
                <span>Interactive Playground: Testing Sandbox</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">Interactive Unit Testing Sandbox</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Inspect security handshakes and query logic bounds before deploying. Click "Run Assert Suite" to watch the sandboxed testing container run checks:
              </p>

              <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50 space-y-4">
                <button
                  onClick={handleRunTests}
                  disabled={engTestStatus === 'running'}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-xl cursor-pointer"
                >
                  {engTestStatus === 'running' ? 'Executing Test Loops...' : 'Run Assert Suite'}
                </button>

                <div className="bg-slate-950 p-4 rounded-xl border border-zinc-800 min-h-[120px]">
                  <span className="font-mono text-[10px] text-zinc-500 block border-b border-zinc-800 pb-2 mb-2">fsp_test_runner_output.log</span>
                  <div className="font-mono text-[11px] text-zinc-300 space-y-2">
                    {engTestLogs.length === 0 && <span className="text-zinc-600">Test suite idle. Waiting for trigger.</span>}
                    {engTestLogs.map((log, idx) => (
                      <p key={idx} className={log.includes('PASSED') ? 'text-emerald-400 font-bold' : log.includes('COMPLETED') ? 'text-cyan-400 font-semibold' : 'text-zinc-300'}>{log}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        case 3:
          return (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-emerald-600 font-bold text-xs uppercase tracking-wider">
                <CheckSquare className="w-4 h-4" />
                <span>Core Module: Pull Request reviews</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">PR Security Analysis Assistant</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Scan code branches automatically for potential vulnerabilities. Review this raw middleware pull request below:
              </p>

              <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50 space-y-4">
                <div className="bg-white p-4 rounded-xl border border-slate-150 text-xs font-mono text-slate-800 leading-relaxed overflow-x-auto whitespace-pre">
                  <code>{`// Pull Request #22 - Insecure Cookie Middleware
app.use((req, res, next) => {
  res.cookie('auth_session', req.query.session_id, {
    httpOnly: false, // Security vulnerability!
    secure: false    // Vulnerability!
  });
  next();
});`}</code>
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setEngPrReviewed(true)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl cursor-pointer"
                  >
                    Run AI Code Scan
                  </button>
                  {engPrReviewed && <span className="text-[10px] font-mono bg-rose-50 border border-rose-100 text-rose-700 px-2 py-0.5 rounded-md uppercase font-bold">2 Issues Identified</span>}
                </div>

                {engPrReviewed && (
                  <div className="p-4 bg-rose-50/50 border border-rose-100 rounded-xl text-xs space-y-2.5 animate-fade-in-down">
                    <span className="block font-bold text-rose-800 uppercase tracking-widest text-[9px]">LINT ANOMALY REPORT</span>
                    <ul className="list-disc pl-4 space-y-1 text-rose-950 font-semibold">
                      <li><strong>Anomalous Flag:</strong> <code>httpOnly: false</code> allows client-side scripts to access cookies. Overwrite to <code>httpOnly: true</code> immediately.</li>
                      <li><strong>Anomalous Security:</strong> <code>secure: false</code> transmits keys over raw HTTP. Modify to <code>secure: true</code>.</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          );
        default:
          return null;
      }
    }

    // ----------------------------------------------------
    // PLACEMENT & RECRUITMENT BLUEPRINT RENDERERS
    // ----------------------------------------------------
    if (activeSpecDomain === 'placement') {
      switch (activeSpecSubPage) {
        case 0:
          return (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-amber-600 font-bold text-xs uppercase tracking-wider">
                <Briefcase className="w-4 h-4" />
                <span>Interactive Playground: ATS Parser</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">ATS Scorecard Screener</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Evaluate candidate suitability by parsing skills, certifications, and experience. Paste raw resume text below and click "Analyze ATS Profile":
              </p>

              <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50 space-y-4">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 block uppercase mb-1">Resume Text Buffer</span>
                  <textarea
                    value={recResumeText}
                    onChange={(e) => setRecResumeText(e.target.value)}
                    rows={4}
                    className="w-full border border-slate-200 bg-white rounded-xl p-3 text-xs font-semibold focus:outline-hidden text-slate-800 leading-relaxed"
                  />
                </div>

                <button
                  onClick={handleAnalyzeAts}
                  disabled={recAtsLoading}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-4 py-2 rounded-xl cursor-pointer disabled:bg-amber-500"
                >
                  {recAtsLoading ? 'Ingesting Resume Profile...' : 'Analyze ATS Profile'}
                </button>

                {recAtsResults && (
                  <div className="p-4 bg-white border border-amber-150 rounded-xl text-xs space-y-4 text-slate-700 animate-fade-in-down">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="block font-bold text-amber-700 uppercase tracking-widest text-[9px]">ATS SCORECARD SUMMARY</span>
                      <div className="flex items-center space-x-1.5 font-bold">
                        <span>ATS Score:</span>
                        <span className="text-sm text-amber-600">{recAtsResults.score}%</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="font-semibold text-slate-800">{recAtsResults.summary}</p>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="text-[10px] text-slate-400 font-bold uppercase mt-1">Identified Gaps:</span>
                        {recAtsResults.missing.map((g: string, idx: number) => (
                          <span key={idx} className="bg-rose-50 border border-rose-100 text-rose-700 px-2 py-0.5 rounded-sm text-[9px] font-mono font-medium">{g}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        case 1:
          return (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-amber-600 font-bold text-xs uppercase tracking-wider">
                <Users className="w-4 h-4" />
                <span>Core Module: Candidate Strengths heatmap</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">Skill-Gap Matrix Heatmap</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Compare job applicants against target enterprise openings. Select different roles to filter the candidate matches in real-time:
              </p>

              <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50 space-y-4">
                <div className="flex justify-center space-x-3 text-xs font-bold">
                  {['frontend', 'backend', 'manager'].map((role) => (
                    <button
                      key={role}
                      onClick={() => setRecHeatmapRole(role as any)}
                      className={`px-3 py-1.5 rounded-lg border cursor-pointer transition-all uppercase ${
                        recHeatmapRole === role 
                          ? 'bg-amber-600 border-amber-600 text-white' 
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {role} Role
                    </button>
                  ))}
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-150 overflow-x-auto">
                  <table className="w-full text-left text-xs font-medium text-slate-700 border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                        <th className="pb-2">Candidate</th>
                        <th className="pb-2">Core Competency</th>
                        <th className="pb-2 text-center">Skill-Gap Match</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-semibold">
                      {recHeatmapRole === 'frontend' ? (
                        <>
                          <tr>
                            <td className="py-2">Alex Mercer</td>
                            <td className="py-2">React, Tailwind CSS, TS</td>
                            <td className="py-2 text-center"><span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-md text-[10px] font-bold">96% High Fit</span></td>
                          </tr>
                          <tr>
                            <td className="py-2">Sanjay Kumar</td>
                            <td className="py-2">Vue.js, Vite, Node</td>
                            <td className="py-2 text-center"><span className="bg-amber-50 text-amber-700 border border-amber-100 px-2 py-0.5 rounded-md text-[10px] font-bold">82% Mid Fit</span></td>
                          </tr>
                        </>
                      ) : recHeatmapRole === 'backend' ? (
                        <>
                          <tr>
                            <td className="py-2">Sarah Jenkins</td>
                            <td className="py-2">Express, PostgreSQL, Docker</td>
                            <td className="py-2 text-center"><span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-md text-[10px] font-bold">91% High Fit</span></td>
                          </tr>
                          <tr>
                            <td className="py-2">Alex Mercer</td>
                            <td className="py-2">Go, PostgreSQL, Redis</td>
                            <td className="py-2 text-center"><span className="bg-amber-50 text-amber-700 border border-amber-100 px-2 py-0.5 rounded-md text-[10px] font-bold">78% Mid Fit</span></td>
                          </tr>
                        </>
                      ) : (
                        <>
                          <tr>
                            <td className="py-2">Michael Vance</td>
                            <td className="py-2">Agile, Jira, Team Leadership</td>
                            <td className="py-2 text-center"><span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-md text-[10px] font-bold">94% High Fit</span></td>
                          </tr>
                          <tr>
                            <td className="py-2">Sarah Jenkins</td>
                            <td className="py-2">PR, Leave Audits, HRMS</td>
                            <td className="py-2 text-center"><span className="bg-rose-50 text-rose-700 border border-rose-100 px-2 py-0.5 rounded-md text-[10px] font-bold">61% Low Fit</span></td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        case 2:
          return (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-amber-600 font-bold text-xs uppercase tracking-wider">
                <Bot className="w-4 h-4" />
                <span>Interactive Playground: Video / Text Interview</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">Mock AI Interview Simulator</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Simulate placement preparation. Type or adjust candidate interview responses and click "Submit Interview Response" to receive line-by-line feedback:
              </p>

              <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50 space-y-4">
                <div className="p-3 bg-indigo-50 border border-indigo-150 rounded-xl text-xs space-y-1">
                  <span className="text-indigo-700 block font-bold uppercase tracking-wider text-[9px]">Interviewer (Dr. Evelyn)</span>
                  <p className="font-bold text-slate-800">{recInterviewQuestion}</p>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-500 block uppercase mb-1">Your Answer Draft</span>
                  <textarea
                    value={recInterviewAnswer}
                    onChange={(e) => setRecInterviewAnswer(e.target.value)}
                    rows={3}
                    className="w-full border border-slate-200 bg-white rounded-xl p-3 text-xs font-semibold focus:outline-hidden text-slate-800 leading-relaxed"
                  />
                </div>

                <button
                  onClick={handleQueryInterview}
                  disabled={recInterviewLoading}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-4 py-2 rounded-xl cursor-pointer disabled:bg-amber-500"
                >
                  {recInterviewLoading ? 'Evaluating Answer...' : 'Submit Interview Response'}
                </button>

                {recInterviewReview && (
                  <div className="p-4 bg-white border border-slate-250 rounded-xl text-xs space-y-2 text-slate-700 animate-fade-in-down">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                      <span className="block font-bold text-amber-700 uppercase tracking-widest text-[9px]">EVALUATOR REMARKS</span>
                      <span className="font-bold text-indigo-700">Pacing Grade: {recInterviewReview.score}</span>
                    </div>
                    <p className="font-semibold text-slate-800">Correctness: {recInterviewReview.correctness}</p>
                    <p className="text-slate-600">{recInterviewReview.critique}</p>
                  </div>
                )}
              </div>
            </div>
          );
        case 3:
          return (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-amber-600 font-bold text-xs uppercase tracking-wider">
                <BarChart3 className="w-4 h-4" />
                <span>Placement board statistical graphs</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">Placement Board Recruiter Analytics</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Analyze student selection indices, package parameters, and active recruiter indices in the placement tracker:
              </p>

              <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50 space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-white border border-slate-150 rounded-xl">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Selection Index</span>
                    <span className="text-lg font-bold text-amber-600">92.4%</span>
                  </div>
                  <div className="p-3 bg-white border border-slate-150 rounded-xl">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Average Salary</span>
                    <span className="text-lg font-bold text-amber-600">$118,000</span>
                  </div>
                  <div className="p-3 bg-white border border-slate-150 rounded-xl">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Major Partner</span>
                    <span className="text-lg font-bold text-amber-600">Google Labs</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-150 flex flex-col items-center">
                  <span className="text-xs font-bold text-slate-500 mb-2">Recruitment Pipeline Funnel</span>
                  <div className="w-full space-y-2">
                    {[
                      { step: 'Ingested', count: 480, width: 'w-full', bg: 'bg-amber-500' },
                      { step: 'ATS Screened', count: 120, width: 'w-3/4', bg: 'bg-amber-600' },
                      { step: 'Interviewed', count: 32, width: 'w-1/2', bg: 'bg-amber-700' },
                      { step: 'Hired', count: 14, width: 'w-1/4', bg: 'bg-slate-900' }
                    ].map((f, idx) => (
                      <div key={idx} className="flex items-center text-xs">
                        <span className="w-28 font-bold text-slate-500">{f.step}</span>
                        <div className="flex-1 bg-slate-100 h-6 rounded-md overflow-hidden relative">
                          <div className={`h-full ${f.bg} ${f.width} transition-all duration-500`} />
                          <span className="absolute inset-0 flex items-center justify-center font-mono font-bold text-[10px] text-white">{f.count} Profiles</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        default:
          return null;
      }
    }

    // ----------------------------------------------------
    // ENTERPRISE HRMS BLUEPRINT RENDERERS
    // ----------------------------------------------------
    if (activeSpecDomain === 'hrms') {
      switch (activeSpecSubPage) {
        case 0:
          return (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-rose-600 font-bold text-xs uppercase tracking-wider">
                <Users className="w-4 h-4" />
                <span>Interactive Playground: Onboarding checklist</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">Onboarding Checklist Hub</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Tackle operational student and employee checklists. Complete onboarding triggers to watch progress indicators re-scale:
              </p>

              <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50 space-y-4">
                <div className="space-y-2.5 text-xs font-semibold text-slate-700">
                  {[
                    { id: 'contract', label: 'Sign Platform Contract' },
                    { id: 'identity', label: 'Verify National Identity credentials' },
                    { id: 'laptop', label: 'Disburse workstation hardware' },
                    { id: 'slack', label: 'Configure corporate chat channels' },
                    { id: 'orientation', label: 'Academic/Platform orientation' }
                  ].map((step) => (
                    <button
                      key={step.id}
                      onClick={() => setHrmsChecklist(prev => ({ ...prev, [step.id]: !prev[step.id] }))}
                      className="w-full flex items-center justify-between p-3 bg-white border border-slate-150 rounded-xl hover:border-rose-200 transition-all text-left cursor-pointer"
                    >
                      <span>{step.label}</span>
                      <span className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                        hrmsChecklist[step.id] ? 'bg-rose-600 border-rose-600 text-white' : 'border-slate-300'
                      }`}>
                        {hrmsChecklist[step.id] && <Check className="w-3.5 h-3.5" />}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-150">
                  <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                    <span>Onboarding Pipeline Completion</span>
                    <span>{Math.round((Object.values(hrmsChecklist).filter(Boolean).length / 5) * 100)}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-rose-600 h-full rounded-full transition-all duration-300" 
                      style={{ width: `${(Object.values(hrmsChecklist).filter(Boolean).length / 5) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        case 1:
          return (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-rose-600 font-bold text-xs uppercase tracking-wider">
                <Calendar className="w-4 h-4" />
                <span>Interactive Playground: Leave forms</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">Leave Application Pipeline</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Submit and review leave requests. Once submitted, requests are logged in the active queue below for instant approval checks:
              </p>

              <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50 space-y-4">
                <form onSubmit={handleSubmitLeave} className="grid grid-cols-2 gap-3 text-xs font-semibold">
                  <div className="space-y-1">
                    <span className="text-slate-500">Leave Type</span>
                    <select
                      value={hrmsLeaveType}
                      onChange={(e) => setHrmsLeaveType(e.target.value)}
                      className="w-full border border-slate-200 bg-white rounded-lg p-2 focus:outline-hidden"
                    >
                      <option>Casual Leave</option>
                      <option>Sick Leave</option>
                      <option>Academic Sabbatical</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-500">Duration (Days)</span>
                    <input
                      type="number"
                      value={hrmsLeaveDays}
                      onChange={(e) => setHrmsLeaveDays(parseInt(e.target.value) || 1)}
                      className="w-full border border-slate-200 bg-white rounded-lg p-2 focus:outline-hidden"
                      min={1}
                    />
                  </div>
                  <div className="col-span-2 space-y-1">
                    <span className="text-slate-500">Reason</span>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={hrmsLeaveReason}
                        onChange={(e) => setHrmsLeaveReason(e.target.value)}
                        placeholder="Brief leave reason..."
                        required
                        className="flex-1 border border-slate-200 bg-white rounded-lg p-2 focus:outline-hidden"
                      />
                      <button
                        type="submit"
                        className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-4 py-2 rounded-lg cursor-pointer"
                      >
                        Submit Request
                      </button>
                    </div>
                  </div>
                </form>

                <div className="bg-white p-4 rounded-xl border border-slate-150 space-y-3">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Queue</span>
                  <div className="space-y-2">
                    {hrmsLeaveQueue.map((leave) => (
                      <div key={leave.id} className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-between text-xs font-semibold text-slate-700">
                        <div>
                          <span className="block font-bold text-slate-800">{leave.name} • {leave.type}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{leave.days} days requested • &ldquo;{leave.reason}&rdquo;</span>
                        </div>
                        <div className="flex space-x-1.5">
                          {leave.status === 'Pending' ? (
                            <>
                              <button
                                onClick={() => handleLeaveAction(leave.id, 'Denied')}
                                className="bg-rose-100 text-rose-700 hover:bg-rose-200 px-2 py-1 rounded-md text-[10px] font-bold cursor-pointer"
                              >
                                Deny
                              </button>
                              <button
                                onClick={() => handleLeaveAction(leave.id, 'Approved')}
                                className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 px-2 py-1 rounded-md text-[10px] font-bold cursor-pointer"
                              >
                                Approve
                              </button>
                            </>
                          ) : (
                            <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase ${
                              leave.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
                            }`}>{leave.status}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        case 2:
          return (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-rose-600 font-bold text-xs uppercase tracking-wider">
                <HelpCircle className="w-4 h-4" />
                <span>Interactive Playground: Policy Search</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">Corporate Policy Q&A Engine</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Discover statutory company laws and HR guidelines instantly. Select or query standard policy topics to retrieve direct compliance summaries:
              </p>

              <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50 space-y-4">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleSearchPolicy('maternity')}
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                      hrmsPolicyQuery === 'maternity' ? 'bg-rose-600 border-rose-600 text-white' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Parental & Maternity Leaves
                  </button>
                  <button
                    onClick={() => handleSearchPolicy('reimbursement')}
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                      hrmsPolicyQuery === 'reimbursement' ? 'bg-rose-600 border-rose-600 text-white' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Tuition & Travel Reimbursements
                  </button>
                  <button
                    onClick={() => handleSearchPolicy('general')}
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                      hrmsPolicyQuery === 'general' ? 'bg-rose-600 border-rose-600 text-white' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Holiday list CO-101
                  </button>
                </div>

                {hrmsPolicyAnswer && (
                  <div className="p-4 bg-white border border-rose-100 rounded-xl text-xs space-y-2 text-slate-700 animate-fade-in-down">
                    <span className="block font-bold text-rose-700 uppercase tracking-widest text-[9px]">COMPLIANCE OFFICE BLUEPRINT</span>
                    <div className="font-mono bg-slate-50 p-3 rounded-lg border leading-relaxed overflow-x-auto whitespace-pre-wrap">
                      {hrmsPolicyAnswer}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        case 3:
          return (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-rose-600 font-bold text-xs uppercase tracking-wider">
                <Coins className="w-4 h-4" />
                <span>Interactive Playground: Sliders</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">Automated Payroll ledger</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Tweak base parameters and bonus multipliers to watch payroll structures and tax disbursements update in real-time:
              </p>

              <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50 space-y-4">
                <div className="space-y-2 text-xs font-semibold text-slate-700">
                  <div className="flex justify-between items-center">
                    <span>Fiscal Bonus Multiplier</span>
                    <span className="font-mono text-rose-600 font-bold">{hrmsBonusMultiplier}x Multiplier</span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="3.0"
                    step="0.1"
                    value={hrmsBonusMultiplier}
                    onChange={(e) => setHrmsBonusMultiplier(parseFloat(e.target.value))}
                    className="w-full accent-rose-600 cursor-pointer"
                  />
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-150 grid grid-cols-2 gap-4 text-xs font-semibold text-slate-700">
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Base Pay Budget</span>
                    <span className="text-base font-bold text-slate-800">$240,000</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Bonuses Paid</span>
                    <span className="text-base font-bold text-rose-600">${Math.round(42000 * hrmsBonusMultiplier).toLocaleString()}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Deductions (Tax)</span>
                    <span className="text-base font-bold text-slate-800">$48,000</span>
                  </div>
                  <div className="p-3 bg-rose-50 rounded-lg border border-rose-100">
                    <span className="text-[10px] font-bold text-rose-700 block uppercase">Net Disbursed Ledger</span>
                    <span className="text-base font-bold text-rose-700">${Math.round(240000 + (42000 * hrmsBonusMultiplier) - 48000).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        default:
          return null;
      }
    }

    // ----------------------------------------------------
    // SMART CAMPUS BLUEPRINT RENDERERS
    // ----------------------------------------------------
    if (activeSpecDomain === 'campus') {
      switch (activeSpecSubPage) {
        case 0:
          return (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-sky-600 font-bold text-xs uppercase tracking-wider">
                <Building2 className="w-4 h-4" />
                <span>Interactive Playground: hostel requests</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">Hostel Facility Asset Desk</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Report broken hostel fixtures, lights, or asset damages instantly. Submit tickets below and watch them place into the visual tracking timeline:
              </p>

              <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50 space-y-4">
                <form onSubmit={handleCampusAssetSubmit} className="grid grid-cols-2 gap-3 text-xs font-semibold">
                  <div className="space-y-1">
                    <span className="text-slate-500">Asset Category</span>
                    <select
                      value={campusAssetType}
                      onChange={(e) => setCampusAssetType(e.target.value)}
                      className="w-full border border-slate-200 bg-white rounded-lg p-2 focus:outline-hidden text-slate-800"
                    >
                      <option>Hostel Furniture</option>
                      <option>Electrical / AC</option>
                      <option>Plumbing</option>
                      <option>Digital Labs</option>
                    </select>
                  </div>
                  <div className="col-span-2 space-y-1">
                    <span className="text-slate-500">Fixture Description</span>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={campusAssetDesc}
                        onChange={(e) => setCampusAssetDesc(e.target.value)}
                        placeholder="Desk leg cracked, faulty bulb, etc..."
                        required
                        className="flex-1 border border-slate-200 bg-white rounded-lg p-2 focus:outline-hidden text-slate-800"
                      />
                      <button
                        type="submit"
                        className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-4 py-2 rounded-lg cursor-pointer"
                      >
                        File Maintenance Ticket
                      </button>
                    </div>
                  </div>
                </form>

                <div className="bg-white p-4 rounded-xl border border-slate-150 space-y-3">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Tickets Timeline</span>
                  <div className="space-y-3 pl-3 border-l-2 border-sky-600/30">
                    {campusAssetTimeline.length === 0 && <span className="text-slate-400 text-xs block font-semibold">No maintenance tickets submitted. File one above.</span>}
                    {campusAssetTimeline.map((ticket) => (
                      <div key={ticket.id} className="relative text-xs">
                        <span className="absolute -left-[18px] top-1.5 w-2 h-2 rounded-full bg-sky-600 animate-pulse" />
                        <div className="p-2 bg-slate-50 rounded-lg border">
                          <div className="flex justify-between font-bold">
                            <span>{ticket.type}</span>
                            <span className="text-[10px] text-sky-600 bg-sky-50 px-2 rounded-full border border-sky-100">{ticket.status}</span>
                          </div>
                          <p className="text-slate-500 mt-1">{ticket.desc} • <span className="font-mono text-[9px] text-slate-400">{ticket.time}</span></p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        case 1:
          return (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-sky-600 font-bold text-xs uppercase tracking-wider">
                <Laptop className="w-4 h-4" />
                <span>Interactive Playground: cubicle booking</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">Digital Library Cubicle Booking</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Reserve study cubicles, presentation rooms, or digital hardware slots immediately. Select a time and cubicle to generate your barcode pass:
              </p>

              <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50 space-y-4">
                <div className="grid grid-cols-2 gap-3 text-xs font-semibold text-slate-700">
                  <div className="space-y-1">
                    <span>Booking Time Slot</span>
                    <select
                      value={campusLibSlot}
                      onChange={(e) => setCampusLibSlot(e.target.value)}
                      className="w-full border border-slate-200 bg-white rounded-lg p-2 focus:outline-hidden"
                    >
                      <option>10:00 AM - 12:00 PM</option>
                      <option>01:00 PM - 03:00 PM</option>
                      <option>04:00 PM - 06:00 PM</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <span>Cubicle Space Zone</span>
                    <select
                      value={campusLibCubicle}
                      onChange={(e) => setCampusLibCubicle(e.target.value)}
                      className="w-full border border-slate-200 bg-white rounded-lg p-2 focus:outline-hidden"
                    >
                      <option>Cubicle 14 (Silent Zone)</option>
                      <option>Presentation Block A</option>
                      <option>AR/VR Experience Lab</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleBookCubicle}
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs py-2.5 rounded-xl cursor-pointer"
                >
                  Confirm Reservation Pass
                </button>

                {campusLibPass && (
                  <div className="p-4 bg-white border border-slate-250 rounded-xl text-xs space-y-3 text-slate-700 animate-fade-in-down border-dashed">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                      <span className="block font-bold text-sky-700 uppercase tracking-widest text-[9px]">LIBRARY RESERVATION SLIP</span>
                      <span className="font-mono font-bold text-slate-400">{campusLibPass.passId}</span>
                    </div>

                    <div className="font-semibold text-slate-600 space-y-1">
                      <p>Space Slot: <span className="text-slate-800 font-bold">{campusLibPass.cubicle}</span></p>
                      <p>Timing Slot: <span className="text-slate-800 font-bold">{campusLibPass.timeSlot}</span></p>
                      <p>Date: <span className="text-slate-800 font-bold">{campusLibPass.date}</span></p>
                    </div>

                    {/* Simulated barcode */}
                    <div className="bg-slate-100 p-3 rounded-lg flex flex-col items-center">
                      <div className="flex space-x-[2px] h-8 w-44 bg-slate-900 border-none">
                        {[...Array(24)].map((_, idx) => (
                          <div 
                            key={idx} 
                            className="bg-white h-full" 
                            style={{ width: idx % 3 === 0 ? '4px' : idx % 5 === 0 ? '1px' : '2px' }}
                          />
                        ))}
                      </div>
                      <span className="font-mono text-[9px] text-slate-400 mt-1.5 font-bold uppercase">{campusLibPass.securityCode}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        case 2:
          return (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-sky-600 font-bold text-xs uppercase tracking-wider">
                <Calendar className="w-4 h-4" />
                <span>Daily lecturing blocks</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">Interactive Campus Timetable Tracker</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Toggle weekday blocks to map out scheduled classes, tutoring slots, and virtual interviews across active semesters:
              </p>

              <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50 space-y-4">
                <div className="flex justify-center space-x-3 text-xs font-bold">
                  {['monday', 'wednesday', 'friday'].map((day) => (
                    <button
                      key={day}
                      onClick={() => setCampusActiveDay(day as any)}
                      className={`px-4 py-1.5 rounded-lg border transition-all cursor-pointer uppercase ${
                        campusActiveDay === day ? 'bg-sky-600 border-sky-600 text-white shadow-xs' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-150 space-y-2.5 text-xs font-semibold text-slate-700">
                  {campusActiveDay === 'monday' ? (
                    <>
                      <div className="p-3 bg-sky-50/50 border border-sky-100 rounded-lg flex justify-between">
                        <span>CS-402: Advanced AI & Machine Learning</span>
                        <span className="font-mono text-sky-700">09:00 AM • Room 102</span>
                      </div>
                      <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex justify-between">
                        <span>CS-411: Enterprise System Architectures</span>
                        <span className="font-mono text-slate-500">11:30 AM • Auditorium 2</span>
                      </div>
                    </>
                  ) : campusActiveDay === 'wednesday' ? (
                    <>
                      <div className="p-3 bg-sky-50/50 border border-sky-100 rounded-lg flex justify-between">
                        <span>CS-402: Linear Algebra Lab</span>
                        <span className="font-mono text-sky-700">10:30 AM • Lab C</span>
                      </div>
                      <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex justify-between">
                        <span>CP-101: Mock Placement Lab</span>
                        <span className="font-mono text-slate-500">02:00 PM • Virtual</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="p-3 bg-sky-50/50 border border-sky-100 rounded-lg flex justify-between">
                        <span>CS-411: Distributed Systems Review</span>
                        <span className="font-mono text-sky-700">09:30 AM • Room 204</span>
                      </div>
                      <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex justify-between">
                        <span>FSP Global Audit Seminar</span>
                        <span className="font-mono text-slate-500">03:30 PM • Auditorium 1</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        case 3:
          return (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-sky-600 font-bold text-xs uppercase tracking-wider">
                <Coins className="w-4 h-4" />
                <span>Unified financials</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">Unified Financial Accounts Ledger</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Coordinate tuition invoices, hostel fees, and examine invoice structures. Simulate an immediate digital payment to clear student ledger accounts:
              </p>

              <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50 space-y-4">
                <div className="bg-white p-4 rounded-xl border border-slate-150 text-xs font-semibold text-slate-700 space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <span>Invoice Block:</span>
                    <span className="font-mono text-slate-900 font-bold">FSP-INV-2026-09A</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hostel Fee Dues:</span>
                    <span className="font-mono text-slate-800">$1,200</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Academic Tuition:</span>
                    <span className="font-mono text-slate-800">$4,800</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 text-sm font-bold">
                    <span>Total Outstanding Balance:</span>
                    <span className={`font-mono ${campusDuesPaid ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {campusDuesPaid ? '$0 (Fully Cleared)' : '$6,000'}
                    </span>
                  </div>
                </div>

                {!campusDuesPaid ? (
                  <button
                    onClick={handleSimulatePayment}
                    disabled={campusPaying}
                    className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs py-2.5 rounded-xl cursor-pointer disabled:bg-sky-400"
                  >
                    {campusPaying ? 'Simulating Instant Fee Transfer...' : 'Complete Online Payment'}
                  </button>
                ) : (
                  <div className="p-3.5 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center space-x-2 text-emerald-800 text-xs font-bold animate-fade-in-down">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Payment approved. Dues cleared in FSP PostgreSQL buffer!</span>
                  </div>
                )}
              </div>
            </div>
          );
        default:
          return null;
      }
    }
    return null;
  }
}
