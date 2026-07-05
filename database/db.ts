import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'database', 'db.json');

// Interface for database schema
export interface DatabaseSchema {
  users: any[];
  agentHistory: any[];
  assignments: any[];
  quizzes: any[];
  courses: any[];
  leaves: any[];
  payroll: any[];
  jobs: any[];
  candidates: any[];
  interviews: any[];
  books: any[];
  hostel: any[];
  timetable: any[];
  notifications: any[];
  feedback: any[];
  labBookings: any[];
  codeProjects: any[];
  helpdesk: any[];
  logs: any[];
  settings: any;
}

const DEFAULT_DB: DatabaseSchema = {
  users: [
    { id: "u-1", name: "Sanjay Kumar", email: "sanjayk36725@gmail.com", role: "Student", avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150", gpa: "3.84", credits: "84/120", attendance: "94.2%", department: "Computer Science", courseCode: "CS-402", deletedAt: null },
    { id: "u-2", name: "Dr. Evelyn Carter", email: "faculty@fsp.edu", role: "Faculty", avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150", department: "Computer Science", deletedAt: null },
    { id: "u-3", name: "Alex Mercer", email: "developer@fsp.edu", role: "Developer", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150", department: "Engineering", deletedAt: null },
    { id: "u-4", name: "Sarah Jenkins", email: "recruiter@fsp.edu", role: "Recruiter", avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150", company: "Aether AI", deletedAt: null },
    { id: "u-5", name: "Michael Vance", email: "hr@fsp.edu", role: "HR Manager", avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150", department: "People Ops", deletedAt: null },
    { id: "u-6", name: "Eleanor Vance", email: "admin@fsp.edu", role: "Admin", avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150", department: "Executive Operations", deletedAt: null }
  ],
  agentHistory: [
    { id: "a-1", userId: "u-1", sender: "ai", text: "Hello Sanjay! I am your study tutor. Today let's dive into transformer neural networks.", agentName: "Personal Tutor", timestamp: "10:30 AM", deletedAt: null },
    { id: "a-2", userId: "u-3", sender: "ai", text: "Welcome to AI Code generation room. I've drafted an Express router with Drizzle SQL models.", agentName: "Code Generator", timestamp: "11:15 AM", deletedAt: null }
  ],
  assignments: [
    { id: "asg-1", studentId: "u-1", course: "Advanced AI & Machine Learning", code: "CS-402", topic: "Transformer Network Multi-Head Attention Implementations", due: "In 2 days", status: "Pending Upload", score: "—", label: "Urgent", fileUrl: null, deletedAt: null },
    { id: "asg-2", studentId: "u-1", course: "Enterprise System Architectures", code: "CS-411", topic: "Write migration schema scripts for SQL mapping models", due: "Completed", status: "Submitted", score: "92 / 100", label: "Completed", fileUrl: "migration_v1_drizzle.sql", deletedAt: null }
  ],
  quizzes: [
    { id: "qz-1", studentId: "u-1", title: "React 19 Hooks and Suspense Model", questions: 10, time: "15 min", completed: true, score: "9/10", date: "Jul 01, 2026", deletedAt: null },
    { id: "qz-2", studentId: "u-1", title: "Database Relational Entities & Indexing keys", questions: 15, time: "25 min", completed: false, score: "Pending", date: "Today", deletedAt: null }
  ],
  courses: [
    { id: "c-1", name: "Advanced AI & Machine Learning", code: "CS-402", description: "Deep dive on Neural Networks, Transformers, and LLM orchestration strategies.", level: "Advanced", progress: 85, instructor: "Dr. Evelyn Carter", room: "Lab C", time: "10:30 AM", status: "Active Now", deletedAt: null },
    { id: "c-2", name: "Enterprise System Architectures", code: "CS-411", description: "Building multi-service modular runtimes with PostgreSQL and microservice routers.", level: "Intermediate", progress: 60, instructor: "Prof. Alan Turing", room: "Auditorium 2", time: "01:30 PM", status: "Scheduled", deletedAt: null },
    { id: "c-3", name: "Full-Stack Software Engineering", code: "CS-390", description: "Vite, React 19, TypeScript, node-express integrations and REST API architectures.", level: "Intermediate", progress: 95, instructor: "Alex Mercer", room: "Virtual Terminal", time: "03:15 PM", status: "Open Slot", deletedAt: null }
  ],
  leaves: [
    { id: "lv-1", employeeId: "u-1", employeeName: "Sanjay Kumar", startDate: "2026-07-10", endDate: "2026-07-12", reason: "Family event leave", status: "Pending", type: "Casual Leave", deletedAt: null },
    { id: "lv-2", employeeId: "u-2", employeeName: "Dr. Evelyn Carter", startDate: "2026-07-05", endDate: "2026-07-06", reason: "Research Conference", status: "Approved", type: "Duty Leave", deletedAt: null }
  ],
  payroll: [
    { id: "pay-1", employeeId: "u-2", employeeName: "Dr. Evelyn Carter", baseSalary: 9500, bonus: 1200, deductions: 450, netSalary: 10250, month: "June 2026", status: "Disbursed", deletedAt: null },
    { id: "pay-2", employeeId: "u-3", employeeName: "Alex Mercer", baseSalary: 8200, bonus: 800, deductions: 350, netSalary: 8650, month: "June 2026", status: "Disbursed", deletedAt: null }
  ],
  jobs: [
    { id: "jb-1", title: "Software Engineer - AI Systems", company: "Aether AI", description: "Design deep learning inference pipelines with PyTorch, Node.js and Postgres schemas.", status: "Active", matches: ["Sanjay Kumar", "Alex Mercer"], salary: "$110k - $130k", deletedAt: null },
    { id: "jb-2", title: "Database Architect", company: "DataBound", description: "Optimize distributed PostgreSQL schema engines and query indexes for scale.", status: "Draft", matches: ["Alex Mercer"], salary: "$120k - $150k", deletedAt: null }
  ],
  candidates: [
    { id: "cand-1", name: "Sanjay Kumar", email: "sanjayk36725@gmail.com", resumeUrl: "Sanjay_Kumar_Resume.pdf", status: "Screened", atsScore: 86, matches: ["jb-1"], notes: "Excellent knowledge of React & LLM orchestration.", deletedAt: null },
    { id: "cand-2", name: "Liam Miller", email: "liam@example.com", resumeUrl: "Liam_M_CV.pdf", status: "Applied", atsScore: 72, matches: [], notes: "Proficient in Python and MySQL, lacks React 19.", deletedAt: null }
  ],
  interviews: [
    { id: "int-1", candidateId: "cand-1", candidateName: "Sanjay Kumar", position: "Software Engineer - AI Systems", company: "Aether AI", date: "2026-07-08", time: "11:00 AM", status: "Scheduled", score: "Pending", feedback: "", deletedAt: null }
  ],
  books: [
    { id: "bk-1", title: "Introduction to Algorithms", author: "Thomas H. Cormen", isbn: "978-0262033848", status: "Available", borrowerName: "", deletedAt: null },
    { id: "bk-2", title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", isbn: "978-1449373320", status: "Borrowed", borrowerName: "Sanjay Kumar", deletedAt: null }
  ],
  hostel: [
    { id: "hst-1", roomNo: "302", block: "A-Block", capacity: 2, occupiedBy: ["Sanjay Kumar"], status: "Partially Occupied", deletedAt: null },
    { id: "hst-2", roomNo: "105", block: "B-Block", capacity: 4, occupiedBy: [], status: "Vacant", deletedAt: null }
  ],
  timetable: [
    { id: "tt-1", day: "Monday", time: "10:30 AM", courseCode: "CS-402", courseName: "Advanced AI & Machine Learning", room: "Lab C", instructor: "Dr. Evelyn Carter", deletedAt: null },
    { id: "tt-2", day: "Monday", time: "01:30 PM", courseCode: "CS-411", courseName: "Enterprise System Architectures", room: "Auditorium 2", instructor: "Prof. Alan Turing", deletedAt: null }
  ],
  notifications: [
    { id: "notif-1", title: "System Ready", desc: "Welcome to the Unified FSP Enterprise Platform.", type: "success", category: "System", read: false, date: "Today", deletedAt: null },
    { id: "notif-2", title: "Academic Schedule Updated", desc: "Dr. Evelyn Carter has uploaded new Machine Learning lecture modules.", type: "info", category: "Academic", read: false, date: "Today", deletedAt: null }
  ],
  feedback: [
    { id: "fb-1", employeeId: "u-1", employeeName: "Sanjay Kumar", text: "The new AI Tutor interface is highly responsive and helps explain neural networks perfectly.", date: "Today", deletedAt: null }
  ],
  labBookings: [
    { id: "lb-1", userName: "Sanjay Kumar", labName: "Sandbox Lab C", date: "2026-07-06", slot: "02:00 PM - 04:00 PM", status: "Approved", deletedAt: null }
  ],
  codeProjects: [
    { id: "proj-1", name: "Auth Router Express", description: "Express authentication gateway with PostgreSQL credentials.", code: `import { Router } from 'express';\nconst router = Router();\nrouter.post('/login', async (req, res) => {\n  const { email, password } = req.body;\n  res.json({ token: 'jwt-token-example' });\n});\nexport default router;`, history: ["Initial draft created"], saved: true, deletedAt: null }
  ],
  helpdesk: [
    { id: "hd-1", name: "Sanjay Kumar", query: "Unable to access the Lab C container environment ports.", category: "Technical Support", status: "Resolved", reply: "Port ingress routers have been refreshed. Please check on port 3000.", deletedAt: null }
  ],
  logs: [
    { id: "lg-1", timestamp: "2026-07-04T10:30:00Z", service: "Drizzle ORM", message: "Successfully synced relational schema mappings to SQLite storage.", type: "info" }
  ],
  settings: {
    systemName: "FSP Enterprise Framework",
    rbacEnforcement: true,
    containersActive: 3,
    environmentMode: "Development"
  }
};

export class Database {
  private static data: DatabaseSchema | null = null;

  private static ensureDbDir() {
    const dir = path.dirname(DB_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  private static read(): DatabaseSchema {
    Database.ensureDbDir();
    if (Database.data) return Database.data;

    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        Database.data = JSON.parse(raw);
        return Database.data!;
      }
    } catch (e) {
      console.error("Failed to read database file, restoring defaults:", e);
    }

    Database.data = JSON.parse(JSON.stringify(DEFAULT_DB));
    Database.write(Database.data!);
    return Database.data!;
  }

  private static write(data: DatabaseSchema) {
    Database.ensureDbDir();
    Database.data = data;
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (e) {
      console.error("Failed to write to database file:", e);
    }
  }

  public static getCollection(table: keyof DatabaseSchema): any[] {
    const db = Database.read();
    const list = db[table];
    if (Array.isArray(list)) {
      return list.filter(item => !item.deletedAt);
    }
    return [];
  }

  public static saveCollection(table: keyof DatabaseSchema, list: any[]) {
    const db = Database.read();
    (db as any)[table] = list;
    Database.write(db);
  }

  // Complete PostgreSQL-like query API: Filter, Search, Pagination, Sorting
  public static findMany(
    table: keyof DatabaseSchema, 
    filters?: any, 
    options?: { search?: string; searchFields?: string[]; sortBy?: string; sortOrder?: 'asc' | 'desc'; page?: number; limit?: number }
  ) {
    let list = Database.getCollection(table);

    // Filter
    if (filters) {
      list = list.filter(item => {
        for (const key in filters) {
          if (item[key] !== filters[key]) return false;
        }
        return true;
      });
    }

    // Search
    if (options?.search && options.searchFields) {
      const q = options.search.toLowerCase();
      list = list.filter(item => {
        return options.searchFields!.some(field => {
          const val = item[field];
          if (val === null || val === undefined) return false;
          return String(val).toLowerCase().includes(q);
        });
      });
    }

    // Sorting
    if (options?.sortBy) {
      const field = options.sortBy;
      const order = options.sortOrder === 'desc' ? -1 : 1;
      list.sort((a, b) => {
        const valA = a[field];
        const valB = b[field];
        if (valA === valB) return 0;
        if (valA < valB) return -order;
        return order;
      });
    }

    // Pagination
    const totalCount = list.length;
    let paginated = list;
    if (options?.page && options?.limit) {
      const offset = (options.page - 1) * options.limit;
      paginated = list.slice(offset, offset + options.limit);
    }

    return {
      data: paginated,
      totalCount,
      page: options?.page || 1,
      limit: options?.limit || totalCount
    };
  }

  public static findOne(table: keyof DatabaseSchema, id: string) {
    const list = Database.getCollection(table);
    return list.find(item => item.id === id) || null;
  }

  public static insert(table: keyof DatabaseSchema, item: any) {
    const db = Database.read();
    const list = db[table];
    if (Array.isArray(list)) {
      const newItem = {
        id: item.id || `${table.substring(0, 3)}-${Date.now()}`,
        ...item,
        createdAt: new Date().toISOString(),
        deletedAt: null
      };
      list.push(newItem);
      Database.write(db);
      return newItem;
    }
    return null;
  }

  public static update(table: keyof DatabaseSchema, id: string, patch: any) {
    const db = Database.read();
    const list = db[table];
    if (Array.isArray(list)) {
      const idx = list.findIndex(item => item.id === id && !item.deletedAt);
      if (idx !== -1) {
        list[idx] = {
          ...list[idx],
          ...patch,
          updatedAt: new Date().toISOString()
        };
        Database.write(db);
        return list[idx];
      }
    }
    return null;
  }

  // Soft Delete
  public static delete(table: keyof DatabaseSchema, id: string) {
    const db = Database.read();
    const list = db[table];
    if (Array.isArray(list)) {
      const idx = list.findIndex(item => item.id === id);
      if (idx !== -1) {
        list[idx].deletedAt = new Date().toISOString();
        Database.write(db);
        return true;
      }
    }
    return false;
  }

  public static getSettings() {
    return Database.read().settings;
  }

  public static updateSettings(patch: any) {
    const db = Database.read();
    db.settings = { ...db.settings, ...patch };
    Database.write(db);
    return db.settings;
  }
}
