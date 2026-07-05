import React from 'react';
import { 
  Button, 
  Avatar, 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem,
} from '@heroui/react';
import { 
  GraduationCap, 
  Code2, 
  Users, 
  Briefcase, 
  Building2, 
  Shield, 
  LogOut, 
  X,
  LayoutDashboard,
  ChevronDown,
  BookOpen,
  FileSpreadsheet,
  Award,
  Calendar,
  CheckSquare,
  FileText,
  PlayCircle,
  Database,
  Search,
  Contact,
  Clock,
  DollarSign,
  Cpu,
  Activity,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { UserRole } from '../../types';
import { useAuth, DEMO_USERS } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';

interface NavigationSidebarProps {
  sidebarOpen: boolean;
  onCloseSidebar: () => void;
}

const HeroButton = Button as any;
const HeroDropdown = Dropdown as any;
const HeroDropdownTrigger = DropdownTrigger as any;
const HeroDropdownMenu = DropdownMenu as any;
const HeroDropdownItem = DropdownItem as any;

export const NavigationSidebar: React.FC<NavigationSidebarProps> = ({
  sidebarOpen,
  onCloseSidebar,
}) => {
  const { user, login, logout, role } = useAuth();
  const { addNotification } = useNotifications();

  if (!user) return null;

  // Utilize the role accessed from the AuthContext as specified
  const activeRole: UserRole = (role || user.role) as UserRole;

  const roleIcons: { [key in UserRole]: React.ReactNode } = {
    Student: <GraduationCap className="w-4 h-4 text-indigo-400" />,
    Faculty: <Building2 className="w-4 h-4 text-sky-400" />,
    Developer: <Code2 className="w-4 h-4 text-emerald-400" />,
    Recruiter: <Briefcase className="w-4 h-4 text-amber-400" />,
    'HR Manager': <Users className="w-4 h-4 text-rose-400" />,
    Admin: <Shield className="w-4 h-4 text-indigo-400" />,
  };

  const roleStyles: { [key in UserRole]: string } = {
    Student: 'bg-indigo-950/60 border-indigo-900/50 text-indigo-300',
    Faculty: 'bg-sky-950/60 border-sky-900/50 text-sky-300',
    Developer: 'bg-emerald-950/60 border-emerald-900/50 text-emerald-300',
    Recruiter: 'bg-amber-950/60 border-amber-900/50 text-amber-300',
    'HR Manager': 'bg-rose-950/60 border-rose-900/50 text-rose-300',
    Admin: 'bg-indigo-950/60 border-indigo-900/50 text-indigo-300',
  };

  // Menu links mapping according to active RBAC profiles with rich icons
  const menuItemsWithIcons: { [key in UserRole]: { label: string; desc: string; icon: React.ReactNode }[] } = {
    Student: [
      { label: "Academic Lectures", desc: "Digital classroom modules", icon: <BookOpen className="w-4 h-4 text-indigo-400" /> },
      { label: "Assignment Sandbox", desc: "Manage deliverables", icon: <FileSpreadsheet className="w-4 h-4 text-indigo-400" /> },
      { label: "Assessments (Quizzes)", desc: "Trigger study assessors", icon: <Award className="w-4 h-4 text-indigo-400" /> },
      { label: "Career & Placement Preparation", desc: "ATS screening mockups", icon: <GraduationCap className="w-4 h-4 text-indigo-400" /> }
    ],
    Faculty: [
      { label: "Active Lecturing Blocks", desc: "Timetables & lab classes", icon: <Calendar className="w-4 h-4 text-sky-400" /> },
      { label: "Assessment Pipeline", desc: "Interactive grading metrics", icon: <CheckSquare className="w-4 h-4 text-sky-400" /> },
      { label: "Leaves & Time-Off Requests", desc: "Submit attendance records", icon: <FileText className="w-4 h-4 text-sky-400" /> }
    ],
    Developer: [
      { label: "AI Code Generation Rooms", desc: "React/Express schemas", icon: <Code2 className="w-4 h-4 text-emerald-400" /> },
      { label: "Interactive Testing Sandbox", desc: "Unit test assert checkers", icon: <PlayCircle className="w-4 h-4 text-emerald-400" /> },
      { label: "Database Relational Models", desc: "PostgreSQL schema layouts", icon: <Database className="w-4 h-4 text-emerald-400" /> }
    ],
    Recruiter: [
      { label: "Job Candidate Postings", desc: "Publish placement boards", icon: <Briefcase className="w-4 h-4 text-amber-400" /> },
      { label: "ATS Scorecard Screening", desc: "Parse resumes", icon: <Search className="w-4 h-4 text-amber-400" /> },
      { label: "Mock AI Interviews Lab", desc: "Schedule interactive rooms", icon: <Users className="w-4 h-4 text-amber-400" /> }
    ],
    'HR Manager': [
      { label: "Corporate Employees", desc: "Active staff directory", icon: <Contact className="w-4 h-4 text-rose-400" /> },
      { label: "Leave Requests & Off-time", desc: "Review leave applications", icon: <Clock className="w-4 h-4 text-rose-400" /> },
      { label: "Payroll Support & Statements", desc: "Financial balance logs", icon: <DollarSign className="w-4 h-4 text-rose-400" /> }
    ],
    Admin: [
      { label: "Platform Container Nodes", desc: "Review container health", icon: <Cpu className="w-4 h-4 text-indigo-400" /> },
      { label: "Unified Audit Log Trails", desc: "Analyze database transactions", icon: <Activity className="w-4 h-4 text-indigo-400" /> },
      { label: "RBAC Matrix Controllers", desc: "Manage system boundaries", icon: <ShieldAlert className="w-4 h-4 text-indigo-400" /> }
    ]
  };

  const currentMenuItems = menuItemsWithIcons[activeRole] || [];

  const handleRoleSwap = async (targetRole: UserRole) => {
    const targetEmail = DEMO_USERS[targetRole].email;
    await login(targetEmail, targetRole);
    addNotification(
      'Profile Swapped',
      `Swapped authenticated session to ${targetRole} credentials.`,
      'info',
      'Auth Engine'
    );
  };

  const handleMenuClick = (itemLabel: string) => {
    addNotification(
      'Navigation Triggered',
      `Accessed feature workspace: "${itemLabel}".`,
      'success',
      'System Link'
    );
  };

  return (
    <>
      {/* Mobile Sidebar Overlay Backdrop */}
      {sidebarOpen && (
        <div 
          onClick={onCloseSidebar}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-45 lg:hidden"
        />
      )}

      {/* Primary Navigation Sidebar Panel */}
      <aside 
        className={`
          fixed inset-y-0 left-0 bg-slate-900 text-slate-300 w-64 z-50 transform lg:translate-x-0 transition-transform duration-300 lg:relative border-r border-slate-800/80 flex flex-col h-full
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Brand Header */}
        <div className="h-16 border-b border-slate-800/80 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-mono font-bold text-lg shadow-md shadow-indigo-600/20">
              F
            </div>
            <span className="font-sans font-bold text-white tracking-tight text-sm">FSP Enterprise</span>
          </div>
          <HeroButton 
            isIconOnly
            variant="ghost"
            onClick={onCloseSidebar}
            className="lg:hidden text-slate-400 hover:text-white hover:bg-slate-800 min-w-0 w-8 h-8 rounded-lg border-none"
          >
            <X className="w-4 h-4" />
          </HeroButton>
        </div>

        {/* Current Active User Profile Card */}
        <div className="p-4 border-b border-slate-800/80 shrink-0">
          <div className="flex items-center space-x-3 p-3 bg-slate-800/20 border border-slate-800/60 rounded-xl">
            <Avatar 
              src={user.avatarUrl} 
              name={user.name} 
              size="md"
              className="border border-slate-700/80 object-cover shrink-0 text-tiny"
            />
            <div className="min-w-0 flex-1">
              <span className="block text-xs font-bold text-white truncate font-sans">{user.name}</span>
              <span className={`inline-flex items-center gap-1.5 text-[9px] font-bold border px-2 py-0.5 rounded-full mt-1.5 ${roleStyles[activeRole]}`}>
                {roleIcons[activeRole]}
                <span className="uppercase tracking-wider font-sans">{activeRole}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Navigation Menus */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-3 px-1.5 font-sans">
              Role: {activeRole} Workspace
            </span>
            <ul className="space-y-1">
              {/* Primary Active State Indicator Link */}
              <li className="flex items-center space-x-3 p-2.5 bg-indigo-600/10 border border-indigo-500/20 text-indigo-300 rounded-xl text-xs font-bold font-sans">
                <LayoutDashboard className="w-4 h-4 text-indigo-400" />
                <span>Primary Terminal Board</span>
              </li>

              {/* Dynamic Sub-menu workspace links */}
              {currentMenuItems.map((menu, idx) => (
                <li 
                  key={idx} 
                  onClick={() => handleMenuClick(menu.label)}
                  className="p-2.5 hover:bg-slate-800/40 border border-transparent hover:border-slate-800/50 rounded-xl text-[11px] font-semibold text-slate-400 hover:text-white transition-all duration-200 cursor-pointer group flex items-start gap-3 mt-1"
                >
                  <div className="shrink-0 p-1 bg-slate-800/30 rounded-lg group-hover:bg-slate-800/80 transition-colors">
                    {menu.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block font-bold text-slate-300 group-hover:text-white font-sans transition-colors">{menu.label}</span>
                    <span className="text-[9px] text-slate-500 block mt-0.5 truncate font-sans">{menu.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Swapper Tool using HeroUI Dropdown */}
          <div className="pt-4 border-t border-slate-800/80">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 px-1.5 font-sans flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-indigo-400" />
              <span>Instant Swapper</span>
            </span>
            
            <div className="px-1">
              <HeroDropdown className="bg-slate-800 text-slate-200 border border-slate-700 rounded-xl min-w-[200px] text-xs shadow-xl">
                <HeroDropdownTrigger>
                  <HeroButton 
                    className="w-full bg-slate-800 hover:bg-slate-800/80 text-white font-semibold text-xs border border-slate-700 rounded-xl flex justify-between items-center px-3 py-5 h-9"
                    endContent={<ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
                  >
                    <div className="flex items-center gap-2">
                      {roleIcons[activeRole]}
                      <span>{activeRole}</span>
                    </div>
                  </HeroButton>
                </HeroDropdownTrigger>
                <HeroDropdownMenu 
                  aria-label="Role switching options"
                  onAction={(key: any) => handleRoleSwap(key as UserRole)}
                  className="p-1 font-sans font-semibold text-xs text-slate-300"
                >
                  <HeroDropdownItem 
                    key="Student"
                    startContent={<GraduationCap className="w-4 h-4 text-indigo-400" />}
                    description="Sanjay Kumar"
                    className="hover:bg-slate-700/50 p-2 rounded-lg"
                  >
                    Student
                  </HeroDropdownItem>
                  <HeroDropdownItem 
                    key="Faculty"
                    startContent={<Building2 className="w-4 h-4 text-sky-400" />}
                    description="Dr. Evelyn Carter"
                    className="hover:bg-slate-700/50 p-2 rounded-lg"
                  >
                    Faculty
                  </HeroDropdownItem>
                  <HeroDropdownItem 
                    key="Developer"
                    startContent={<Code2 className="w-4 h-4 text-emerald-400" />}
                    description="Alex Mercer"
                    className="hover:bg-slate-700/50 p-2 rounded-lg"
                  >
                    Developer
                  </HeroDropdownItem>
                  <HeroDropdownItem 
                    key="Recruiter"
                    startContent={<Briefcase className="w-4 h-4 text-amber-400" />}
                    description="Sarah Jenkins"
                    className="hover:bg-slate-700/50 p-2 rounded-lg"
                  >
                    Recruiter
                  </HeroDropdownItem>
                  <HeroDropdownItem 
                    key="HR Manager"
                    startContent={<Users className="w-4 h-4 text-rose-400" />}
                    description="Michael Vance"
                    className="hover:bg-slate-700/50 p-2 rounded-lg"
                  >
                    HR Manager
                  </HeroDropdownItem>
                  <HeroDropdownItem 
                    key="Admin"
                    startContent={<Shield className="w-4 h-4 text-indigo-400" />}
                    description="Eleanor Vance"
                    className="hover:bg-slate-700/50 p-2 rounded-lg"
                  >
                    Admin
                  </HeroDropdownItem>
                </HeroDropdownMenu>
              </HeroDropdown>
            </div>
            <p className="text-[9px] text-slate-500 mt-2 px-1.5 leading-relaxed font-sans font-medium">
              Swap roles dynamically to evaluate RBAC dashboards instantly.
            </p>
          </div>
        </div>

        {/* Sidebar Footer Log out */}
        <div className="p-4 border-t border-slate-800/80 shrink-0 bg-slate-900/90">
          <HeroButton
            variant="ghost"
            onClick={logout}
            startContent={<LogOut className="w-4 h-4 text-rose-400" />}
            className="w-full text-xs font-bold text-slate-400 hover:text-white hover:bg-rose-950/20 hover:border-rose-900 border-none rounded-xl py-5 h-9"
          >
            Sign Out Session
          </HeroButton>
        </div>
      </aside>
    </>
  );
};

export default NavigationSidebar;
