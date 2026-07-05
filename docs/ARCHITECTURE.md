# Future Scope Platform (FSP) - Enterprise Architecture

Welcome to the **Future Scope Platform (FSP)**, an intelligent multi-domain platform that seamlessly integrates Education, Software Development, Placement, HR, and Smart Campus Management into a single cohesive enterprise application.

This document outlines the architecture designed to run reliably and high-performantly inside the containerized environment.

---

## 1. System Topology Overview

FSP is designed as a **Full-Stack Monolithic Enterprise Application** using:
*   **Frontend**: React 19, TypeScript, Tailwind CSS, Framer Motion, and Lucide Icons.
*   **Backend**: Node.js, Express, and tsx (TypeScript execute).
*   **Database**: Embedded, highly performance SQL-like JSON/SQLite storage mapping exactly to relational models (PostgreSQL compatibility ready).
*   **AI Engine**: Server-Side Google Gemini API (using the `@google/genai` SDK).

```
                      +---------------------------------------+
                      |         FSP Front-End (React 19)      |
                      |   - Dashboards (Student, Recruiter...) |
                      |   - AI Chat & Routing Floating Helper |
                      |   - Role-Based Nav & Responsive UI    |
                      +------------------+--------------------+
                                         | REST / JSON
                                         v
                      +------------------+--------------------+
                      |       FSP Back-End (Express Router)   |
                      |   - JWT Authentication Middleware     |
                      |   - AI Agent Router & Service Layer  |
                      |   - Upload Controllers & Static Serv  |
                      +------------------+--------------------+
                                         | SQL / Storage
                                         v
                      +------------------+--------------------+
                      |    Database (Local Relational Models) |
                      |   - Users, Roles, Activity Logs       |
                      |   - Chat History, Resume, Attendance  |
                      +---------------------------------------+
```

---

## 2. Directory Layout & Enterprise Structure

To maintain a clean separation of concerns, the workspace is structured as follows:

```
├── /backend                 # Core backend source files
│   ├── /auth                # JWT token signing, verification & encryption
│   ├── /middleware          # RBAC (Role-Based Access Control) & Logging middlewares
│   ├── /routers             # Express sub-routers for APIs
│   ├── /schemas             # Input validation schemas (Pydantic-equivalent in TS)
│   └── /services            # Business logic and services
│
├── /database                # Permanent storage layer
│   ├── /models              # ORM-style database entities (Users, Profiles, Leaves...)
│   └── /migrations          # DB schema evolutions and scripts
│
├── /ai                      # AI Integration Framework
│   ├── /agents              # The 25+ Specialized AI Agent definitions & runtimes
│   ├── /services            # Core Gemini API interaction helpers
│   └── /prompts             # Highly structured system prompt templates
│
├── /src                     # Front-End Application (Vite/React 19)
│   ├── /components          # Reusable UI widgets, cards, tables, layout elements
│   ├── /context             # Context providers (Auth, Global State, UI Theme)
│   ├── /pages               # Screen components (Landing, Dashboards, Chat rooms)
│   ├── /index.css           # Tailwind CSS imports
│   └── /main.tsx            # Application mounting entry point
│
├── /uploads                 # Multi-format document storage directory (PDFs, DOCX, CSV)
├── /docs                    # System architecture & manuals
├── /docker                  # Containerization blueprints (Dockerfiles, compose files)
└── /tests                   # Automated unit & integration test suites
```

---

## 3. Role-Based Access Control (RBAC) Matrices

FSP implements strict role-based separation with the following menus and features:

| Role | Core Purpose | Access Scope |
| :--- | :--- | :--- |
| **Student** | Learns, tests skills, reviews mock interviews, applies to job postings. | Courses, Quizzes, Attendance, Placements, Personal Tutor, Resume builder. |
| **Faculty** | Coordinates courses, designs curriculum, monitors student performance. | Class lists, Timetables, Grading, Leave Requests, Lab Bookings. |
| **Developer**| Generates, tests, and reviews code; maintains server architectures. | Code Generator, Debugging, API Docs Generator, DevOps Agent. |
| **Recruiter**| Sources students, publishes job postings, grades interview recordings.| Job Manager, Applicant Screener, Mock Interview Evaluation. |
| **HR Manager**| Coordinates employees, processes leave requests, handles onboarding. | Payroll, Leave Approval, Employee Profiles, Policy Q&A. |
| **Admin** | Governs the platform, monitors analytics logs, oversees system health. | Full read/write access to all reports, audit logs, and analytics. |

---

## 4. The AI Helper Routing Engine

At the core of the AI design is the **Floating AI Assistant (Routing Engine)**. When a user requests assistance:
1.  **Input Parsing**: The central AI Helper ingests the query and/or files (e.g., resumes, code files).
2.  **Semantic Routing**: It uses a low-latency routing prompt to categorize the intent.
3.  **Agent Invocation**: The correct specialized agent's service is loaded, taking over the conversation or action context with its specific prompt-engineering layout.
4.  **Logging**: Every routing and agent transaction is recorded to `Activity Logs` in the database.
