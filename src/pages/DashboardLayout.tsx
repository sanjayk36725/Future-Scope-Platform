import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth, DEMO_USERS } from '../context/AuthContext';
import { UserRole } from '../types';
import FloatingAIHelper from '../components/FloatingAIHelper';

// Reusable UI Components
import NavigationSidebar from '../components/layout/NavigationSidebar';
import Navbar from '../components/Navbar';

// Role Dashboards
import StudentDashboard from './dashboards/StudentDashboard';
import FacultyDashboard from './dashboards/FacultyDashboard';
import DeveloperDashboard from './dashboards/DeveloperDashboard';
import RecruiterDashboard from './dashboards/RecruiterDashboard';
import HRDashboard from './dashboards/HRDashboard';
import AdminDashboard from './dashboards/AdminDashboard';

export default function DashboardLayout() {
  const { user, login, logout, isLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-semibold text-slate-500">Connecting platform profiles...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Handle instant role swaps for evaluator testing convenience
  const handleRoleSwap = async (role: UserRole) => {
    const targetEmail = DEMO_USERS[role].email;
    await login(targetEmail, role);
  };

  // Render correct nested dashboard screen based on authenticated role
  const renderDashboardScreen = () => {
    switch (user.role) {
      case 'Student':
        return <StudentDashboard />;
      case 'Faculty':
        return <FacultyDashboard />;
      case 'Developer':
        return <DeveloperDashboard />;
      case 'Recruiter':
        return <RecruiterDashboard />;
      case 'HR Manager':
        return <HRDashboard />;
      case 'Admin':
        return <AdminDashboard />;
      default:
        return <StudentDashboard />;
    }
  };

  // Menu links mapping according to active RBAC profiles
  const rbacMenus: { [key in UserRole]: { label: string; desc: string }[] } = {
    Student: [
      { label: "Academic Lectures", desc: "Digital classroom modules" },
      { label: "Assignment Sandbox", desc: "Manage deliverables" },
      { label: "Assessments (Quizzes)", desc: "Trigger study assessors" },
      { label: "Career & Placement Preparation", desc: "ATS screening mockups" }
    ],
    Faculty: [
      { label: "Active Lecturing Blocks", desc: "Timetables & lab classes" },
      { label: "Assessment Pipeline", desc: "Interactive grading metrics" },
      { label: "Leaves & Time-Off Requests", desc: "Submit attendance records" }
    ],
    Developer: [
      { label: "AI Code Generation Rooms", desc: "React/Express schemas" },
      { label: "Interactive Testing Sandbox", desc: "Unit test assert checkers" },
      { label: "Database Relational Models", desc: "PostgreSQL schema layouts" }
    ],
    Recruiter: [
      { label: "Job Candidate Postings", desc: "Publish placement boards" },
      { label: "ATS Scorecard Screening", desc: "Parse resumes" },
      { label: "Mock AI Interviews Lab", desc: "Schedule interactive rooms" }
    ],
    'HR Manager': [
      { label: "Corporate Employees", desc: "Active staff directory" },
      { label: "Leave Requests & Off-time", desc: "Review leave applications" },
      { label: "Payroll Support & Statements", desc: "Financial balance logs" }
    ],
    Admin: [
      { label: "Platform Container Nodes", desc: "Review container health" },
      { label: "Unified Audit Log Trails", desc: "Analyze database transactions" },
      { label: "RBAC Matrix Controllers", desc: "Manage system boundaries" }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-800 font-sans">
      {/* Reusable Sidebar Component */}
      <NavigationSidebar
        sidebarOpen={sidebarOpen}
        onCloseSidebar={() => setSidebarOpen(false)}
      />

      {/* Primary Content View with Reusable Navbar */}
      <div className="grow flex flex-col min-w-0 h-screen overflow-hidden">
        <Navbar
          userName={user.name}
          userEmail={user.email}
          userAvatar={user.avatarUrl}
          userRole={user.role}
          statusText="Server State: Operational"
          onToggleSidebar={() => setSidebarOpen(true)}
          onLogout={logout}
        />

        {/* Scrollable Main Board Screen */}
        <main className="grow overflow-y-auto p-6 bg-slate-50">
          <div className="max-w-7xl w-full mx-auto">
            {renderDashboardScreen()}
          </div>
        </main>
      </div>

      {/* Global Floating Cognitive AI Helper Assistant */}
      <FloatingAIHelper />
    </div>
  );
}
