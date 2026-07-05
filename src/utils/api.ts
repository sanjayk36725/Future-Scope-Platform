// Unified HTTP API Client for FSP full-stack operations

export const API_BASE = '/api';

export interface QueryOptions {
  search?: string;
  searchFields?: string[];
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
  [key: string]: any;
}

export const api = {
  // Auth
  async login(payload: any) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async register(payload: any) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async updateProfile(payload: any) {
    const res = await fetch(`${API_BASE}/auth/profile`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  // Generic Relational CRUD
  async list(table: string, options?: QueryOptions) {
    const query = new URLSearchParams();
    if (options) {
      Object.entries(options).forEach(([key, val]) => {
        if (val !== undefined && val !== null) {
          if (Array.isArray(val)) {
            query.append(key, val.join(','));
          } else {
            query.append(key, String(val));
          }
        }
      });
    }
    const res = await fetch(`${API_BASE}/${table}?${query.toString()}`);
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async get(table: string, id: string) {
    const res = await fetch(`${API_BASE}/${table}/${id}`);
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async create(table: string, payload: any) {
    const res = await fetch(`${API_BASE}/${table}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async update(table: string, id: string, payload: any) {
    const res = await fetch(`${API_BASE}/${table}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async delete(table: string, id: string) {
    const res = await fetch(`${API_BASE}/${table}/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  // AI Assistant Chat
  async aiChat(prompt: string, agentId: string, userId?: string) {
    const res = await fetch(`${API_BASE}/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, agentId, userId })
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  // File Upload
  async uploadFile(fileName: string, fileContent: string, fileType?: string, userId?: string) {
    const res = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileName, fileContent, fileType, userId })
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  // Settings
  async getSettings() {
    const res = await fetch(`${API_BASE}/settings`);
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async updateSettings(payload: any) {
    const res = await fetch(`${API_BASE}/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  // Analytics
  async getAnalyticsSummary() {
    const res = await fetch(`${API_BASE}/analytics/summary`);
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  // Reports
  async generateReport(reportType: string, format: string, columns: string[], tableData: any[]) {
    const res = await fetch(`${API_BASE}/reports/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reportType, format, columns, tableData })
    });
    if (!res.ok) throw new Error(await res.text());
    
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${reportType}_report.${format === 'excel' ? 'xlsx' : format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    return true;
  }
};
